use axum::Router;
use std::net::SocketAddr;
use std::path::Path;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;

use crate::server::middleware::ServerToken;
use crate::state::AppState;

const DEFAULT_PORT: u16 = 19280;

/// Start the embedded Axum HTTP server.
///
/// Binds to 127.0.0.1 only (local access). Writes port and token files
/// to `~/.q8t/` for CLI/MCP discovery.
pub async fn start_server(state: AppState) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let port = state.server_port;
    let token = state.server_token.clone();

    // Write discovery files
    write_discovery_files(port, &token)?;

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .nest("/api/v1", super::v1::router())
        .layer(cors)
        .layer(TraceLayer::new_for_http())
        .layer(axum::Extension(ServerToken(token)))
        .with_state(state);

    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    tracing::info!("HTTP server listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

/// Get the default server port.
pub fn default_port() -> u16 {
    DEFAULT_PORT
}

fn write_discovery_files(port: u16, token: &str) -> Result<(), std::io::Error> {
    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
    let q8t_dir = Path::new(&home).join(".q8t");
    std::fs::create_dir_all(&q8t_dir)?;

    std::fs::write(q8t_dir.join("server.port"), port.to_string())?;
    std::fs::write(q8t_dir.join("server.token"), token)?;

    // Restrict token file permissions
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let _ = std::fs::set_permissions(
            q8t_dir.join("server.token"),
            std::fs::Permissions::from_mode(0o600),
        );
    }

    tracing::info!(
        "Discovery files written to {}",
        q8t_dir.display()
    );
    Ok(())
}

/// Clean up discovery files on shutdown.
pub fn cleanup_discovery_files() {
    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
    let q8t_dir = Path::new(&home).join(".q8t");
    let _ = std::fs::remove_file(q8t_dir.join("server.port"));
    // Keep server.token — it's stable across restarts
}
