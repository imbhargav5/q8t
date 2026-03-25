use axum::{
    extract::{Path, Query, State},
    routing::{delete, get, post},
    Json, Router,
};
use q8t_core::response::ApiResponse;
use serde::Deserialize;

use crate::server::error::AppError;
use crate::state::AppState;

#[derive(Deserialize)]
pub struct CreateTweetRequest {
    pub text: String,
    pub reply: Option<TweetReplyParam>,
    pub quote_tweet_id: Option<String>,
    pub media: Option<TweetMediaParam>,
}

#[derive(Deserialize)]
pub struct TweetReplyParam {
    pub in_reply_to_tweet_id: String,
}

#[derive(Deserialize)]
pub struct TweetMediaParam {
    pub media_ids: Vec<String>,
}

#[derive(Deserialize)]
pub struct SearchQuery {
    pub query: String,
    pub max_results: Option<u32>,
}

async fn create_tweet(
    State(state): State<AppState>,
    Json(body): Json<CreateTweetRequest>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (cred, token) = get_x_token(&state).await?;

    let client = x_client::XClient::new(&token);
    let reply_to = body.reply.as_ref().map(|r| r.in_reply_to_tweet_id.as_str());
    let media_ids: Option<Vec<&str>> = body
        .media
        .as_ref()
        .map(|m| m.media_ids.iter().map(|s| s.as_str()).collect());

    let tweet = client
        .create_tweet(&body.text, reply_to, body.quote_tweet_id.as_deref(), media_ids.as_deref())
        .await
        .map_err(|e| q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({
        "data": { "id": tweet.id, "text": tweet.text }
    }))))
}

async fn get_tweet(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    let tweet = client.get_tweet(&id).await.map_err(|e| {
        q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        }
    })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({
        "data": tweet
    }))))
}

async fn delete_tweet(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    client.delete_tweet(&id).await.map_err(|e| {
        q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        }
    })?;

    Ok(Json(ApiResponse::ok(
        serde_json::json!({"deleted": true}),
    )))
}

async fn search_recent(
    State(state): State<AppState>,
    Query(params): Query<SearchQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    let tweets = client
        .search_recent_tweets(&params.query, params.max_results)
        .await
        .map_err(|e| q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({
        "data": tweets
    }))))
}

/// Helper to extract the X bearer token from stored credentials.
pub async fn get_x_token(
    state: &AppState,
) -> Result<(q8t_db::models::Credential, String), AppError> {
    let cred =
        q8t_db::repositories::credentials::CredentialRepository::get_active_for_platform(
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

    Ok((cred, token))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", post(create_tweet))
        .route("/search/recent", get(search_recent))
        .route("/{id}", get(get_tweet).delete(delete_tweet))
}
