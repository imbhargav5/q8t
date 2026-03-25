pub mod auth;
pub mod health;
pub mod media;
pub mod posts;
pub mod scheduler;
pub mod x;

use axum::Router;
use crate::state::AppState;

/// Build the /api/v1 router with all sub-routes.
pub fn router() -> Router<AppState> {
    Router::new()
        .nest("/health", health::router())
        .nest("/auth", auth::router())
        .nest("/posts", posts::router())
        .nest("/media", media::router())
        .nest("/scheduler", scheduler::router())
        .nest("/x", x::router())
}
