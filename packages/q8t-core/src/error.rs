use thiserror::Error;

/// Common errors shared across q8t crates.
#[derive(Debug, Error)]
pub enum Q8tError {
    #[error("Database error: {0}")]
    Database(String),

    #[error("Not found: {0}")]
    NotFound(String),

    #[error("Validation error: {0}")]
    Validation(String),

    #[error("Encryption error: {0}")]
    Encryption(String),

    #[error("Platform API error: {platform} - {message}")]
    PlatformApi {
        platform: String,
        message: String,
        status_code: Option<u16>,
    },

    #[error("Rate limited by {platform}, retry after {retry_after_secs}s")]
    RateLimited {
        platform: String,
        retry_after_secs: u64,
    },

    #[error("Unauthorized: {0}")]
    Unauthorized(String),

    #[error("Configuration error: {0}")]
    Config(String),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("{0}")]
    Internal(String),
}

/// Error codes returned in the HTTP API error envelope.
#[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Serialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum ErrorCode {
    ValidationError,
    Unauthorized,
    NotFound,
    Conflict,
    PlatformError,
    RateLimited,
    InternalError,
}

impl ErrorCode {
    pub fn status_code(&self) -> u16 {
        match self {
            ErrorCode::ValidationError => 400,
            ErrorCode::Unauthorized => 401,
            ErrorCode::NotFound => 404,
            ErrorCode::Conflict => 409,
            ErrorCode::RateLimited => 429,
            ErrorCode::PlatformError => 502,
            ErrorCode::InternalError => 500,
        }
    }
}
