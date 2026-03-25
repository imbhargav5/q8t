use reqwest::Client;
use serde::de::DeserializeOwned;
use std::path::Path;

/// HTTP client for communicating with the q8t server.
pub struct Q8tClient {
    http: Client,
    base_url: String,
    token: String,
}

impl Q8tClient {
    pub fn new(base_url: &str, token: &str) -> Self {
        Self {
            http: Client::new(),
            base_url: base_url.trim_end_matches('/').to_string(),
            token: token.to_string(),
        }
    }

    /// Discover server from ~/.q8t/ files.
    pub fn discover() -> Result<Self, String> {
        let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
        let q8t_dir = Path::new(&home).join(".q8t");

        let port = std::fs::read_to_string(q8t_dir.join("server.port"))
            .map_err(|_| "q8t server not running (no ~/.q8t/server.port). Start the desktop app first.".to_string())?
            .trim()
            .parse::<u16>()
            .map_err(|_| "Invalid port in ~/.q8t/server.port".to_string())?;

        let token = std::fs::read_to_string(q8t_dir.join("server.token"))
            .map_err(|_| "No server token found at ~/.q8t/server.token".to_string())?
            .trim()
            .to_string();

        Ok(Self::new(&format!("http://127.0.0.1:{}", port), &token))
    }

    fn url(&self, path: &str) -> String {
        format!("{}/api/v1{}", self.base_url, path)
    }

    pub async fn get<T: DeserializeOwned>(&self, path: &str) -> Result<T, String> {
        let resp = self
            .http
            .get(self.url(path))
            .bearer_auth(&self.token)
            .send()
            .await
            .map_err(|e| format!("Request failed: {}", e))?;

        let status = resp.status();
        let body = resp.text().await.map_err(|e| e.to_string())?;

        if !status.is_success() {
            return Err(format!("HTTP {}: {}", status, body));
        }

        serde_json::from_str(&body).map_err(|e| format!("Parse error: {} (body: {})", e, &body[..body.len().min(200)]))
    }

    pub async fn post<T: DeserializeOwned>(&self, path: &str, body: &impl serde::Serialize) -> Result<T, String> {
        let resp = self
            .http
            .post(self.url(path))
            .bearer_auth(&self.token)
            .json(body)
            .send()
            .await
            .map_err(|e| format!("Request failed: {}", e))?;

        let status = resp.status();
        let text = resp.text().await.map_err(|e| e.to_string())?;

        if !status.is_success() {
            return Err(format!("HTTP {}: {}", status, text));
        }

        serde_json::from_str(&text).map_err(|e| format!("Parse error: {}", e))
    }

    pub async fn patch<T: DeserializeOwned>(&self, path: &str, body: &impl serde::Serialize) -> Result<T, String> {
        let resp = self
            .http
            .patch(self.url(path))
            .bearer_auth(&self.token)
            .json(body)
            .send()
            .await
            .map_err(|e| format!("Request failed: {}", e))?;

        let status = resp.status();
        let text = resp.text().await.map_err(|e| e.to_string())?;

        if !status.is_success() {
            return Err(format!("HTTP {}: {}", status, text));
        }

        serde_json::from_str(&text).map_err(|e| format!("Parse error: {}", e))
    }

    pub async fn delete<T: DeserializeOwned>(&self, path: &str) -> Result<T, String> {
        let resp = self
            .http
            .delete(self.url(path))
            .bearer_auth(&self.token)
            .send()
            .await
            .map_err(|e| format!("Request failed: {}", e))?;

        let status = resp.status();
        let text = resp.text().await.map_err(|e| e.to_string())?;

        if !status.is_success() {
            return Err(format!("HTTP {}: {}", status, text));
        }

        serde_json::from_str(&text).map_err(|e| format!("Parse error: {}", e))
    }
}
