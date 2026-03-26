use crate::error::LinkedInApiError;
use crate::types::Profile;
use crate::LinkedInClient;

impl LinkedInClient {
    /// Get the authenticated LinkedIn member profile.
    pub async fn get_me(&self) -> Result<Profile, LinkedInApiError> {
        self.get("/me", &[]).await
    }
}
