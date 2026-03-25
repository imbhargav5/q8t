use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::io::{self, BufRead, Write};

/// Lightweight MCP server over stdio.
///
/// Implements the Model Context Protocol (MCP) by reading JSON-RPC messages
/// from stdin and writing responses to stdout.
pub async fn run_mcp_server() -> Result<(), String> {
    let client = crate::client::Q8tClient::discover()?;

    // Server info
    let server_info = serde_json::json!({
        "name": "q8t",
        "version": env!("CARGO_PKG_VERSION"),
    });

    let stdin = io::stdin();
    let mut stdout = io::stdout();

    for line in stdin.lock().lines() {
        let line = line.map_err(|e| e.to_string())?;
        let line = line.trim();
        if line.is_empty() {
            continue;
        }

        let request: JsonRpcRequest = match serde_json::from_str(line) {
            Ok(r) => r,
            Err(e) => {
                write_error(&mut stdout, None, -32700, &format!("Parse error: {}", e));
                continue;
            }
        };

        let response = match request.method.as_str() {
            "initialize" => {
                serde_json::json!({
                    "jsonrpc": "2.0",
                    "id": request.id,
                    "result": {
                        "protocolVersion": "2024-11-05",
                        "serverInfo": server_info,
                        "capabilities": {
                            "tools": {},
                            "resources": {}
                        }
                    }
                })
            }
            "notifications/initialized" => continue,
            "tools/list" => {
                serde_json::json!({
                    "jsonrpc": "2.0",
                    "id": request.id,
                    "result": { "tools": get_tools() }
                })
            }
            "tools/call" => {
                let tool_name = request.params
                    .as_ref()
                    .and_then(|p| p.get("name"))
                    .and_then(|v| v.as_str())
                    .unwrap_or("");
                let arguments = request.params
                    .as_ref()
                    .and_then(|p| p.get("arguments"))
                    .cloned()
                    .unwrap_or(serde_json::json!({}));

                let result = handle_tool_call(&client, tool_name, &arguments).await;
                match result {
                    Ok(content) => serde_json::json!({
                        "jsonrpc": "2.0",
                        "id": request.id,
                        "result": {
                            "content": [{ "type": "text", "text": content }]
                        }
                    }),
                    Err(e) => serde_json::json!({
                        "jsonrpc": "2.0",
                        "id": request.id,
                        "result": {
                            "content": [{ "type": "text", "text": format!("Error: {}", e) }],
                            "isError": true
                        }
                    }),
                }
            }
            "resources/list" => {
                serde_json::json!({
                    "jsonrpc": "2.0",
                    "id": request.id,
                    "result": { "resources": get_resources() }
                })
            }
            "resources/read" => {
                let uri = request.params
                    .as_ref()
                    .and_then(|p| p.get("uri"))
                    .and_then(|v| v.as_str())
                    .unwrap_or("");

                let result = handle_resource_read(&client, uri).await;
                match result {
                    Ok(content) => serde_json::json!({
                        "jsonrpc": "2.0",
                        "id": request.id,
                        "result": {
                            "contents": [{ "uri": uri, "text": content, "mimeType": "application/json" }]
                        }
                    }),
                    Err(e) => serde_json::json!({
                        "jsonrpc": "2.0",
                        "id": request.id,
                        "error": { "code": -32000, "message": e }
                    }),
                }
            }
            _ => {
                serde_json::json!({
                    "jsonrpc": "2.0",
                    "id": request.id,
                    "error": { "code": -32601, "message": format!("Method not found: {}", request.method) }
                })
            }
        };

        let msg = serde_json::to_string(&response).unwrap();
        writeln!(stdout, "{}", msg).map_err(|e| e.to_string())?;
        stdout.flush().map_err(|e| e.to_string())?;
    }

    Ok(())
}

#[derive(Deserialize)]
struct JsonRpcRequest {
    id: Option<Value>,
    method: String,
    params: Option<Value>,
}

fn write_error(stdout: &mut io::Stdout, id: Option<Value>, code: i32, message: &str) {
    let resp = serde_json::json!({
        "jsonrpc": "2.0",
        "id": id,
        "error": { "code": code, "message": message }
    });
    let _ = writeln!(stdout, "{}", serde_json::to_string(&resp).unwrap());
    let _ = stdout.flush();
}

