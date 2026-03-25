use axum::{
    extract::{Path, Query, State},
    routing::{delete, get, post},
    Json, Router,
};
use q8t_core::response::ApiResponse;
use serde::Deserialize;

use crate::server::error::AppError;
use crate::state::AppState;
use super::tweets::get_x_token;

#[derive(Deserialize)]
pub struct TargetTweetBody {
    pub tweet_id: String,
}

#[derive(Deserialize)]
pub struct TargetUserBody {
    pub target_user_id: String,
}

#[derive(Deserialize)]
pub struct PaginationQuery {
    pub max_results: Option<u32>,
    pub pagination_token: Option<String>,
}

// ─── Likes ──────────────────────────────────────────────────────────────────

async fn like_tweet(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Json(body): Json<TargetTweetBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let liked = client.like_tweet(&user_id, &body.tweet_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"liked": liked}))))
}

async fn unlike_tweet(
    State(state): State<AppState>,
    Path((user_id, tweet_id)): Path<(String, String)>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let liked = client.unlike_tweet(&user_id, &tweet_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"liked": liked}))))
}

async fn get_liked_tweets(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let tweets = client
        .get_liked_tweets(&user_id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": tweets}))))
}

// ─── Retweets ───────────────────────────────────────────────────────────────

async fn retweet(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Json(body): Json<TargetTweetBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let retweeted = client.retweet(&user_id, &body.tweet_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"retweeted": retweeted}))))
}

async fn unretweet(
    State(state): State<AppState>,
    Path((user_id, tweet_id)): Path<(String, String)>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let retweeted = client.unretweet(&user_id, &tweet_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"retweeted": retweeted}))))
}

// ─── Bookmarks ──────────────────────────────────────────────────────────────

async fn get_bookmarks(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let tweets = client
        .get_bookmarks(&user_id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": tweets}))))
}

async fn bookmark_tweet(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Json(body): Json<TargetTweetBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let bookmarked = client.bookmark_tweet(&user_id, &body.tweet_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"bookmarked": bookmarked}))))
}

async fn remove_bookmark(
    State(state): State<AppState>,
    Path((user_id, tweet_id)): Path<(String, String)>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let bookmarked = client.remove_bookmark(&user_id, &tweet_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"bookmarked": bookmarked}))))
}

// ─── Follows ────────────────────────────────────────────────────────────────

async fn follow_user(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Json(body): Json<TargetUserBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let following = client.follow_user(&user_id, &body.target_user_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"following": following}))))
}

async fn unfollow_user(
    State(state): State<AppState>,
    Path((user_id, target_id)): Path<(String, String)>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let following = client.unfollow_user(&user_id, &target_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"following": following}))))
}

// ─── Blocks ─────────────────────────────────────────────────────────────────

async fn get_blocked(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let users = client
        .get_blocked_users(&user_id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": users}))))
}

async fn block_user(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Json(body): Json<TargetUserBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let blocking = client.block_user(&user_id, &body.target_user_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"blocking": blocking}))))
}

async fn unblock_user(
    State(state): State<AppState>,
    Path((user_id, target_id)): Path<(String, String)>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let blocking = client.unblock_user(&user_id, &target_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"blocking": blocking}))))
}

// ─── Mutes ──────────────────────────────────────────────────────────────────

async fn get_muted(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let users = client
        .get_muted_users(&user_id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": users}))))
}

async fn mute_user(
    State(state): State<AppState>,
    Path(user_id): Path<String>,
    Json(body): Json<TargetUserBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let muting = client.mute_user(&user_id, &body.target_user_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"muting": muting}))))
}

async fn unmute_user(
    State(state): State<AppState>,
    Path((user_id, target_id)): Path<(String, String)>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let muting = client.unmute_user(&user_id, &target_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"muting": muting}))))
}

pub fn map_x_err(e: x_client::XApiError) -> q8t_core::error::Q8tError {
    q8t_core::error::Q8tError::PlatformApi {
        platform: "x".to_string(),
        message: e.to_string(),
        status_code: None,
    }
}

/// Build router for interaction endpoints nested under /api/v1/x/users/:id/
pub fn router() -> Router<AppState> {
    Router::new()
        // Likes
        .route("/users/{user_id}/likes", post(like_tweet))
        .route("/users/{user_id}/likes/{tweet_id}", delete(unlike_tweet))
        .route("/users/{user_id}/liked_tweets", get(get_liked_tweets))
        // Retweets
        .route("/users/{user_id}/retweets", post(retweet))
        .route("/users/{user_id}/retweets/{tweet_id}", delete(unretweet))
        // Bookmarks
        .route("/users/{user_id}/bookmarks", get(get_bookmarks).post(bookmark_tweet))
        .route("/users/{user_id}/bookmarks/{tweet_id}", delete(remove_bookmark))
        // Follows
        .route("/users/{user_id}/following_action", post(follow_user))
        .route("/users/{user_id}/following/{target_id}", delete(unfollow_user))
        // Blocks
        .route("/users/{user_id}/blocking", get(get_blocked).post(block_user))
        .route("/users/{user_id}/blocking/{target_id}", delete(unblock_user))
        // Mutes
        .route("/users/{user_id}/muting", get(get_muted).post(mute_user))
        .route("/users/{user_id}/muting/{target_id}", delete(unmute_user))
}
