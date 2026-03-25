use crate::error::XApiError;
use crate::types::*;
use crate::XClient;

const USER_FIELDS: &str = "id,name,username,description,profile_image_url,created_at,public_metrics,verified";

impl XClient {
    /// Get the authenticated user.
    pub async fn get_me(&self) -> Result<User, XApiError> {
        let resp: DataResponse<User> = self
            .get("/users/me", &[("user.fields", USER_FIELDS)])
            .await?;
        resp.data.ok_or_else(|| XApiError::Deserialize("No data in response".to_string()))
    }

    /// Get a user by ID.
    pub async fn get_user(&self, id: &str) -> Result<User, XApiError> {
        let resp: DataResponse<User> = self
            .get(&format!("/users/{}", id), &[("user.fields", USER_FIELDS)])
            .await?;
        resp.data.ok_or_else(|| XApiError::Deserialize("No data in response".to_string()))
    }

    /// Get a user by username.
    pub async fn get_user_by_username(&self, username: &str) -> Result<User, XApiError> {
        let resp: DataResponse<User> = self
            .get(
                &format!("/users/by/username/{}", username),
                &[("user.fields", USER_FIELDS)],
            )
            .await?;
        resp.data.ok_or_else(|| XApiError::Deserialize("No data in response".to_string()))
    }

    /// Get tweets by a user.
    pub async fn get_user_tweets(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<Tweet>, XApiError> {
        let max = max_results.unwrap_or(10).to_string();
        let mut query = vec![
            ("max_results", max.as_str()),
            ("tweet.fields", "author_id,created_at,public_metrics"),
        ];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }

        let resp: DataListResponse<Tweet> = self
            .get(&format!("/users/{}/tweets", user_id), &query)
            .await?;
        Ok(resp.data.unwrap_or_default())
    }

    /// Get followers of a user.
    pub async fn get_followers(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<User>, XApiError> {
        let max = max_results.unwrap_or(100).to_string();
        let mut query = vec![
            ("max_results", max.as_str()),
            ("user.fields", USER_FIELDS),
        ];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }

        let resp: DataListResponse<User> = self
            .get(&format!("/users/{}/followers", user_id), &query)
            .await?;
        Ok(resp.data.unwrap_or_default())
    }

    /// Get users that a user is following.
    pub async fn get_following(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<User>, XApiError> {
        let max = max_results.unwrap_or(100).to_string();
        let mut query = vec![
            ("max_results", max.as_str()),
            ("user.fields", USER_FIELDS),
        ];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }

        let resp: DataListResponse<User> = self
            .get(&format!("/users/{}/following", user_id), &query)
            .await?;
        Ok(resp.data.unwrap_or_default())
    }

    /// Get tweets mentioning a user.
    pub async fn get_user_mentions(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<Tweet>, XApiError> {
        let max = max_results.unwrap_or(10).to_string();
        let mut query = vec![
            ("max_results", max.as_str()),
            ("tweet.fields", "author_id,created_at,public_metrics"),
        ];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }

        let resp: DataListResponse<Tweet> = self
            .get(&format!("/users/{}/mentions", user_id), &query)
            .await?;
        Ok(resp.data.unwrap_or_default())
    }

    /// Get home timeline (reverse chronological).
    pub async fn get_home_timeline(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<Tweet>, XApiError> {
        let max = max_results.unwrap_or(10).to_string();
        let mut query = vec![
            ("max_results", max.as_str()),
            ("tweet.fields", "author_id,created_at,public_metrics"),
        ];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }

        let resp: DataListResponse<Tweet> = self
            .get(
                &format!("/users/{}/timelines/reverse_chronological", user_id),
                &query,
            )
            .await?;
        Ok(resp.data.unwrap_or_default())
    }
}