fn get_tools() -> Vec<Value> {
    vec![
        tool("q8t_list_accounts", "List connected social media accounts", serde_json::json!({"type": "object", "properties": {}})),
        tool("q8t_verify_account", "Verify an account's credentials", serde_json::json!({"type": "object", "properties": {"account_id": {"type": "string", "description": "Account ID"}}, "required": ["account_id"]})),
        tool("q8t_create_post", "Create a new post", serde_json::json!({
            "type": "object",
            "properties": {
                "content": {"type": "string", "description": "Post text content"},
                "platforms": {"type": "array", "items": {"type": "string"}, "description": "Target platforms (e.g. ['x'])"},
                "schedule_for": {"type": "string", "description": "ISO8601 datetime to schedule for (optional)"},
                "media_ids": {"type": "array", "items": {"type": "string"}, "description": "Media asset IDs to attach"},
            },
            "required": ["content"]
        })),
        tool("q8t_list_posts", "List posts with optional filters", serde_json::json!({
            "type": "object",
            "properties": {
                "status": {"type": "string", "description": "Filter: draft, scheduled, published, failed"},
                "limit": {"type": "number", "description": "Max results (default 20)"},
            }
        })),
        tool("q8t_get_post", "Get a post by ID", serde_json::json!({"type": "object", "properties": {"post_id": {"type": "string"}}, "required": ["post_id"]})),
        tool("q8t_update_post", "Update a post", serde_json::json!({
            "type": "object",
            "properties": {
                "post_id": {"type": "string"},
                "content": {"type": "string"},
                "schedule_for": {"type": "string"},
            },
            "required": ["post_id"]
        })),
        tool("q8t_delete_post", "Delete a post", serde_json::json!({"type": "object", "properties": {"post_id": {"type": "string"}}, "required": ["post_id"]})),
        tool("q8t_publish_post", "Publish a post immediately", serde_json::json!({"type": "object", "properties": {"post_id": {"type": "string"}}, "required": ["post_id"]})),
        tool("q8t_schedule_post", "Schedule a post for future publication", serde_json::json!({
            "type": "object",
            "properties": {
                "post_id": {"type": "string"},
                "schedule_for": {"type": "string", "description": "ISO8601 datetime"},
            },
            "required": ["post_id", "schedule_for"]
        })),
        tool("q8t_x_tweet", "Create and publish a tweet on X", serde_json::json!({
            "type": "object",
            "properties": {
                "text": {"type": "string", "description": "Tweet text (max 280 chars)"},
                "reply_to": {"type": "string", "description": "Tweet ID to reply to"},
                "quote_tweet_id": {"type": "string", "description": "Tweet ID to quote"},
                "media_ids": {"type": "array", "items": {"type": "string"}, "description": "X media IDs"},
            },
            "required": ["text"]
        })),
        tool("q8t_x_thread", "Post a thread on X", serde_json::json!({
            "type": "object",
            "properties": {
                "tweets": {"type": "array", "items": {"type": "string"}, "description": "Array of tweet texts"},
            },
            "required": ["tweets"]
        })),
        tool("q8t_x_delete_tweet", "Delete a tweet", serde_json::json!({"type": "object", "properties": {"tweet_id": {"type": "string"}}, "required": ["tweet_id"]})),
        tool("q8t_x_get_tweet", "Get a tweet by ID", serde_json::json!({"type": "object", "properties": {"tweet_id": {"type": "string"}}, "required": ["tweet_id"]})),
        tool("q8t_x_search", "Search recent tweets on X", serde_json::json!({
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"},
                "max_results": {"type": "number", "description": "Max results (default 10)"},
            },
            "required": ["query"]
        })),
        tool("q8t_x_user_profile", "Get an X user's profile", serde_json::json!({
            "type": "object",
            "properties": {
                "username": {"type": "string", "description": "Username (without @)"},
                "user_id": {"type": "string", "description": "User ID (alternative to username)"},
            }
        })),
        tool("q8t_x_home_timeline", "Get home timeline", serde_json::json!({
            "type": "object",
            "properties": {"max_results": {"type": "number"}}
        })),
        tool("q8t_x_like", "Like a tweet", serde_json::json!({"type": "object", "properties": {"tweet_id": {"type": "string"}}, "required": ["tweet_id"]})),
        tool("q8t_x_unlike", "Unlike a tweet", serde_json::json!({"type": "object", "properties": {"tweet_id": {"type": "string"}}, "required": ["tweet_id"]})),
        tool("q8t_x_retweet", "Retweet a tweet", serde_json::json!({"type": "object", "properties": {"tweet_id": {"type": "string"}}, "required": ["tweet_id"]})),
        tool("q8t_x_unretweet", "Remove a retweet", serde_json::json!({"type": "object", "properties": {"tweet_id": {"type": "string"}}, "required": ["tweet_id"]})),
        tool("q8t_x_follow", "Follow a user", serde_json::json!({"type": "object", "properties": {"user_id": {"type": "string"}}, "required": ["user_id"]})),
        tool("q8t_x_unfollow", "Unfollow a user", serde_json::json!({"type": "object", "properties": {"user_id": {"type": "string"}}, "required": ["user_id"]})),
        tool("q8t_x_bookmark", "Bookmark a tweet", serde_json::json!({"type": "object", "properties": {"tweet_id": {"type": "string"}}, "required": ["tweet_id"]})),
        tool("q8t_x_bookmarks", "List bookmarked tweets", serde_json::json!({"type": "object", "properties": {"max_results": {"type": "number"}}})),
        tool("q8t_scheduler_status", "Get scheduler status", serde_json::json!({"type": "object", "properties": {}})),
        tool("q8t_scheduler_queue", "View upcoming scheduled posts", serde_json::json!({"type": "object", "properties": {"limit": {"type": "number"}}})),
    ]
}

