use axum::{
    extract::{Path, Query, State},
    routing::{delete, get, post, put},
    Json, Router,
};
use q8t_core::response::ApiResponse;
use serde::Deserialize;

use crate::server::error::AppError;
use crate::state::AppState;
use super::tweets::get_x_token;
use super::interactions::map_x_err;

#[derive(Deserialize)]
pub struct CreateListBody {
    pub name: String,
    pub description: Option<String>,
    pub private: Option<bool>,
}

#[derive(Deserialize)]
pub struct UpdateListBody {
    pub name: Option<String>,
    pub description: Option<String>,
    pub private: Option<bool>,
}

#[derive(Deserialize)]
pub struct MemberBody {
    pub user_id: String,
}

#[derive(Deserialize)]
pub struct PaginationQuery {
    pub max_results: Option<u32>,
    pub pagination_token: Option<String>,
}

async fn create_list(
    State(state): State<AppState>,
    Json(body): Json<CreateListBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let list = client
        .create_list(&body.name, body.description.as_deref(), body.private)
        .await
        .map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": list}))))
}

async fn get_list(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let list = client.get_list(&id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": list}))))
}

async fn update_list(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<UpdateListBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let list = client
        .update_list(&id, body.name.as_deref(), body.description.as_deref(), body.private)
        .await
        .map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": list}))))
}

async fn delete_list(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let deleted = client.delete_list(&id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"deleted": deleted}))))
}

async fn get_list_tweets(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let tweets = client
        .get_list_tweets(&id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": tweets}))))
}

async fn get_list_members(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let members = client
        .get_list_members(&id, params.max_results, params.pagination_token.as_deref())
        .await
        .map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"data": members}))))
}

async fn add_list_member(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<MemberBody>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let added = client.add_list_member(&id, &body.user_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"is_member": added}))))
}

async fn remove_list_member(
    State(state): State<AppState>,
    Path((id, user_id)): Path<(String, String)>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let removed = client.remove_list_member(&id, &user_id).await.map_err(map_x_err)?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"is_member": removed}))))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", post(create_list))
        .route("/{id}", get(get_list).put(update_list).delete(delete_list))
        .route("/{id}/tweets", get(get_list_tweets))
        .route("/{id}/members", get(get_list_members).post(add_list_member))
        .route("/{id}/members/{user_id}", delete(remove_list_member))
}
