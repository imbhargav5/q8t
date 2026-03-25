mod client;
mod commands;
pub mod mcp;
mod output;

use clap::{Parser, Subcommand};
use client::Q8tClient;

#[derive(Parser)]
#[command(name = "q8t", about = "q8t social media management CLI", version)]
struct Cli {
    /// Server URL (overrides discovery)
    #[arg(long, global = true)]
    server: Option<String>,

    /// Output format: table, json, quiet
    #[arg(long, global = true, default_value = "table")]
    output: String,

    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Server health check
    Status,
    /// Account management
    Auth {
        #[command(subcommand)]
        command: commands::auth::AuthCommands,
    },
    /// Post management
    Post {
        #[command(subcommand)]
        command: commands::post::PostCommands,
    },
    /// X (Twitter) direct commands
    X {
        #[command(subcommand)]
        command: commands::x::XCommands,
    },
    /// Media management
    Media {
        #[command(subcommand)]
        command: commands::media::MediaCommands,
    },
    /// Scheduler management
    Scheduler {
        #[command(subcommand)]
        command: commands::scheduler::SchedulerCommands,
    },
    /// Launch MCP server (stdio transport)
    McpServer,
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    let client = match &cli.server {
        Some(url) => {
            // Read token from ~/.q8t/server.token
            let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
            let token = std::fs::read_to_string(
                std::path::Path::new(&home).join(".q8t").join("server.token"),
            )
            .unwrap_or_default()
            .trim()
            .to_string();
            Q8tClient::new(url, &token)
        }
        None => match Q8tClient::discover() {
            Ok(c) => c,
            Err(e) => {
                eprintln!("Error: {}", e);
                std::process::exit(1);
            }
        },
    };

    let format = &cli.output;

    let result = match cli.command {
        Commands::Status => {
            let resp: Result<serde_json::Value, String> = client.get("/health").await;
            match resp {
                Ok(v) => {
                    output::print(&v, format);
                    Ok(())
                }
                Err(e) => Err(e),
            }
        }
        Commands::Auth { command } => commands::auth::run(command, &client, format).await,
        Commands::Post { command } => commands::post::run(command, &client, format).await,
        Commands::X { command } => commands::x::run(command, &client, format).await,
        Commands::Media { command } => commands::media::run(command, &client, format).await,
        Commands::Scheduler { command } => commands::scheduler::run(command, &client, format).await,
        Commands::McpServer => {
            eprintln!("MCP server starting on stdio...");
            mcp::run_mcp_server().await
        }
    };

    if let Err(e) = result {
        eprintln!("Error: {}", e);
        std::process::exit(1);
    }
}

