use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};
use q8t_core::response::ApiResponse;
use q8t_db::models::SchedulerJob;
use q8t_db::repositories::scheduler_jobs::SchedulerJobRepository;
use serde::Serialize;

use crate::server::error::AppError;
use crate::state::AppState;

#[derive(Serialize)]
pub struct SchedulerStatus {
    pub running: bool,
    pub pending_jobs: i64,
}

async fn scheduler_status(
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<SchedulerStatus>>, AppError> {
    let running = *state.scheduler_running.read().await;
    let pending = SchedulerJobRepository::pending_count(&state.db).await?;
    Ok(Json(ApiResponse::ok(SchedulerStatus {
        running,
        pending_jobs: pending,
    })))
}

async fn pause_scheduler(
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<SchedulerStatus>>, AppError> {
    *state.scheduler_running.write().await = false;
    let pending = SchedulerJobRepository::pending_count(&state.db).await?;
    Ok(Json(ApiResponse::ok(SchedulerStatus {
        running: false,
        pending_jobs: pending,
    })))
}

async fn resume_scheduler(
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<SchedulerStatus>>, AppError> {
    *state.scheduler_running.write().await = true;
    let pending = SchedulerJobRepository::pending_count(&state.db).await?;
    Ok(Json(ApiResponse::ok(SchedulerStatus {
        running: true,
        pending_jobs: pending,
    })))
}

async fn scheduler_queue(
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<Vec<SchedulerJob>>>, AppError> {
    let jobs = SchedulerJobRepository::list_upcoming(&state.db, 50).await?;
    Ok(Json(ApiResponse::ok(jobs)))
}

async fn scheduler_history(
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<Vec<SchedulerJob>>>, AppError> {
    let jobs = SchedulerJobRepository::list_recent(&state.db, 50).await?;
    Ok(Json(ApiResponse::ok(jobs)))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/status", get(scheduler_status))
        .route("/pause", post(pause_scheduler))
        .route("/resume", post(resume_scheduler))
        .route("/queue", get(scheduler_queue))
        .route("/history", get(scheduler_history))
}
