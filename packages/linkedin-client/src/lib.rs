pub mod connections;
pub mod error;
pub mod posts;
pub mod profiles;
pub mod types;

use reqwest::Client;

const LINKEDIN_RESTLI_VERSION: &str = "2.0.0";

/// LinkedIn API v2 client.
///
/// Uses OAuth access tokens via `Authorization: Bearer`.
#[derive(Clone)]
pub struct LinkedInClient {
    http: Client,
    access_token: String,
    base_url: String,
}

impl LinkedInClient {
    /// Create a new client with an OAuth access token.
    pub fn new(access_token: &str) -> Self {
        Self {
            http: Client::new(),
            access_token: access_token.to_string(),
            base_url: "https://api.linkedin.com/v2".to_string(),
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
    ) -> Result<T, error::LinkedInApiError> {
        let resp = self
            .http
            .get(self.url(path))
            .bearer_auth(&self.access_token)
            .header("X-Restli-Protocol-Version", LINKEDIN_RESTLI_VERSION)
            .query(query)
            .send()
            .await?;

        handle_response(resp).await
    }

    async fn post<T: serde::de::DeserializeOwned>(
        &self,
        path: &str,
        body: &impl serde::Serialize,
    ) -> Result<T, error::LinkedInApiError> {
        let resp = self
            .http
            .post(self.url(path))
            .bearer_auth(&self.access_token)
            .header("X-Restli-Protocol-Version", LINKEDIN_RESTLI_VERSION)
            .json(body)
            .send()
            .await?;

        handle_response(resp).await
    }
}

async fn handle_response<T: serde::de::DeserializeOwned>(
    resp: reqwest::Response,
) -> Result<T, error::LinkedInApiError> {
    let status = resp.status();

    if status == reqwest::StatusCode::TOO_MANY_REQUESTS {
        let retry_after = resp
            .headers()
            .get("retry-after")
            .and_then(|v| v.to_str().ok())
            .and_then(|v| v.parse::<u64>().ok())
            .unwrap_or(60);
        return Err(error::LinkedInApiError::RateLimited {
            retry_after_secs: retry_after,
        });
    }

    if !status.is_success() {
        let body = resp.text().await.unwrap_or_default();
        return Err(error::LinkedInApiError::Api {
            status_code: status.as_u16(),
            message: body,
        });
    }

    let body = resp.json::<T>().await?;
    Ok(body)
}

pub use error::LinkedInApiError;
pub use types::*;
