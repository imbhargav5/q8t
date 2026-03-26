use crate::error::ThreadsApiError;
use crate::types::{ManageReplyRequest, MediaList};
use crate::ThreadsClient;

const DEFAULT_REPLY_FIELDS: &str = concat!(
    "id,media_type,media_url,permalink,owner,username,text,timestamp,",
    "shortcode,is_reply,hide_status,reply_audience"
);

impl ThreadsClient {
    /// Get replies for a Threads post.
    pub async fn get_replies(
        &self,
        media_id: &str,
        reverse: Option<bool>,
        limit: Option<u32>,
        fields: Option<&str>,
    ) -> Result<MediaList, ThreadsApiError> {
        let reverse = reverse.map(|value| value.to_string());
        let limit = limit.map(|value| value.to_string());
        let mut query = vec![("fields", fields.unwrap_or(DEFAULT_REPLY_FIELDS))];

        if let Some(value) = reverse.as_deref() {
            query.push(("reverse", value));
        }

        if let Some(value) = limit.as_deref() {
            query.push(("limit", value));
        }

        self.get(&format!("/v1.0/{}/replies", media_id), &query)
            .await
    }

    /// Get the conversation thread for a post.
    pub async fn get_conversation(
        &self,
        media_id: &str,
        fields: Option<&str>,
    ) -> Result<MediaList, ThreadsApiError> {
        self.get(
            &format!("/v1.0/{}/conversation", media_id),
            &[("fields", fields.unwrap_or(DEFAULT_REPLY_FIELDS))],
        )
        .await
    }

    /// Hide or unhide a reply.
    pub async fn manage_reply(&self, reply_id: &str, hide: bool) -> Result<bool, ThreadsApiError> {
        let request = ManageReplyRequest { hide };
        let response: crate::types::ManageReplyResponse = self
            .post(&format!("/v1.0/{}", reply_id), &request, &[])
            .await?;

        Ok(response.success.unwrap_or(false))
    }

    /// Hide a reply.
    pub async fn hide_reply(&self, reply_id: &str) -> Result<bool, ThreadsApiError> {
        self.manage_reply(reply_id, true).await
    }

    /// Unhide a reply.
    pub async fn unhide_reply(&self, reply_id: &str) -> Result<bool, ThreadsApiError> {
        self.manage_reply(reply_id, false).await
    }
}
