use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

/// Stored credential for a platform account.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Credential {
    pub id: String,
    pub platform: String,
    pub credential_type: String,
    pub encrypted_value: String,
    pub label: Option<String>,
    pub platform_user_id: Option<String>,
    pub platform_username: Option<String>,
    pub is_active: bool,
    pub verified_at: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

/// A post in the q8t system.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Post {
    pub id: String,
    pub content: String,
    pub content_type: String,
    pub status: String,
    pub scheduled_for: Option<String>,
    pub published_at: Option<String>,
    pub thread_items: Option<String>,
    pub poll_options: Option<String>,
    pub poll_duration_minutes: Option<i32>,
    pub hashtags: Option<String>,
    pub mentions: Option<String>,
    pub tags: Option<String>,
    pub metadata: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

/// Per-platform publication record for a post.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct PostPublication {
    pub id: String,
    pub post_id: String,
    pub credential_id: String,
    pub platform: String,
    pub status: String,
    pub platform_post_id: Option<String>,
    pub platform_post_url: Option<String>,
    pub content_override: Option<String>,
    pub error_message: Option<String>,
    pub error_code: Option<String>,
    pub retry_count: i32,
    pub max_retries: i32,
    pub published_at: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

/// Media asset stored locally.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct MediaAsset {
    pub id: String,
    pub filename: String,
    pub original_filename: String,
    pub mime_type: String,
    pub media_type: String,
    pub file_path: String,
    pub size_bytes: i64,
    pub width: Option<i32>,
    pub height: Option<i32>,
    pub duration_seconds: Option<f64>,
    pub alt_text: Option<String>,
    pub x_media_id: Option<String>,
    pub metadata: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

/// Join table: post <-> media asset.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct PostMedia {
    pub post_id: String,
    pub media_asset_id: String,
    pub position: i32,
}

/// Scheduler job for timed publishing.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct SchedulerJob {
    pub id: String,
    pub post_id: String,
    pub scheduled_for: String,
    pub status: String,
    pub attempts: i32,
    pub max_attempts: i32,
    pub last_error: Option<String>,
    pub locked_at: Option<String>,
    pub completed_at: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

/// Analytics snapshot for a publication.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct PostAnalytics {
    pub id: String,
    pub publication_id: String,
    pub impressions: Option<i32>,
    pub likes: Option<i32>,
    pub retweets: Option<i32>,
    pub replies: Option<i32>,
    pub quotes: Option<i32>,
    pub bookmarks: Option<i32>,
    pub clicks: Option<i32>,
    pub fetched_at: String,
    pub raw_data: Option<String>,
}
