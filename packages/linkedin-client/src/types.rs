use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Profile {
    pub id: String,
    pub first_name: LocalizedString,
    pub last_name: LocalizedString,
    pub profile_picture: Option<ProfilePicture>,
    pub headline: Option<LocalizedString>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LocalizedString {
    pub localized: HashMap<String, String>,
    pub preferred_locale: Locale,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Locale {
    pub country: String,
    pub language: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProfilePicture {
    pub display_image: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum PostLifecycleState {
    Published,
    Draft,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum ShareMediaCategory {
    None,
    Article,
    Image,
    Video,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum MemberNetworkVisibility {
    Public,
    Connections,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreatePostRequest {
    pub author: String,
    pub lifecycle_state: PostLifecycleState,
    pub specific_content: SpecificContent,
    pub visibility: Visibility,
}

impl CreatePostRequest {
    pub fn text_post(
        author: &str,
        text: &str,
        visibility: Option<MemberNetworkVisibility>,
    ) -> Self {
        Self {
            author: author.to_string(),
            lifecycle_state: PostLifecycleState::Published,
            specific_content: SpecificContent {
                share_content: Some(ShareContent {
                    share_commentary: ShareCommentary {
                        text: text.to_string(),
                    },
                    share_media_category: ShareMediaCategory::None,
                }),
            },
            visibility: Visibility {
                member_network_visibility: visibility.or(Some(MemberNetworkVisibility::Public)),
            },
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SpecificContent {
    #[serde(rename = "com.linkedin.ugc.ShareContent")]
    pub share_content: Option<ShareContent>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ShareContent {
    pub share_commentary: ShareCommentary,
    pub share_media_category: ShareMediaCategory,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ShareCommentary {
    pub text: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Visibility {
    #[serde(rename = "com.linkedin.ugc.MemberNetworkVisibility")]
    pub member_network_visibility: Option<MemberNetworkVisibility>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PostResponse {
    pub id: String,
    pub author: Option<String>,
    pub lifecycle_state: Option<String>,
    pub created: Option<AuditStamp>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuditStamp {
    pub actor: Option<String>,
    pub time: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConnectionsResponse {
    pub elements: Vec<Connection>,
    pub paging: Option<Paging>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Connection {
    pub to: String,
    pub created: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Paging {
    pub start: Option<i64>,
    pub count: Option<i64>,
    pub total: Option<i64>,
}
