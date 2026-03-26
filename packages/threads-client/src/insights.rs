use crate::error::ThreadsApiError;
use crate::types::{MediaInsightsList, UserInsight};
use crate::ThreadsClient;

impl ThreadsClient {
    /// Get metrics for a specific Threads media object.
    pub async fn get_media_insights(
        &self,
        media_id: &str,
        metric: Option<&str>,
    ) -> Result<MediaInsightsList, ThreadsApiError> {
        let mut query = Vec::new();

        if let Some(value) = metric {
            query.push(("metric", value));
        }

        self.get(&format!("/v1.0/{}/insights", media_id), &query)
            .await
    }

    /// Get account-level insights for a Threads user.
    pub async fn get_user_insights(
        &self,
        user_id: &str,
        metric: Option<&str>,
        period: Option<&str>,
    ) -> Result<UserInsight, ThreadsApiError> {
        let mut query = Vec::new();

        if let Some(value) = metric {
            query.push(("metric", value));
        }

        if let Some(value) = period {
            query.push(("period", value));
        }

        self.get(&format!("/v1.0/{}/threads_insights", user_id), &query)
            .await
    }
}
