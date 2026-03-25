use axum::{extract::State, routing::get, Json, Router};
use q8t_core::response::ApiResponse;
use q8t_db::repositories::credentials::CredentialRepository;
use serde::Serialize;

use crate::state::AppState;

#[derive(Serialize)]
pub struct HealthResponse {
    pub version: String,
    pub database: String,
    pub scheduler: String,
    pub platforms: Vec<ConnectedPlatform>,
}

#[derive(Serialize)]
pub struct ConnectedPlatform {
    pub platform: String,
    pub connected: bool,
    pub username: Option<String>,
}

async fn health_check(State(state): State<AppState>) -> Json<ApiResponse<HealthResponse>> {
    let db_status = sqlx::query("SELECT 1")
        .execute(&state.db)
        .await
        .map(|_| "ok".to_string())
        .unwrap_or_else(|e| format!("error: {}", e));

    let scheduler_running = *state.scheduler_running.read().await;

    // Check connected platform accounts
    let credentials = CredentialRepository::list(&state.db, None)
        .await
        .unwrap_or_default();

    let mut platforms = vec![];
    for cred in &credentials {
        platforms.push(ConnectedPlatform {
            platform: cred.platform.clone(),
            connected: cred.is_active,
            username: cred.platform_username.clone(),
        });
    }

    Json(ApiResponse::ok(HealthResponse {
        version: env!("CARGO_PKG_VERSION").to_string(),
        database: db_status,
        scheduler: if scheduler_running {
            "running".to_string()
        } else {
            "paused".to_string()
        },
        platforms,
    }))
}

pub fn router() -> Router<AppState> {
    Router::new().route("/", get(health_check))
}
