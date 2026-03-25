use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use q8t_core::error::{ErrorCode, Q8tError};
use q8t_core::response::ApiErrorResponse;

/// Axum-compatible error type that converts to proper JSON error responses.
pub struct AppError(pub Q8tError);

impl From<Q8tError> for AppError {
    fn from(err: Q8tError) -> Self {
        AppError(err)
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        AppError(Q8tError::Database(err.to_string()))
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (code, message) = match &self.0 {
            Q8tError::NotFound(msg) => (ErrorCode::NotFound, msg.clone()),
            Q8tError::Validation(msg) => (ErrorCode::ValidationError, msg.clone()),
            Q8tError::Unauthorized(msg) => (ErrorCode::Unauthorized, msg.clone()),
            Q8tError::PlatformApi { platform, message, .. } => {
                (ErrorCode::PlatformError, format!("{}: {}", platform, message))
            }
            Q8tError::RateLimited { platform, retry_after_secs } => (
                ErrorCode::RateLimited,
                format!("Rate limited by {}, retry after {}s", platform, retry_after_secs),
            ),
            Q8tError::Database(msg) => (ErrorCode::InternalError, msg.clone()),
            Q8tError::Encryption(msg) => (ErrorCode::InternalError, msg.clone()),
            Q8tError::Config(msg) => (ErrorCode::InternalError, msg.clone()),
            Q8tError::Io(err) => (ErrorCode::InternalError, err.to_string()),
            Q8tError::Internal(msg) => (ErrorCode::InternalError, msg.clone()),
        };

        let status = StatusCode::from_u16(code.status_code()).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);
        let body = ApiErrorResponse::new(code, message);

        (status, Json(body)).into_response()
    }
}
