use axum::{
    extract::{Path, Query, State},
    routing::{delete, get, patch, post},
    Json, Router,
};
use q8t_core::response::{ApiResponse, PaginationMeta};
use q8t_db::models::Post;
use q8t_db::repositories::posts::PostRepository;
use q8t_db::repositories::scheduler_jobs::SchedulerJobRepository;
use q8t_db::repositories::publications::PublicationRepository;
use serde::Deserialize;

use crate::server::error::AppError;
use crate::state::AppState;

#[derive(Deserialize)]
pub struct ListPostsQuery {
    pub status: Option<String>,
    pub platform: Option<String>,
    pub cursor: Option<String>,
    pub limit: Option<i64>,
}

#[derive(Deserialize)]
pub struct CreatePostRequest {
    pub content: String,
    #[serde(default = "default_content_type")]
    pub content_type: String,
    pub platforms: Option<Vec<String>>,
    pub account_ids: Option<Vec<String>>,
    pub media_ids: Option<Vec<String>>,
    pub scheduled_for: Option<String>,
    pub metadata: Option<serde_json::Value>,
}

fn default_content_type() -> String {
    "text".to_string()
}

#[derive(Deserialize)]
pub struct UpdatePostRequest {
    pub content: Option<String>,
    pub content_type: Option<String>,
    pub scheduled_for: Option<String>,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Deserialize)]
pub struct ScheduleRequest {
    pub scheduled_for: String,
}

async fn list_posts(
    State(state): State<AppState>,
    Query(params): Query<ListPostsQuery>,
) -> Result<Json<ApiResponse<Vec<Post>>>, AppError> {
    let limit = params.limit.unwrap_or(20).min(100);
    let posts = PostRepository::list(&state.db, params.status.as_deref(), limit + 1, params.cursor.as_deref())
        .await?;

    let has_more = posts.len() as i64 > limit;
    let posts: Vec<Post> = posts.into_iter().take(limit as usize).collect();
    let cursor = posts.last().map(|p| p.created_at.clone());

    Ok(Json(ApiResponse::ok_with_meta(
        posts,
        PaginationMeta {
            cursor: if has_more { cursor } else { None },
            has_more,
            total: None,
        },
    )))
}

async fn create_post(
    State(state): State<AppState>,
    Json(body): Json<CreatePostRequest>,
) -> Result<Json<ApiResponse<Post>>, AppError> {
    let status = if body.scheduled_for.is_some() {
        "scheduled"
    } else {
        "draft"
    };

    let metadata = body
        .metadata
        .map(|m| serde_json::to_string(&m).unwrap_or_default());

    let post = PostRepository::create(
        &state.db,
        &body.content,
        &body.content_type,
        status,
        body.scheduled_for.as_deref(),
        None, // thread_items
        None, // poll_options
        None, // poll_duration_minutes
        None, // hashtags
        None, // mentions
        None, // tags
        metadata.as_deref(),
    )
    .await?;

    // Attach media if provided
    if let Some(media_ids) = &body.media_ids {
        for (i, media_id) in media_ids.iter().enumerate() {
            q8t_db::repositories::media::MediaRepository::attach_to_post(
                &state.db,
                &post.id,
                media_id,
                i as i32,
            )
            .await?;
        }
    }

    // Create scheduler job if scheduled
    if body.scheduled_for.is_some() {
        SchedulerJobRepository::create(&state.db, &post.id, body.scheduled_for.as_deref().unwrap())
            .await?;
    }

    Ok(Json(ApiResponse::ok(post)))
}

