pub mod interactions;
pub mod lists;
pub mod media;
pub mod tweets;
pub mod users;

use axum::Router;
use crate::state::AppState;

pub fn router() -> Router<AppState> {
    Router::new()
        .nest("/tweets", tweets::router())
        .nest("/users", users::router())
        .nest("/lists", lists::router())
        .nest("/media", media::router())
        .merge(interactions::router())
}
