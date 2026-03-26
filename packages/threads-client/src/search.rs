use crate::error::ThreadsApiError;
use crate::types::SearchResult;
use crate::ThreadsClient;

impl ThreadsClient {
    /// Search Threads content by keyword or topic tag.
    pub async fn search_content(
        &self,
        query_text: Option<&str>,
        topic_tag: Option<&str>,
        search_type: Option<&str>,
        limit: Option<u32>,
    ) -> Result<SearchResult, ThreadsApiError> {
        let limit = limit.map(|value| value.to_string());
        let mut query = Vec::new();

        if let Some(value) = query_text {
            query.push(("q", value));
        }

        if let Some(value) = topic_tag {
            query.push(("topic_tag", value));
        }

        if let Some(value) = search_type {
            query.push(("type", value));
        }

        if let Some(value) = limit.as_deref() {
            query.push(("limit", value));
        }

        self.get("/keyword_search", &query).await
    }
}