async fn get_post(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<Post>>, AppError> {
    let post = PostRepository::get_by_id(&state.db, &id)
        .await?
        .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Post {} not found", id)))?;

    Ok(Json(ApiResponse::ok(post)))
}

async fn update_post(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<UpdatePostRequest>,
) -> Result<Json<ApiResponse<Post>>, AppError> {
    let metadata = body
        .metadata
        .map(|m| serde_json::to_string(&m).unwrap_or_default());

    let post = PostRepository::update(
        &state.db,
        &id,
        body.content.as_deref(),
        body.content_type.as_deref(),
        None, // status not changed via update
        body.scheduled_for.as_deref(),
        metadata.as_deref(),
    )
    .await?
    .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Post {} not found", id)))?;

    Ok(Json(ApiResponse::ok(post)))
}

async fn delete_post(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    // Cancel any pending scheduler jobs first
    SchedulerJobRepository::cancel_for_post(&state.db, &id).await?;

    let deleted = PostRepository::delete(&state.db, &id).await?;
    if !deleted {
        return Err(
            q8t_core::error::Q8tError::NotFound(format!("Post {} not found", id)).into(),
        );
    }
    Ok(Json(ApiResponse::ok(serde_json::json!({"deleted": true}))))
}

async fn publish_post(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let post = PostRepository::get_by_id(&state.db, &id)
        .await?
        .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Post {} not found", id)))?;

    // Update status to publishing
    PostRepository::update_status(&state.db, &id, "publishing").await?;

    // Get the active X credential
    let cred = q8t_db::repositories::credentials::CredentialRepository::get_active_for_platform(
        &state.db, "x",
    )
    .await?
    .ok_or_else(|| {
        q8t_core::error::Q8tError::Validation("No active X account configured".to_string())
    })?;

    let token = state
        .cipher
        .decrypt_string(&cred.encrypted_value)
        .map_err(|e| q8t_core::error::Q8tError::Encryption(e.to_string()))?;

    // Create publication record
    let pub_record = PublicationRepository::create(&state.db, &id, &cred.id, "x", None).await?;
    PublicationRepository::set_publishing(&state.db, &pub_record.id).await?;

    // Call X API
    let client = x_client::XClient::new(&token);
    match client.create_tweet(&post.content, None, None, None).await {
        Ok(tweet) => {
            let tweet_url = format!(
                "https://x.com/{}/status/{}",
                cred.platform_username.as_deref().unwrap_or("i"),
                tweet.id
            );
            PublicationRepository::set_published(&state.db, &pub_record.id, &tweet.id, &tweet_url)
                .await?;
            PostRepository::set_published(&state.db, &id).await?;

            Ok(Json(ApiResponse::ok(serde_json::json!({
                "post_id": id,
                "status": "published",
                "publications": [{
                    "platform": "x",
                    "status": "published",
                    "platform_post_id": tweet.id,
                    "platform_url": tweet_url,
                }]
            }))))
        }
        Err(e) => {
            PublicationRepository::set_failed(&state.db, &pub_record.id, &e.to_string(), None)
                .await?;
            PostRepository::update_status(&state.db, &id, "failed").await?;

            Err(q8t_core::error::Q8tError::PlatformApi {
                platform: "x".to_string(),
                message: e.to_string(),
                status_code: None,
            }
            .into())
        }
    }
}

async fn schedule_post(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<ScheduleRequest>,
) -> Result<Json<ApiResponse<Post>>, AppError> {
    // Cancel any existing scheduler jobs for this post
    SchedulerJobRepository::cancel_for_post(&state.db, &id).await?;

    // Update post status
    let post = PostRepository::update(
        &state.db,
        &id,
        None,
        None,
        Some("scheduled"),
        Some(&body.scheduled_for),
        None,
    )
    .await?
    .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Post {} not found", id)))?;

    // Create new scheduler job
    SchedulerJobRepository::create(&state.db, &id, &body.scheduled_for).await?;

    Ok(Json(ApiResponse::ok(post)))
}

async fn cancel_post(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<Post>>, AppError> {
    SchedulerJobRepository::cancel_for_post(&state.db, &id).await?;

    let post = PostRepository::update(&state.db, &id, None, None, Some("draft"), None, None)
        .await?
        .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Post {} not found", id)))?;

    Ok(Json(ApiResponse::ok(post)))
}

async fn get_publications(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<Vec<q8t_db::models::PostPublication>>>, AppError> {
    let pubs = PublicationRepository::list_for_post(&state.db, &id).await?;
    Ok(Json(ApiResponse::ok(pubs)))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(list_posts).post(create_post))
        .route("/{id}", get(get_post).patch(update_post).delete(delete_post))
        .route("/{id}/publish", post(publish_post))
        .route("/{id}/schedule", post(schedule_post))
        .route("/{id}/cancel", post(cancel_post))
        .route("/{id}/publications", get(get_publications))
}
