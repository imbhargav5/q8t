use clap::Subcommand;

use crate::client::Q8tClient;
use crate::output;

#[derive(Subcommand)]
pub enum AuthCommands {
    /// Add a platform account
    Add {
        /// Platform (x, linkedin, instagram, threads)
        #[arg(long)]
        platform: String,
        /// Bearer token
        #[arg(long)]
        token: Option<String>,
        /// Label for this account
        #[arg(long)]
        label: Option<String>,
    },
    /// List connected accounts
    List,
    /// Verify account credentials
    Verify {
        /// Account ID (optional, verifies all if omitted)
        id: Option<String>,
    },
    /// Remove a connected account
    Remove {
        /// Account ID
        id: String,
    },
}

pub async fn run(cmd: AuthCommands, client: &Q8tClient, format: &str) -> Result<(), String> {
    match cmd {
        AuthCommands::Add { platform, token, label } => {
            let bearer_token = match token {
                Some(t) => t,
                None => {
                    eprintln!("Enter bearer token: ");
                    let mut input = String::new();
                    std::io::stdin().read_line(&mut input).map_err(|e| e.to_string())?;
                    input.trim().to_string()
                }
            };

            let resp: serde_json::Value = client
                .post(
                    "/auth/accounts",
                    &serde_json::json!({
                        "platform": platform,
                        "label": label,
                        "credentials": { "bearer_token": bearer_token }
                    }),
                )
                .await?;

            output::print(&resp, format);
        }
        AuthCommands::List => {
            let resp: serde_json::Value = client.get("/auth/accounts").await?;
            output::print(&resp, format);
        }
        AuthCommands::Verify { id } => {
            if let Some(id) = id {
                let resp: serde_json::Value = client.post(&format!("/auth/accounts/{}/verify", id), &serde_json::json!({})).await?;
                output::print(&resp, format);
            } else {
                let accounts: serde_json::Value = client.get("/auth/accounts").await?;
                if let Some(data) = accounts.get("data").and_then(|d| d.as_array()) {
                    for account in data {
                        if let Some(aid) = account.get("id").and_then(|v| v.as_str()) {
                            eprint!("Verifying {}... ", account.get("platform").and_then(|v| v.as_str()).unwrap_or("?"));
                            let resp: serde_json::Value = client.post(&format!("/auth/accounts/{}/verify", aid), &serde_json::json!({})).await?;
                            output::print(&resp, format);
                        }
                    }
                }
            }
        }
        AuthCommands::Remove { id } => {
            let resp: serde_json::Value = client.delete(&format!("/auth/accounts/{}", id)).await?;
            output::print(&resp, format);
        }
    }
    Ok(())
}