fn tool(name: &str, description: &str, input_schema: Value) -> Value {
    serde_json::json!({
        "name": name,
        "description": description,
        "inputSchema": input_schema,
    })
}

fn get_resources() -> Vec<Value> {
    vec![
        serde_json::json!({"uri": "q8t://accounts", "name": "Connected accounts", "mimeType": "application/json"}),
        serde_json::json!({"uri": "q8t://posts/drafts", "name": "Draft posts", "mimeType": "application/json"}),
        serde_json::json!({"uri": "q8t://posts/scheduled", "name": "Scheduled posts", "mimeType": "application/json"}),
        serde_json::json!({"uri": "q8t://scheduler/status", "name": "Scheduler status", "mimeType": "application/json"}),
    ]
}

async fn handle_tool_call(
    client: &crate::client::Q8tClient,
    name: &str,
    args: &Value,
) -> Result<String, String> {
    let result: Value = match name {
        "q8t_list_accounts" => client.get("/auth/accounts").await?,
        "q8t_verify_account" => {
            let id = args.get("account_id").and_then(|v| v.as_str()).ok_or("account_id required")?;
            client.post(&format!("/auth/accounts/{}/verify", id), &serde_json::json!({})).await?
        }
        "q8t_create_post" => {
            let content = args.get("content").and_then(|v| v.as_str()).ok_or("content required")?;
            let mut body = serde_json::json!({"content": content});
            if let Some(p) = args.get("platforms") { body["platforms"] = p.clone(); }
            if let Some(s) = args.get("schedule_for") { body["scheduled_for"] = s.clone(); }
            if let Some(m) = args.get("media_ids") { body["media_ids"] = m.clone(); }
            client.post("/posts", &body).await?
        }
        "q8t_list_posts" => {
            let mut path = "/posts?".to_string();
            if let Some(s) = args.get("status").and_then(|v| v.as_str()) { path.push_str(&format!("status={}&", s)); }
            if let Some(l) = args.get("limit").and_then(|v| v.as_u64()) { path.push_str(&format!("limit={}&", l)); }
            client.get(&path).await?
        }
        "q8t_get_post" => {
            let id = args.get("post_id").and_then(|v| v.as_str()).ok_or("post_id required")?;
            client.get(&format!("/posts/{}", id)).await?
        }
        "q8t_update_post" => {
            let id = args.get("post_id").and_then(|v| v.as_str()).ok_or("post_id required")?;
            let mut body = serde_json::json!({});
            if let Some(c) = args.get("content") { body["content"] = c.clone(); }
            if let Some(s) = args.get("schedule_for") { body["scheduled_for"] = s.clone(); }
            client.patch(&format!("/posts/{}", id), &body).await?
        }
        "q8t_delete_post" => {
            let id = args.get("post_id").and_then(|v| v.as_str()).ok_or("post_id required")?;
            client.delete(&format!("/posts/{}", id)).await?
        }
        "q8t_publish_post" => {
            let id = args.get("post_id").and_then(|v| v.as_str()).ok_or("post_id required")?;
            client.post(&format!("/posts/{}/publish", id), &serde_json::json!({})).await?
        }
        "q8t_schedule_post" => {
            let id = args.get("post_id").and_then(|v| v.as_str()).ok_or("post_id required")?;
            let schedule = args.get("schedule_for").and_then(|v| v.as_str()).ok_or("schedule_for required")?;
            client.post(&format!("/posts/{}/schedule", id), &serde_json::json!({"scheduled_for": schedule})).await?
        }
        "q8t_x_tweet" => {
            let text = args.get("text").and_then(|v| v.as_str()).ok_or("text required")?;
            let mut body = serde_json::json!({"text": text});
            if let Some(r) = args.get("reply_to").and_then(|v| v.as_str()) {
                body["reply"] = serde_json::json!({"in_reply_to_tweet_id": r});
            }
            if let Some(q) = args.get("quote_tweet_id") { body["quote_tweet_id"] = q.clone(); }
            if let Some(m) = args.get("media_ids") { body["media"] = serde_json::json!({"media_ids": m}); }
            client.post("/x/tweets", &body).await?
        }
        "q8t_x_thread" => {
            let tweets = args.get("tweets").and_then(|v| v.as_array()).ok_or("tweets array required")?;
            if tweets.is_empty() { return Err("At least one tweet required".to_string()); }

            let first_text = tweets[0].as_str().ok_or("tweet text must be a string")?;
            let first: Value = client.post("/x/tweets", &serde_json::json!({"text": first_text})).await?;
            let mut last_id = first.get("data").and_then(|d| d.get("data")).and_then(|d| d.get("id")).and_then(|v| v.as_str()).unwrap_or("").to_string();

            for tweet in tweets.iter().skip(1) {
                let text = tweet.as_str().ok_or("tweet text must be a string")?;
                let resp: Value = client.post("/x/tweets", &serde_json::json!({"text": text, "reply": {"in_reply_to_tweet_id": &last_id}})).await?;
                last_id = resp.get("data").and_then(|d| d.get("data")).and_then(|d| d.get("id")).and_then(|v| v.as_str()).unwrap_or("").to_string();
            }
            first
        }
        "q8t_x_delete_tweet" => {
            let id = args.get("tweet_id").and_then(|v| v.as_str()).ok_or("tweet_id required")?;
            client.delete(&format!("/x/tweets/{}", id)).await?
        }
        "q8t_x_get_tweet" => {
            let id = args.get("tweet_id").and_then(|v| v.as_str()).ok_or("tweet_id required")?;
            client.get(&format!("/x/tweets/{}", id)).await?
        }
        "q8t_x_search" => {
            let query = args.get("query").and_then(|v| v.as_str()).ok_or("query required")?;
            let max = args.get("max_results").and_then(|v| v.as_u64()).unwrap_or(10);
            client.get(&format!("/x/tweets/search/recent?query={}&max_results={}", urlencoded(query), max)).await?
        }
        "q8t_x_user_profile" => {
            if let Some(username) = args.get("username").and_then(|v| v.as_str()) {
                client.get(&format!("/x/users/by/username/{}", username)).await?
            } else if let Some(uid) = args.get("user_id").and_then(|v| v.as_str()) {
                client.get(&format!("/x/users/{}", uid)).await?
            } else {
                client.get("/x/users/me").await?
            }
        }
        "q8t_x_home_timeline" => {
            let me: Value = client.get("/x/users/me").await?;
            let uid = me.get("data").and_then(|d| d.get("data")).and_then(|d| d.get("id")).and_then(|v| v.as_str()).ok_or("Could not get user ID")?;
            let max = args.get("max_results").and_then(|v| v.as_u64()).unwrap_or(20);
            client.get(&format!("/x/users/{}/tweets?max_results={}", uid, max)).await?
        }
        "q8t_x_like" | "q8t_x_unlike" | "q8t_x_retweet" | "q8t_x_unretweet" |
        "q8t_x_bookmark" | "q8t_x_follow" | "q8t_x_unfollow" => {
            let me: Value = client.get("/x/users/me").await?;
            let uid = me.get("data").and_then(|d| d.get("data")).and_then(|d| d.get("id")).and_then(|v| v.as_str()).ok_or("Could not get user ID")?.to_string();

            match name {
                "q8t_x_like" => {
                    let tid = args.get("tweet_id").and_then(|v| v.as_str()).ok_or("tweet_id required")?;
                    client.post(&format!("/x/users/{}/likes", uid), &serde_json::json!({"tweet_id": tid})).await?
                }
                "q8t_x_unlike" => {
                    let tid = args.get("tweet_id").and_then(|v| v.as_str()).ok_or("tweet_id required")?;
                    client.delete(&format!("/x/users/{}/likes/{}", uid, tid)).await?
                }
                "q8t_x_retweet" => {
                    let tid = args.get("tweet_id").and_then(|v| v.as_str()).ok_or("tweet_id required")?;
                    client.post(&format!("/x/users/{}/retweets", uid), &serde_json::json!({"tweet_id": tid})).await?
                }
                "q8t_x_unretweet" => {
                    let tid = args.get("tweet_id").and_then(|v| v.as_str()).ok_or("tweet_id required")?;
                    client.delete(&format!("/x/users/{}/retweets/{}", uid, tid)).await?
                }
                "q8t_x_bookmark" => {
                    let tid = args.get("tweet_id").and_then(|v| v.as_str()).ok_or("tweet_id required")?;
                    client.post(&format!("/x/users/{}/bookmarks", uid), &serde_json::json!({"tweet_id": tid})).await?
                }
                "q8t_x_follow" => {
                    let target = args.get("user_id").and_then(|v| v.as_str()).ok_or("user_id required")?;
                    client.post(&format!("/x/users/{}/following_action", uid), &serde_json::json!({"target_user_id": target})).await?
                }
                "q8t_x_unfollow" => {
                    let target = args.get("user_id").and_then(|v| v.as_str()).ok_or("user_id required")?;
                    client.delete(&format!("/x/users/{}/following/{}", uid, target)).await?
                }
                _ => unreachable!(),
            }
        }
        "q8t_x_bookmarks" => {
            let me: Value = client.get("/x/users/me").await?;
            let uid = me.get("data").and_then(|d| d.get("data")).and_then(|d| d.get("id")).and_then(|v| v.as_str()).ok_or("Could not get user ID")?;
            let max = args.get("max_results").and_then(|v| v.as_u64()).unwrap_or(20);
            client.get(&format!("/x/users/{}/bookmarks?max_results={}", uid, max)).await?
        }
        "q8t_scheduler_status" => client.get("/scheduler/status").await?,
        "q8t_scheduler_queue" => {
            let limit = args.get("limit").and_then(|v| v.as_u64()).unwrap_or(20);
            client.get(&format!("/scheduler/queue?limit={}", limit)).await?
        }
        _ => return Err(format!("Unknown tool: {}", name)),
    };

    serde_json::to_string_pretty(&result).map_err(|e| e.to_string())
}

async fn handle_resource_read(
    client: &crate::client::Q8tClient,
    uri: &str,
) -> Result<String, String> {
    let result: Value = match uri {
        "q8t://accounts" => client.get("/auth/accounts").await?,
        "q8t://posts/drafts" => client.get("/posts?status=draft").await?,
        "q8t://posts/scheduled" => client.get("/posts?status=scheduled").await?,
        "q8t://scheduler/status" => client.get("/scheduler/status").await?,
        _ => return Err(format!("Unknown resource: {}", uri)),
    };

    serde_json::to_string_pretty(&result).map_err(|e| e.to_string())
}

fn urlencoded(s: &str) -> String {
    s.replace(' ', "%20").replace('#', "%23").replace('&', "%26")
}
