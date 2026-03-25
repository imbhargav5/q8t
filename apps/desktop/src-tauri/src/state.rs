use q8t_crypto::CredentialCipher;
use sqlx::SqlitePool;
use std::sync::Arc;
use tokio::sync::RwLock;

/// Shared application state accessible by both Tauri commands and Axum handlers.
#[derive(Clone)]
pub struct AppState {
    pub db: SqlitePool,
    pub cipher: Arc<CredentialCipher>,
    pub server_token: String,
    pub server_port: u16,
    pub scheduler_running: Arc<RwLock<bool>>,
}

impl AppState {
    pub fn new(
        db: SqlitePool,
        cipher: CredentialCipher,
        server_token: String,
        server_port: u16,
    ) -> Self {
        Self {
            db,
            cipher: Arc::new(cipher),
            server_token,
            server_port,
            scheduler_running: Arc::new(RwLock::new(true)),
        }
    }
}
