use crate::error::LinkedInApiError;
use crate::types::{CreatePostRequest, MemberNetworkVisibility, PostResponse};
use crate::LinkedInClient;

impl LinkedInClient {
    /// Create a LinkedIn UGC post using a pre-built request payload.
    pub async fn create_post(
        &self,
        request: &CreatePostRequest,
    ) -> Result<PostResponse, LinkedInApiError> {
        self.post("/ugcPosts", request).await
    }

    /// Create a basic text post for a person or organization author URN.
    pub async fn create_text_post(
        &self,
        author: &str,
        text: &str,
        visibility: Option<MemberNetworkVisibility>,
    ) -> Result<PostResponse, LinkedInApiError> {
        let request = CreatePostRequest::text_post(author, text, visibility);
        self.create_post(&request).await
    }
}
