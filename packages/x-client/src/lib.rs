pub mod error;
pub mod interactions;
pub mod lists;
pub mod tweets;
pub mod types;
pub mod users;

use reqwest::Client;

/// X API v2 client.
///
/// Uses Bearer token authentication. All methods call `https://api.x.com/2/`.
#[derive(Clone)]
pub struct XClient {
    http: Client,
    bearer_token: String,
    base_url: String,
}

impl XClient {
    /// Create a new client with a Bearer token.
    pub fn new(bearer_token: &str) -> Self {
        Self {
            http: Client::new(),
            bearer_token: bearer_token.to_string(),
            base_url: "https://api.x.com/2".to_string(),
        }
    }

    /// Create a client with a custom base URL (for testing).
    pub fn with_base_url(bearer_token: &str, base_url: &str) -> Self {
        Self {
            http: Client::new(),
            bearer_token: bearer_token.to_string(),
            base_url: base_url.to_string(),
        }
    }

    fn url(&self, path: &str) -> String {
        format!("{}{}", self.base_url, path)
    }

    async fn get<T: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        query: &[(&str, &str)],
    ) -> Result<T, error::XApiError> {
        let resp = self
            .http
            .get(self.url(path))
            .bearer_auth(&self.bearer_token)
            .query(query)
            .send()
            .await?;

        handle_response(resp).await
    }

    async fn post<T: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        body: &impl serde::Serialize,
    ) -> Result<T, error::XApiError> {
        let resp = self
            .http
            .post(self.url(path))
            .bearer_auth(&self.bearer_token)
            .json(body)
            .send()
            .await?;

        handle_response(resp).await
    }

    async fn delete<T: serde::de::DeserializeOwned>(
        &self,
        path: &str,
    ) -> Result<T, error::XApiError> {
        let resp = self
            .http
            .delete(self.url(path))
            .bearer_auth(&self.bearer_token)
            .send()
            .await?;

        handle_response(resp).await
    }

    async fn put<T: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        body: &impl serde::Serialize,
    ) -> Result<T, error::XApiError> {
        let resp = self
            .http
            .put(self.url(path))
            .bearer_auth(&self.bearer_token)
            .json(body)
            .send()
            .await?;

        handle_response(resp).await
    }
}

async fn handle_response<T: serde::de::DeserializeOwned>(
    resp: reqwest::Response,
) -> Result<T, error::XApiError> {
    let status = resp.status();

    if status == reqwest::StatusCode::TOO_MANY_REQUESTS {
        let retry_after = resp
            .headers()
            .get("retry-after")
            .and_then(|v| v.to_str().ok())
            .and_then(|v| v.parse::<u64>().ok())
            .unwrap_or(60);
        return Err(error::XApiError::RateLimited { retry_after_secs: retry_after });
    }

    if !status.is_success() {
        let body = resp.text().await.unwrap_or_default();
        return Err(error::XApiError::Api {
            status_code: status.as_u16(),
            message: body,
        });
    }

    let body = resp.json::<T>().await?;
    Ok(body)
}

// Re-export key types
pub use types::*;
pub use error::XApiError;
