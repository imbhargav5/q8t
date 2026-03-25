use clap::Subcommand;

use crate::client::Q8tClient;
use crate::output;

#[derive(Subcommand)]
pub enum MediaCommands {
    /// Upload a file to local media library
    Upload {
        /// Path to the file
        file: String,
        /// Alt text for accessibility
        #[arg(long)]
        alt_text: Option<String>,
    },
    /// List media assets
    List {
        /// Limit results
        #[arg(long, default_value = "20")]
        limit: i64,
    },
    /// Delete a media asset
    Delete {
        /// Media ID
        id: String,
    },
}

pub async fn run(cmd: MediaCommands, client: &Q8tClient, format: &str) -> Result<(), String> {
    match cmd {
        MediaCommands::Upload { file, alt_text } => {
            let path = std::path::Path::new(&file);
            if !path.exists() {
                return Err(format!("File not found: {}", file));
            }

            let filename = path.file_name().unwrap_or_default().to_string_lossy().to_string();
            let data = std::fs::read(path).map_err(|e| format!("Failed to read file: {}", e))?;

            let mime = if filename.ends_with(".png") {
                "image/png"
            } else if filename.ends_with(".jpg") || filename.ends_with(".jpeg") {
                "image/jpeg"
            } else if filename.ends_with(".gif") {
                "image/gif"
            } else if filename.ends_with(".mp4") {
                "video/mp4"
            } else if filename.ends_with(".webp") {
                "image/webp"
            } else {
                "application/octet-stream"
            };

            let file_part = reqwest::multipart::Part::bytes(data)
                .file_name(filename)
                .mime_str(mime)
                .map_err(|e| e.to_string())?;

            let mut form = reqwest::multipart::Form::new().part("file", file_part);
            if let Some(alt) = &alt_text {
                form = form.text("alt_text", alt.clone());
            }

            // Use raw reqwest for multipart
            let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
            let q8t_dir = std::path::Path::new(&home).join(".q8t");
            let port: u16 = std::fs::read_to_string(q8t_dir.join("server.port"))
                .unwrap_or_else(|_| "19280".to_string())
                .trim()
                .parse()
                .unwrap_or(19280);
            let token = std::fs::read_to_string(q8t_dir.join("server.token"))
                .unwrap_or_default()
                .trim()
                .to_string();

            let resp = reqwest::Client::new()
                .post(format!("http://127.0.0.1:{}/api/v1/media", port))
                .bearer_auth(&token)
                .multipart(form)
                .send()
                .await
                .map_err(|e| format!("Upload failed: {}", e))?;

            let body: serde_json::Value = resp.json().await.map_err(|e| e.to_string())?;
            output::print(&body, format);
        }
        MediaCommands::List { limit } => {
            let resp: serde_json::Value = client.get(&format!("/media?limit={}", limit)).await?;
            output::print(&resp, format);
        }
        MediaCommands::Delete { id } => {
            let resp: serde_json::Value = client.delete(&format!("/media/{}", id)).await?;
            output::print(&resp, format);
        }
    }
    Ok(())
}
