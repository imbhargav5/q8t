use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Option<String>,
    pub username: Option<String>,
    pub name: Option<String>,
    pub threads_profile_picture_url: Option<String>,
    pub threads_biography: Option<String>,
    pub is_verified: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PublishingLimit {
    pub data: Option<Vec<PublishingLimitEntry>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PublishingLimitEntry {
    pub quota_usage: Option<i64>,
    pub config: Option<PublishingLimitConfig>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PublishingLimitConfig {
    pub quota_total: Option<i64>,
    pub quota_duration: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MediaContainer {
    pub id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PublishedMedia {
    pub id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MediaOwner {
    pub id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum HideStatus {
    NotHushed,
    Unhidden,
    Hidden,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ReplyAudience {
    Everyone,
    AccountsYouFollow,
    MentionedOnly,
    ParentPostAuthorOnly,
    FollowersOnly,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Media {
    pub id: Option<String>,
    pub media_product_type: Option<String>,
    pub media_type: Option<String>,
    pub media_url: Option<String>,
    pub permalink: Option<String>,
    pub owner: Option<MediaOwner>,
    pub username: Option<String>,
    pub text: Option<String>,
    pub timestamp: Option<String>,
    pub shortcode: Option<String>,
    pub thumbnail_url: Option<String>,
    pub children: Option<serde_json::Value>,
    pub is_quote_post: Option<bool>,
    pub has_replies: Option<bool>,
    pub is_reply: Option<bool>,
    pub hide_status: Option<HideStatus>,
    pub reply_audience: Option<ReplyAudience>,
    pub alt_text: Option<String>,
    pub topic_tag: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MediaList {
    pub data: Option<Vec<Media>>,
    pub paging: Option<Paging>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum CreateMediaType {
    Text,
    Image,
    Video,
    Carousel,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Poll {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub question: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub options: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub duration_minutes: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateMediaRequest {
    pub media_type: CreateMediaType,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub text: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub image_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub video_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub children: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub alt_text: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub reply_to_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub reply_control: Option<ReplyAudience>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub location_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub topic_tag: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub poll: Option<Poll>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub gif_url: Option<String>,
}

impl CreateMediaRequest {
    pub fn text_post(text: &str) -> Self {
        Self {
            media_type: CreateMediaType::Text,
            text: Some(text.to_string()),
            image_url: None,
            video_url: None,
            children: None,
            alt_text: None,
            reply_to_id: None,
            reply_control: None,
            location_id: None,
            topic_tag: None,
            poll: None,
            gif_url: None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PublishMediaRequest {
    pub creation_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ManageReplyRequest {
    pub hide: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ManageReplyResponse {
    pub success: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MediaInsightName {
    Views,
    Likes,
    Replies,
    Reposts,
    Quotes,
    Clicks,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum InsightPeriod {
    #[serde(rename = "day")]
    Day,
    #[serde(rename = "week")]
    Week,
    #[serde(rename = "days_28")]
    Days28,
    #[serde(rename = "lifetime")]
    Lifetime,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InsightValue {
    pub value: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MediaInsight {
    pub name: Option<MediaInsightName>,
    pub period: Option<InsightPeriod>,
    pub values: Option<Vec<InsightValue>>,
    pub title: Option<String>,
    pub id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MediaInsightsList {
    pub data: Option<Vec<MediaInsight>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum UserInsightName {
    Views,
    Likes,
    FollowersCount,
    FollowerDemographics,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInsight {
    pub name: Option<UserInsightName>,
    pub period: Option<String>,
    pub values: Option<Vec<serde_json::Value>>,
    pub title: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Cursors {
    pub before: Option<String>,
    pub after: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Paging {
    pub cursors: Option<Cursors>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchResult {
    pub data: Option<Vec<serde_json::Value>>,
}
