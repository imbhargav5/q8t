use axum::{
    extract::{Path, Query, State},
    routing::get,
    Json, Router,
};
use q8t_core::response::ApiResponse;
use serde::Deserialize;

use crate::server::error::AppError;
use crate::state::AppState;
use super::tweets::get_x_token;

#[derive(Deserialize)]
pub struct PaginationQuery {
    pub max_results: Option<u32>,
    pub pagination_token: Option<String>,
}

async fn get_me(
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    let user = client.get_me().await.map_err(|e| {
        q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        }
    })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({"data": user}))))
}

async fn get_user_by_id(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    let user = client.get_user(&id).await.map_err(|e| {
        q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        }
    })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({"data": user}))))
}

async fn get_user_by_username(
    State(state): State<AppState>,
    Path(username): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    let user = client.get_user_by_username(&username).await.map_err(|e| {
        q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        }
    })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({"data": user}))))
}

async fn get_user_tweets(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    let tweets = client
        .get_user_tweets(&id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(|e| q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({"data": tweets}))))
}

async fn get_followers(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    let users = client
        .get_followers(&id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(|e| q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({"data": users}))))
}

async fn get_following(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);

    let users = client
        .get_following(&id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(|e| q8t_core::error::Q8tError::PlatformApi {
            platform: "x".to_string(),
            message: e.to_string(),
            status_code: None,
        })?;

    Ok(Json(ApiResponse::ok(serde_json::json!({"data": users}))))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/me", get(get_me))
        .route("/by/username/{username}", get(get_user_by_username))
        .route("/{id}", get(get_user_by_id))
        .route("/{id}/tweets", get(get_user_tweets))
        .route("/{id}/followers", get(get_followers))
        .route("/{id}/following", get(get_following))
}
