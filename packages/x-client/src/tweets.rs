use crate::error::XApiError;
use crate::types::*;
use crate::XClient;

impl XClient {
    /// Create a tweet.
    pub async fn create_tweet(
        &self,
        text: &str,
        reply_to: Option<&str>,
        quote_tweet_id: Option<&str>,
        media_ids: Option<&[&str]>,
    ) -> Result<Tweet, XApiError> {
        let body = CreateTweetRequest {
            text: text.to_string(),
            reply: reply_to.map(|id| TweetReply {
                in_reply_to_tweet_id: id.to_string(),
            }),
            quote_tweet_id: quote_tweet_id.map(|s| s.to_string()),
            media: media_ids.map(|ids| TweetMedia {
                media_ids: ids.iter().map(|s| s.to_string()).collect(),
            }),
        };

        let resp: DataResponse<Tweet> = self.post("/tweets", &body).await?;
        resp.data.ok_or_else(|| XApiError::Deserialize("No data in response".to_string()))
    }

    /// Get a tweet by ID.
    pub async fn get_tweet(&self, id: &str) -> Result<Tweet, XApiError> {
        let resp: DataResponse<Tweet> = self
            .get(
                &format!("/tweets/{}", id),
                &[("tweet.fields", "author_id,created_at,public_metrics,entities")],
            )
            .await?;
        resp.data.ok_or_else(|| XApiError::Deserialize("No data in response".to_string()))
    }

    /// Delete a tweet.
    pub async fn delete_tweet(&self, id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/tweets/{}", id)).await?;
        Ok(resp
            .data
            .and_then(|d| d.fields.get("deleted").and_then(|v| v.as_bool()))
            .unwrap_or(false))
    }

    /// Search recent tweets.
    pub async fn search_recent_tweets(
        &self,
        query: &str,
        max_results: Option<u32>,
    ) -> Result<Vec<Tweet>, XApiError> {
        let max = max_results.unwrap_or(10).to_string();
        let resp: DataListResponse<Tweet> = self
            .get(
                "/tweets/search/recent",
                &[
                    ("query", query),
                    ("max_results", &max),
                    ("tweet.fields", "author_id,created_at,public_metrics"),
                ],
            )
            .await?;
        Ok(resp.data.unwrap_or_default())
    }
}
