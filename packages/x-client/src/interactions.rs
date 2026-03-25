use crate::error::XApiError;
use crate::types::*;
use crate::XClient;

impl XClient {
    // -- Likes --

    pub async fn like_tweet(&self, user_id: &str, tweet_id: &str) -> Result<bool, XApiError> {
        let body = serde_json::json!({"tweet_id": tweet_id});
        let resp: BoolDataResponse = self.post(&format!("/users/{}/likes", user_id), &body).await?;
        Ok(resp.data.and_then(|d| d.fields.get("liked").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn unlike_tweet(&self, user_id: &str, tweet_id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/users/{}/likes/{}", user_id, tweet_id)).await?;
        Ok(resp.data.and_then(|d| d.fields.get("liked").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn get_liked_tweets(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<Tweet>, XApiError> {
        let max = max_results.unwrap_or(10).to_string();
        let mut query = vec![("max_results", max.as_str())];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }
        let resp: DataListResponse<Tweet> = self.get(&format!("/users/{}/liked_tweets", user_id), &query).await?;
        Ok(resp.data.unwrap_or_default())
    }

    // -- Retweets --

    pub async fn retweet(&self, user_id: &str, tweet_id: &str) -> Result<bool, XApiError> {
        let body = serde_json::json!({"tweet_id": tweet_id});
        let resp: BoolDataResponse = self.post(&format!("/users/{}/retweets", user_id), &body).await?;
        Ok(resp.data.and_then(|d| d.fields.get("retweeted").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn unretweet(&self, user_id: &str, tweet_id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/users/{}/retweets/{}", user_id, tweet_id)).await?;
        Ok(resp.data.and_then(|d| d.fields.get("retweeted").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    // -- Bookmarks --

    pub async fn get_bookmarks(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<Tweet>, XApiError> {
        let max = max_results.unwrap_or(10).to_string();
        let mut query = vec![("max_results", max.as_str())];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }
        let resp: DataListResponse<Tweet> = self.get(&format!("/users/{}/bookmarks", user_id), &query).await?;
        Ok(resp.data.unwrap_or_default())
    }

    pub async fn bookmark_tweet(&self, user_id: &str, tweet_id: &str) -> Result<bool, XApiError> {
        let body = serde_json::json!({"tweet_id": tweet_id});
        let resp: BoolDataResponse = self.post(&format!("/users/{}/bookmarks", user_id), &body).await?;
        Ok(resp.data.and_then(|d| d.fields.get("bookmarked").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn remove_bookmark(&self, user_id: &str, tweet_id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/users/{}/bookmarks/{}", user_id, tweet_id)).await?;
        Ok(resp.data.and_then(|d| d.fields.get("bookmarked").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    // -- Follows --

    pub async fn follow_user(&self, user_id: &str, target_user_id: &str) -> Result<bool, XApiError> {
        let body = serde_json::json!({"target_user_id": target_user_id});
        let resp: BoolDataResponse = self.post(&format!("/users/{}/following", user_id), &body).await?;
        Ok(resp.data.and_then(|d| d.fields.get("following").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn unfollow_user(&self, user_id: &str, target_user_id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/users/{}/following/{}", user_id, target_user_id)).await?;
        Ok(resp.data.and_then(|d| d.fields.get("following").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    // -- Blocks --

    pub async fn get_blocked_users(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<User>, XApiError> {
        let max = max_results.unwrap_or(100).to_string();
        let mut query = vec![("max_results", max.as_str())];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }
        let resp: DataListResponse<User> = self.get(&format!("/users/{}/blocking", user_id), &query).await?;
        Ok(resp.data.unwrap_or_default())
    }

    pub async fn block_user(&self, user_id: &str, target_user_id: &str) -> Result<bool, XApiError> {
        let body = serde_json::json!({"target_user_id": target_user_id});
        let resp: BoolDataResponse = self.post(&format!("/users/{}/blocking", user_id), &body).await?;
        Ok(resp.data.and_then(|d| d.fields.get("blocking").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn unblock_user(&self, user_id: &str, target_user_id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/users/{}/blocking/{}", user_id, target_user_id)).await?;
        Ok(resp.data.and_then(|d| d.fields.get("blocking").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    // -- Mutes --

    pub async fn get_muted_users(
        &self,
        user_id: &str,
        max_results: Option<u32>,
        pagination_token: Option<&str>,
    ) -> Result<Vec<User>, XApiError> {
        let max = max_results.unwrap_or(100).to_string();
        let mut query = vec![("max_results", max.as_str())];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }
        let resp: DataListResponse<User> = self.get(&format!("/users/{}/muting", user_id), &query).await?;
        Ok(resp.data.unwrap_or_default())
    }

    pub async fn mute_user(&self, user_id: &str, target_user_id: &str) -> Result<bool, XApiError> {
        let body = serde_json::json!({"target_user_id": target_user_id});
        let resp: BoolDataResponse = self.post(&format!("/users/{}/muting", user_id), &body).await?;
        Ok(resp.data.and_then(|d| d.fields.get("muting").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn unmute_user(&self, user_id: &str, target_user_id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/users/{}/muting/{}", user_id, target_user_id)).await?;
        Ok(resp.data.and_then(|d| d.fields.get("muting").and_then(|v| v.as_bool())).unwrap_or(false))
    }
}
