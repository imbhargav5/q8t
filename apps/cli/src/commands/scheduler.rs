use clap::Subcommand;

use crate::client::Q8tClient;
use crate::output;

#[derive(Subcommand)]
pub enum SchedulerCommands {
    /// Show scheduler status
    Status,
    /// Pause the scheduler
    Pause,
    /// Resume the scheduler
    Resume,
    /// Show upcoming scheduled posts
    Queue,
    /// Show recent publication history
    History,
}

pub async fn run(cmd: SchedulerCommands, client: &Q8tClient, format: &str) -> Result<(), String> {
    match cmd {
        SchedulerCommands::Status => {
            let resp: serde_json::Value = client.get("/scheduler/status").await?;
            output::print(&resp, format);
        }
        SchedulerCommands::Pause => {
            let resp: serde_json::Value = client.post("/scheduler/pause", &serde_json::json!({})).await?;
            output::print(&resp, format);
        }
        SchedulerCommands::Resume => {
            let resp: serde_json::Value = client.post("/scheduler/resume", &serde_json::json!({})).await?;
            output::print(&resp, format);
        }
        SchedulerCommands::Queue => {
            let resp: serde_json::Value = client.get("/scheduler/queue").await?;
            output::print(&resp, format);
        }
        SchedulerCommands::History => {
            let resp: serde_json::Value = client.get("/scheduler/history").await?;
            output::print(&resp, format);
        }
    }
    Ok(())
}
