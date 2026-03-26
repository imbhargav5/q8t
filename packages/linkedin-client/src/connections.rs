use crate::error::LinkedInApiError;
use crate::types::ConnectionsResponse;
use crate::LinkedInClient;

impl LinkedInClient {
    /// Get connections for the authenticated member.
    pub async fn get_connections(
        &self,
        start: Option<u32>,
        count: Option<u32>,
    ) -> Result<ConnectionsResponse, LinkedInApiError> {
        let start = start.map(|value| value.to_string());
        let count = count.map(|value| value.to_string());
        let mut query = Vec::new();

        if let Some(value) = start.as_deref() {
            query.push(("start", value));
        }

        if let Some(value) = count.as_deref() {
            query.push(("count", value));
        }

        self.get("/connections", &query).await
    }
}
