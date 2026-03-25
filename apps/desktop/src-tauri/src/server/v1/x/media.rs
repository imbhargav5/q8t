use axum::Router;
use crate::state::AppState;

// X media upload (chunked INIT/APPEND/FINALIZE) requires the v1.1 upload endpoint.
// This will be fully implemented when the x-client crate adds media upload support.
// For now, media should be uploaded locally via /api/v1/media and the x_media_id
// tracked after manual upload.

pub fn router() -> Router<AppState> {
    Router::new()
}
