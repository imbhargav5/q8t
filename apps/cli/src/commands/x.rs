use clap::Subcommand;

use crate::client::Q8tClient;
use crate::output;

#[derive(Subcommand)]
pub enum XCommands {
    /// Quick tweet (create and publish in one step)
    Tweet {
        /// Tweet text
        text: String,
        /// Media IDs to attach
        #[arg(long)]
        media: Option<Vec<String>>,
        /// Reply to a tweet ID
        #[arg(long)]
        reply_to: Option<String>,
        /// Quote tweet ID
        #[arg(long)]
        quote: Option<String>,
    },
    /// Post a thread (each argument is a separate tweet)
    Thread {
        /// Tweet texts (one per thread item)
        tweets: Vec<String>,
    },
    /// Search recent tweets
    Search {
        /// Search query
        query: String,
        /// Max results
        #[arg(long, default_value = "10")]
        limit: u32,
    },
    /// Show home timeline
    Timeline {
        /// Max results
        #[arg(long, default_value = "20")]
        limit: u32,
    },
    /// Show user profile
    User {
        /// Username (without @)
        username: String,
    },
    /// List followers
    Followers {
        /// Username (optional, defaults to self)
        username: Option<String>,
    },
    /// List following
    Following {
        /// Username (optional, defaults to self)
        username: Option<String>,
    },
    /// Like a tweet
    Like {
        /// Tweet ID
        tweet_id: String,
    },
    /// Unlike a tweet
    Unlike {
        /// Tweet ID
        tweet_id: String,
    },
    /// Retweet
    Retweet {
        /// Tweet ID
        tweet_id: String,
    },
    /// Remove retweet
    Unretweet {
        /// Tweet ID
        tweet_id: String,
    },
    /// Bookmark a tweet
    Bookmark {
        /// Tweet ID
        tweet_id: String,
    },
    /// List bookmarks
    Bookmarks,
    /// Remove bookmark
    Unbookmark {
        /// Tweet ID
        tweet_id: String,
    },
    /// Block a user
    Block {
        /// User ID
        user_id: String,
    },
    /// Unblock a user
    Unblock {
        /// User ID
        user_id: String,
    },
    /// Mute a user
    Mute {
        /// User ID
        user_id: String,
    },
    /// Unmute a user
    Unmute {
        /// User ID
        user_id: String,
    },
}

