use crate::error::ThreadsApiError;
use crate::types::{
    CreateMediaRequest, Media, MediaContainer, MediaList, PublishMediaRequest, PublishedMedia,
};
use crate::ThreadsClient;

const DEFAULT_MEDIA_FIELDS: &str = concat!(
    "id,media_product_type,media_type,media_url,permalink,owner,username,text,",
    "timestamp,shortcode,thumbnail_url,children,is_quote_post,has_replies,is_reply,",
    "hide_status,reply_audience,alt_text,topic_tag"
);

impl ThreadsClient {
    /// List published threads for a user.
    pub async fn list_user_threads(
        &self,
        user_id: &str,
        fields: Option<&str>,
        limit: Option<u32>,
        before: Option<&str>,
        after: Option<&str>,
    ) -> Result<MediaList, ThreadsApiError> {
        let limit = limit.map(|value| value.to_string());
        let mut query = vec![("fields", fields.unwrap_or(DEFAULT_MEDIA_FIELDS))];

        if let Some(value) = limit.as_deref() {
            query.push(("limit", value));
        }

        if let Some(value) = before {
            query.push(("before", value));
        }

        if let Some(value) = after {
            query.push(("after", value));
        }

        self.get(&format!("/v1.0/{}/threads", user_id), &query)
            .await
    }

    /// Create a media container.
    pub async fn create_media_container(
        &self,
        user_id: &str,
        request: &CreateMediaRequest,
    ) -> Result<MediaContainer, ThreadsApiError> {
        self.post(&format!("/v1.0/{}/threads", user_id), request, &[])
            .await
    }

    /// Create a text-only media container.
    pub async fn create_text_post_container(
        &self,
        user_id: &str,
        text: &str,
    ) -> Result<MediaContainer, ThreadsApiError> {
        let request = CreateMediaRequest::text_post(text);
        self.create_media_container(user_id, &request).await
    }

    /// Publish a previously created media container.
    pub async fn publish_media_container(
        &self,
        user_id: &str,
        creation_id: &str,
    ) -> Result<PublishedMedia, ThreadsApiError> {
        let request = PublishMediaRequest {
            creation_id: creation_id.to_string(),
        };

        self.post(&format!("/v1.0/{}/threads_publish", user_id), &request, &[])
            .await
    }

    /// Get details for a single Threads post.
    pub async fn get_media(
        &self,
        media_id: &str,
        fields: Option<&str>,
    ) -> Result<Media, ThreadsApiError> {
        self.get(
            &format!("/v1.0/{}", media_id),
            &[("fields", fields.unwrap_or(DEFAULT_MEDIA_FIELDS))],
        )
        .await
    }
}
