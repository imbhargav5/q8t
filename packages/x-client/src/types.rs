use serde::{Deserialize, Serialize};

// -- Tweet types --

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Tweet {
    pub id: String,
    pub text: String,
    pub author_id: Option<String>,
    pub created_at: Option<String>,
    pub public_metrics: Option<TweetPublicMetrics>,
    pub entities: Option<TweetEntities>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TweetPublicMetrics {
    pub retweet_count: Option<i64>,
    pub reply_count: Option<i64>,
    pub like_count: Option<i64>,
    pub quote_count: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TweetEntities {
    pub hashtags: Option<Vec<Hashtag>>,
    pub mentions: Option<Vec<EntityMention>>,
    pub urls: Option<Vec<UrlEntity>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Hashtag {
    pub start: Option<i64>,
    pub end: Option<i64>,
    pub tag: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EntityMention {
    pub start: Option<i64>,
    pub end: Option<i64>,
    pub username: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UrlEntity {
    pub start: Option<i64>,
    pub end: Option<i64>,
    pub url: Option<String>,
    pub expanded_url: Option<String>,
    pub display_url: Option<String>,
}

// -- User types --

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: String,
    pub name: String,
    pub username: String,
    pub description: Option<String>,
    pub profile_image_url: Option<String>,
    pub created_at: Option<String>,
    pub public_metrics: Option<UserPublicMetrics>,
    pub verified: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserPublicMetrics {
    pub followers_count: Option<i64>,
    pub following_count: Option<i64>,
    pub tweet_count: Option<i64>,
    pub listed_count: Option<i64>,
}

// -- List types --

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XList {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub private: Option<bool>,
    pub follower_count: Option<i64>,
    pub member_count: Option<i64>,
    pub owner_id: Option<String>,
    pub created_at: Option<String>,
}

// -- Space types --

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Space {
    pub id: String,
    pub state: String,
    pub title: Option<String>,
    pub created_at: Option<String>,
    pub started_at: Option<String>,
    pub ended_at: Option<String>,
    pub host_ids: Option<Vec<String>>,
    pub speaker_ids: Option<Vec<String>>,
    pub participant_count: Option<i64>,
    pub is_ticketed: Option<bool>,
    pub scheduled_start: Option<String>,
}

// -- Request types --

#[derive(Debug, Serialize)]
pub struct CreateTweetRequest {
    pub text: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub reply: Option<TweetReply>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub quote_tweet_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub media: Option<TweetMedia>,
}

#[derive(Debug, Serialize)]
pub struct TweetReply {
    pub in_reply_to_tweet_id: String,
}

#[derive(Debug, Serialize)]
pub struct TweetMedia {
    pub media_ids: Vec<String>,
}

#[derive(Debug, Serialize)]
pub struct CreateListRequest {
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub private: Option<bool>,
}

#[derive(Debug, Serialize)]
pub struct UpdateListRequest {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub private: Option<bool>,
}

// -- Response wrappers --

#[derive(Debug, Deserialize)]
pub struct DataResponse<T> {
    pub data: Option<T>,
}

#[derive(Debug, Deserialize)]
pub struct DataListResponse<T> {
    pub data: Option<Vec<T>>,
    pub meta: Option<PaginationMeta>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PaginationMeta {
    pub result_count: Option<i64>,
    pub next_token: Option<String>,
    pub previous_token: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct BoolDataResponse {
    pub data: Option<BoolField>,
}

#[derive(Debug, Deserialize)]
pub struct BoolField {
    #[serde(flatten)]
    pub fields: std::collections::HashMap<String, serde_json::Value>,
}
