use axum::{
    extract::State,
    extract::Path,
    routing::{delete, get, post},
    Json, Router,
};
use q8t_core::response::ApiResponse;
use q8t_db::models::Credential;
use q8t_db::repositories::credentials::CredentialRepository;
use serde::{Deserialize, Serialize};

use crate::server::error::AppError;
use crate::state::AppState;

#[derive(Deserialize)]
pub struct AddAccountRequest {
    pub platform: String,
    pub label: Option<String>,
    pub credentials: CredentialPayload,
}

#[derive(Deserialize)]
pub struct CredentialPayload {
    pub bearer_token: Option<String>,
    pub api_key: Option<String>,
}

#[derive(Serialize)]
pub struct AccountResponse {
    pub id: String,
    pub platform: String,
    pub label: Option<String>,
    pub platform_user_id: Option<String>,
    pub platform_username: Option<String>,
    pub is_active: bool,
    pub verified_at: Option<String>,
    pub created_at: String,
}

impl From<Credential> for AccountResponse {
    fn from(c: Credential) -> Self {
        Self {
            id: c.id,
            platform: c.platform,
            label: c.label,
            platform_user_id: c.platform_user_id,
            platform_username: c.platform_username,
            is_active: c.is_active,
            verified_at: c.verified_at,
            created_at: c.created_at,
        }
    }
}

async fn list_accounts(
    State(state): State<AppState>,
) -> Result<Json<ApiResponse<Vec<AccountResponse>>>, AppError> {
    let creds = CredentialRepository::list(&state.db, None).await?;
    let accounts: Vec<AccountResponse> = creds.into_iter().map(AccountResponse::from).collect();
    Ok(Json(ApiResponse::ok(accounts)))
}

async fn add_account(
    State(state): State<AppState>,
    Json(body): Json<AddAccountRequest>,
) -> Result<Json<ApiResponse<AccountResponse>>, AppError> {
    let (cred_type, value) = if let Some(token) = &body.credentials.bearer_token {
        ("bearer_token", token.as_str())
    } else if let Some(key) = &body.credentials.api_key {
        ("api_key", key.as_str())
    } else {
        return Err(q8t_core::error::Q8tError::Validation(
            "Either bearer_token or api_key must be provided".to_string(),
        )
        .into());
    };

    let encrypted = state
        .cipher
        .encrypt_string(value)
        .map_err(|e| q8t_core::error::Q8tError::Encryption(e.to_string()))?;

    let cred = CredentialRepository::create(
        &state.db,
        &body.platform,
        cred_type,
        &encrypted,
        body.label.as_deref(),
    )
    .await?;

    // Attempt to verify credentials and fetch platform user info
    if body.platform == "x" {
        if let Ok(token) = state.cipher.decrypt_string(&cred.encrypted_value) {
            let client = x_client::XClient::new(&token);
            if let Ok(user) = client.get_me().await {
                let _ = CredentialRepository::update_platform_info(
                    &state.db,
                    &cred.id,
                    &user.id,
                    &user.username,
                )
                .await;
            }
        }
    }

    // Re-fetch to get updated platform info
    let updated = CredentialRepository::get_by_id(&state.db, &cred.id)
        .await?
        .unwrap_or(cred);

    Ok(Json(ApiResponse::ok(AccountResponse::from(updated))))
}

async fn get_account(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<AccountResponse>>, AppError> {
    let cred = CredentialRepository::get_by_id(&state.db, &id)
        .await?
        .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Account {} not found", id)))?;

    Ok(Json(ApiResponse::ok(AccountResponse::from(cred))))
}

async fn delete_account(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let deleted = CredentialRepository::delete(&state.db, &id).await?;
    if !deleted {
        return Err(
            q8t_core::error::Q8tError::NotFound(format!("Account {} not found", id)).into(),
        );
    }
    Ok(Json(ApiResponse::ok(
        serde_json::json!({"deleted": true}),
    )))
}

async fn verify_account(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let cred = CredentialRepository::get_by_id(&state.db, &id)
        .await?
        .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Account {} not found", id)))?;

    let token = state
        .cipher
        .decrypt_string(&cred.encrypted_value)
        .map_err(|e| q8t_core::error::Q8tError::Encryption(e.to_string()))?;

    if cred.platform == "x" {
        let client = x_client::XClient::new(&token);
        match client.get_me().await {
            Ok(user) => {
                let _ = CredentialRepository::update_platform_info(
                    &state.db,
                    &cred.id,
                    &user.id,
                    &user.username,
                )
                .await;
                Ok(Json(ApiResponse::ok(serde_json::json!({
                    "valid": true,
                    "username": user.username,
                    "user_id": user.id,
                }))))
            }
            Err(e) => Ok(Json(ApiResponse::ok(serde_json::json!({
                "valid": false,
                "error": e.to_string(),
            })))),
        }
    } else {
        Ok(Json(ApiResponse::ok(serde_json::json!({
            "valid": false,
            "error": format!("Verification not implemented for platform: {}", cred.platform),
        }))))
    }
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/accounts", get(list_accounts).post(add_account))
        .route("/accounts/{id}", get(get_account).delete(delete_account))
        .route("/accounts/{id}/verify", post(verify_account))
}
