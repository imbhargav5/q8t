use thiserror::Error;

#[derive(Debug, Error)]
pub enum LinkedInApiError {
    #[error("HTTP error: {0}")]
    Http(#[from] reqwest::Error),

    #[error("LinkedIn API error (status {status_code}): {message}")]
    Api { status_code: u16, message: String },

    #[error("Rate limited, retry after {retry_after_secs}s")]
    RateLimited { retry_after_secs: u64 },

    #[error("Deserialization error: {0}")]
    Deserialize(String),
}
