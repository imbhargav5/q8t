use crate::error::ThreadsApiError;
use crate::types::{PublishingLimit, User};
use crate::ThreadsClient;

const DEFAULT_PROFILE_FIELDS: &str =
    "id,username,name,threads_profile_picture_url,threads_biography,is_verified";

impl ThreadsClient {
    /// Get the authenticated Threads profile.
    pub async fn get_my_profile(&self) -> Result<User, ThreadsApiError> {
        self.get_my_profile_with_fields(None).await
    }

    /// Get the authenticated Threads profile with custom fields.
    pub async fn get_my_profile_with_fields(
        &self,
        fields: Option<&str>,
    ) -> Result<User, ThreadsApiError> {
        let resolved_fields = fields.unwrap_or(DEFAULT_PROFILE_FIELDS);
        self.get("/me", &[("fields", resolved_fields)]).await
    }

    /// Get a Threads user profile by ID.
    pub async fn get_user_profile(
        &self,
        user_id: &str,
        fields: Option<&str>,
    ) -> Result<User, ThreadsApiError> {
        let resolved_fields = fields.unwrap_or(DEFAULT_PROFILE_FIELDS);
        self.get(
            &format!("/v1.0/{}", user_id),
            &[("fields", resolved_fields)],
        )
        .await
    }

    /// Get the authenticated user's current publishing limits.
    pub async fn get_publishing_limit(
        &self,
        user_id: &str,
    ) -> Result<PublishingLimit, ThreadsApiError> {
        self.get(&format!("/v1.0/{}/threads_publishing_limit", user_id), &[])
            .await
    }
}