pub async fn run(cmd: XCommands, client: &Q8tClient, format: &str) -> Result<(), String> {
    match cmd {
        XCommands::Tweet { text, media, reply_to, quote } => {
            let mut body = serde_json::json!({"text": text});
            if let Some(r) = &reply_to {
                body["reply"] = serde_json::json!({"in_reply_to_tweet_id": r});
            }
            if let Some(q) = &quote {
                body["quote_tweet_id"] = serde_json::json!(q);
            }
            if let Some(m) = &media {
                body["media"] = serde_json::json!({"media_ids": m});
            }
            let resp: serde_json::Value = client.post("/x/tweets", &body).await?;
            output::print(&resp, format);
        }
        XCommands::Thread { tweets } => {
            if tweets.is_empty() {
                return Err("At least one tweet text required".to_string());
            }
            // Post first tweet
            let first: serde_json::Value = client
                .post("/x/tweets", &serde_json::json!({"text": &tweets[0]}))
                .await?;

            let mut last_id = first
                .get("data")
                .and_then(|d| d.get("data"))
                .and_then(|d| d.get("id"))
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();

            eprintln!("Tweet 1/{}: {}", tweets.len(), &last_id);

            // Post remaining tweets as replies
            for (i, text) in tweets.iter().enumerate().skip(1) {
                let resp: serde_json::Value = client
                    .post(
                        "/x/tweets",
                        &serde_json::json!({
                            "text": text,
                            "reply": {"in_reply_to_tweet_id": &last_id}
                        }),
                    )
                    .await?;

                last_id = resp
                    .get("data")
                    .and_then(|d| d.get("data"))
                    .and_then(|d| d.get("id"))
                    .and_then(|v| v.as_str())
                    .unwrap_or("")
                    .to_string();

                eprintln!("Tweet {}/{}: {}", i + 1, tweets.len(), &last_id);
            }
            output::print(&first, format);
        }
        XCommands::Search { query, limit } => {
            let resp: serde_json::Value = client
                .get(&format!("/x/tweets/search/recent?query={}&max_results={}", urlencoded(&query), limit))
                .await?;
            output::print(&resp, format);
        }
        XCommands::User { username } => {
            let resp: serde_json::Value = client
                .get(&format!("/x/users/by/username/{}", username))
                .await?;
            output::print(&resp, format);
        }
        XCommands::Timeline { limit } => {
            // Need user ID for timeline
            let me: serde_json::Value = client.get("/x/users/me").await?;
            let user_id = me
                .get("data")
                .and_then(|d| d.get("data"))
                .and_then(|d| d.get("id"))
                .and_then(|v| v.as_str())
                .ok_or("Could not get user ID")?;
            let resp: serde_json::Value = client
                .get(&format!("/x/users/{}/tweets?max_results={}", user_id, limit))
                .await?;
            output::print(&resp, format);
        }
        XCommands::Followers { username } => {
            let user_id = resolve_user_id(client, username.as_deref()).await?;
            let resp: serde_json::Value = client.get(&format!("/x/users/{}/followers", user_id)).await?;
            output::print(&resp, format);
        }
        XCommands::Following { username } => {
            let user_id = resolve_user_id(client, username.as_deref()).await?;
            let resp: serde_json::Value = client.get(&format!("/x/users/{}/following", user_id)).await?;
            output::print(&resp, format);
        }
        XCommands::Like { tweet_id } => {
            let user_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.post(&format!("/x/users/{}/likes", user_id), &serde_json::json!({"tweet_id": tweet_id})).await?;
            output::print(&resp, format);
        }
        XCommands::Unlike { tweet_id } => {
            let user_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.delete(&format!("/x/users/{}/likes/{}", user_id, tweet_id)).await?;
            output::print(&resp, format);
        }
        XCommands::Retweet { tweet_id } => {
            let user_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.post(&format!("/x/users/{}/retweets", user_id), &serde_json::json!({"tweet_id": tweet_id})).await?;
            output::print(&resp, format);
        }
        XCommands::Unretweet { tweet_id } => {
            let user_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.delete(&format!("/x/users/{}/retweets/{}", user_id, tweet_id)).await?;
            output::print(&resp, format);
        }
        XCommands::Bookmark { tweet_id } => {
            let user_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.post(&format!("/x/users/{}/bookmarks", user_id), &serde_json::json!({"tweet_id": tweet_id})).await?;
            output::print(&resp, format);
        }
        XCommands::Bookmarks => {
            let user_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.get(&format!("/x/users/{}/bookmarks", user_id)).await?;
            output::print(&resp, format);
        }
        XCommands::Unbookmark { tweet_id } => {
            let user_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.delete(&format!("/x/users/{}/bookmarks/{}", user_id, tweet_id)).await?;
            output::print(&resp, format);
        }
        XCommands::Block { user_id } => {
            let my_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.post(&format!("/x/users/{}/blocking", my_id), &serde_json::json!({"target_user_id": user_id})).await?;
            output::print(&resp, format);
        }
        XCommands::Unblock { user_id } => {
            let my_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.delete(&format!("/x/users/{}/blocking/{}", my_id, user_id)).await?;
            output::print(&resp, format);
        }
        XCommands::Mute { user_id } => {
            let my_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.post(&format!("/x/users/{}/muting", my_id), &serde_json::json!({"target_user_id": user_id})).await?;
            output::print(&resp, format);
        }
        XCommands::Unmute { user_id } => {
            let my_id = get_my_user_id(client).await?;
            let resp: serde_json::Value = client.delete(&format!("/x/users/{}/muting/{}", my_id, user_id)).await?;
            output::print(&resp, format);
        }
    }
    Ok(())
}

async fn get_my_user_id(client: &Q8tClient) -> Result<String, String> {
    let me: serde_json::Value = client.get("/x/users/me").await?;
    me.get("data")
        .and_then(|d| d.get("data"))
        .and_then(|d| d.get("id"))
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
        .ok_or("Could not get authenticated user ID".to_string())
}

async fn resolve_user_id(client: &Q8tClient, username: Option<&str>) -> Result<String, String> {
    match username {
        Some(u) => {
            let resp: serde_json::Value = client.get(&format!("/x/users/by/username/{}", u)).await?;
            resp.get("data")
                .and_then(|d| d.get("data"))
                .and_then(|d| d.get("id"))
                .and_then(|v| v.as_str())
                .map(|s| s.to_string())
                .ok_or(format!("User @{} not found", u))
        }
        None => get_my_user_id(client).await,
    }
}

fn urlencoded(s: &str) -> String {
    s.replace(' ', "%20").replace('#', "%23").replace('&', "%26")
}
