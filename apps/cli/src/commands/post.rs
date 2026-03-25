use clap::Subcommand;

use crate::client::Q8tClient;
use crate::output;

#[derive(Subcommand)]
pub enum PostCommands {
    /// Create a new post
    Create {
        /// Post content
        #[arg(long)]
        content: String,
        /// Target platform
        #[arg(long, default_value = "x")]
        platform: String,
        /// Schedule for ISO8601 datetime
        #[arg(long)]
        schedule: Option<String>,
        /// Media asset IDs to attach
        #[arg(long)]
        media: Option<Vec<String>>,
        /// Publish immediately after creating
        #[arg(long)]
        publish: bool,
    },
    /// List posts
    List {
        /// Filter by status (draft, scheduled, published, failed)
        #[arg(long)]
        status: Option<String>,
        /// Limit results
        #[arg(long, default_value = "20")]
        limit: i64,
    },
    /// Get a post by ID
    Get {
        /// Post ID
        id: String,
    },
    /// Edit a post
    Edit {
        /// Post ID
        id: String,
        /// New content
        #[arg(long)]
        content: String,
    },
    /// Delete a post
    Delete {
        /// Post ID
        id: String,
    },
    /// Publish a post immediately
    Publish {
        /// Post ID
        id: String,
    },
    /// Schedule a post
    Schedule {
        /// Post ID
        id: String,
        /// ISO8601 datetime
        #[arg(long)]
        at: String,
    },
    /// Cancel a scheduled post (return to draft)
    Cancel {
        /// Post ID
        id: String,
    },
}

pub async fn run(cmd: PostCommands, client: &Q8tClient, format: &str) -> Result<(), String> {
    match cmd {
        PostCommands::Create { content, platform, schedule, media, publish } => {
            let mut body = serde_json::json!({
                "content": content,
                "platforms": [platform],
            });
            if let Some(s) = &schedule {
                body["scheduled_for"] = serde_json::json!(s);
            }
            if let Some(m) = &media {
                body["media_ids"] = serde_json::json!(m);
            }

            let resp: serde_json::Value = client.post("/posts", &body).await?;

            if publish {
                if let Some(post_id) = resp.get("data").and_then(|d| d.get("id")).and_then(|v| v.as_str()) {
                    let pub_resp: serde_json::Value = client.post(&format!("/posts/{}/publish", post_id), &serde_json::json!({})).await?;
                    output::print(&pub_resp, format);
                    return Ok(());
                }
            }

            output::print(&resp, format);
        }
        PostCommands::List { status, limit } => {
            let mut path = format!("/posts?limit={}", limit);
            if let Some(s) = &status {
                path.push_str(&format!("&status={}", s));
            }
            let resp: serde_json::Value = client.get(&path).await?;
            output::print(&resp, format);
        }
        PostCommands::Get { id } => {
            let resp: serde_json::Value = client.get(&format!("/posts/{}", id)).await?;
            output::print(&resp, format);
        }
        PostCommands::Edit { id, content } => {
            let resp: serde_json::Value = client.patch(&format!("/posts/{}", id), &serde_json::json!({"content": content})).await?;
            output::print(&resp, format);
        }
        PostCommands::Delete { id } => {
            let resp: serde_json::Value = client.delete(&format!("/posts/{}", id)).await?;
            output::print(&resp, format);
        }
        PostCommands::Publish { id } => {
            let resp: serde_json::Value = client.post(&format!("/posts/{}/publish", id), &serde_json::json!({})).await?;
            output::print(&resp, format);
        }
        PostCommands::Schedule { id, at } => {
            let resp: serde_json::Value = client.post(&format!("/posts/{}/schedule", id), &serde_json::json!({"scheduled_for": at})).await?;
            output::print(&resp, format);
        }
        PostCommands::Cancel { id } => {
            let resp: serde_json::Value = client.post(&format!("/posts/{}/cancel", id), &serde_json::json!({})).await?;
            output::print(&resp, format);
        }
    }
    Ok(())
}
