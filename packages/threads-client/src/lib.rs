pub mod error;
pub mod insights;
pub mod media;
pub mod profiles;
pub mod replies;
pub mod search;
pub mod types;

use reqwest::Client;

/// Threads API client.
///
/// Uses an access token passed as the `access_token` query parameter.
#[derive(Clone)]
pub struct ThreadsClient {
    http: Client,
    access_token: String,
    base_url: String,
}

impl ThreadsClient {
    /// Create a new client with a Threads access token.
    pub fn new(access_token: &str) -> Self {
        Self {
            http: Client::new(),
            access_token: access_token.to_string(),
            base_url: "https://graph.threads.net".to_string(),
        }
    }

    /// Create a client with a custom base URL.
    pub fn with_base_url(access_token: &str, base_url: &str) -> Self {
        Self {
            http: Client::new(),
            access_token: access_token.to_string(),
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
    ) -> Result<T, error::ThreadsApiError> {
        let mut params = query.to_vec();
        params.push(("access_token", &self.access_token));

        let resp = self.http.get(self.url(path)).query(&params).send().await?;

        handle_response(resp).await
    }

    async fn post<T: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        body: &impl serde::Serialize,
        query: &[(&str, &str)],
    ) -> Result<T, error::ThreadsApiError> {
        let mut params = query.to_vec();
        params.push(("access_token", &self.access_token));

        let resp = self
            .http
            .post(self.url(path))
            .query(&params)
            .json(body)
            .send()
            .await?;

        handle_response(resp).await
    }
}

async fn handle_response<T: serde::de::DeserializeOwned>(
    resp: reqwest::Response,
) -> Result<T, error::ThreadsApiError> {
    let status = resp.status();

    if status == reqwest::StatusCode::TOO_MANY_REQUESTS {
        let retry_after = resp
            .headers()
            .get("retry-after")
            .and_then(|v| v.to_str().ok())
            .and_then(|v| v.parse::<u64>().ok())
            .unwrap_or(60);
        return Err(error::ThreadsApiError::RateLimited {
            retry_after_secs: retry_after,
        });
    }

    if !status.is_success() {
        let body = resp.text().await.unwrap_or_default();
        return Err(error::ThreadsApiError::Api {
            status_code: status.as_u16(),
            message: body,
        });
    }

    let body = resp.json::<T>().await?;
    Ok(body)
}

pub use error::ThreadsApiError;
pub use types::*;
