use q8t_db::models::{Credential, MediaAsset, Post, PostPublication, SchedulerJob};
use q8t_db::repositories::credentials::CredentialRepository;
use q8t_db::repositories::media::MediaRepository;
use q8t_db::repositories::posts::PostRepository;
use q8t_db::repositories::publications::PublicationRepository;
use q8t_db::repositories::scheduler_jobs::SchedulerJobRepository;
use serde::{Deserialize, Serialize};
use tauri::State;

use crate::state::AppState;

// ─── Credential commands ────────────────────────────────────────────────────

#[derive(Deserialize)]
pub struct AddAccountPayload {
    pub platform: String,
    pub label: Option<String>,
    pub bearer_token: Option<String>,
    pub api_key: Option<String>,
}

#[derive(Serialize)]
pub struct AccountInfo {
    pub id: String,
    pub platform: String,
    pub label: Option<String>,
    pub platform_user_id: Option<String>,
    pub platform_username: Option<String>,
    pub is_active: bool,
    pub verified_at: Option<String>,
    pub created_at: String,
}

impl From<Credential> for AccountInfo {
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

#[tauri::command]
pub async fn list_accounts(state: State<'_, AppState>) -> Result<Vec<AccountInfo>, String> {
    let creds = CredentialRepository::list(&state.db, None)
        .await
        .map_err(|e| e.to_string())?;
    Ok(creds.into_iter().map(AccountInfo::from).collect())
}

#[tauri::command]
pub async fn add_account(
    state: State<'_, AppState>,
    payload: AddAccountPayload,
) -> Result<AccountInfo, String> {
    let (cred_type, value) = if let Some(ref token) = payload.bearer_token {
        ("bearer_token", token.as_str())
    } else if let Some(ref key) = payload.api_key {
        ("api_key", key.as_str())
    } else {
        return Err("Either bearer_token or api_key must be provided".to_string());
    };

    let encrypted = state
        .cipher
        .encrypt_string(value)
        .map_err(|e| e.to_string())?;

    let cred = CredentialRepository::create(
        &state.db,
        &payload.platform,
        cred_type,
        &encrypted,
        payload.label.as_deref(),
    )
    .await
    .map_err(|e| e.to_string())?;

    // Auto-verify for X
    if payload.platform == "x" {
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

    let updated = CredentialRepository::get_by_id(&state.db, &cred.id)
        .await
        .map_err(|e| e.to_string())?
        .unwrap_or(cred);

    Ok(AccountInfo::from(updated))
}

#[tauri::command]
pub async fn remove_account(state: State<'_, AppState>, id: String) -> Result<bool, String> {
    CredentialRepository::delete(&state.db, &id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn verify_account(
    state: State<'_, AppState>,
    id: String,
) -> Result<serde_json::Value, String> {
    let cred = CredentialRepository::get_by_id(&state.db, &id)
        .await
        .map_err(|e| e.to_string())?
        .ok_or("Account not found")?;

    let token = state
        .cipher
        .decrypt_string(&cred.encrypted_value)
        .map_err(|e| e.to_string())?;

    if cred.platform == "x" {
        let client = x_client::XClient::new(&token);
        match client.get_me().await {
            Ok(user) => {
                let _ = CredentialRepository::update_platform_info(
                    &state.db, &cred.id, &user.id, &user.username,
                )
                .await;
                Ok(serde_json::json!({
                    "valid": true,
                    "username": user.username,
                    "user_id": user.id,
                }))
            }
            Err(e) => Ok(serde_json::json!({
                "valid": false,
                "error": e.to_string(),
            })),
        }
    } else {
        Ok(serde_json::json!({
            "valid": false,
            "error": format!("Verification not implemented for {}", cred.platform),
        }))
    }
}

// ─── Post commands ──────────────────────────────────────────────────────────

#[derive(Deserialize)]
pub struct CreatePostPayload {
    pub content: String,
    #[serde(default = "default_text")]
    pub content_type: String,
    pub platforms: Option<Vec<String>>,
    pub account_ids: Option<Vec<String>>,
    pub media_ids: Option<Vec<String>>,
    pub scheduled_for: Option<String>,
    pub metadata: Option<serde_json::Value>,
}

fn default_text() -> String {
    "text".to_string()
}

#[derive(Deserialize)]
pub struct UpdatePostPayload {
    pub content: Option<String>,
    pub content_type: Option<String>,
    pub scheduled_for: Option<String>,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Deserialize)]
pub struct ListPostsPayload {
    pub status: Option<String>,
    pub limit: Option<i64>,
    pub cursor: Option<String>,
}

#[tauri::command]
pub async fn create_post(
    state: State<'_, AppState>,
    payload: CreatePostPayload,
) -> Result<Post, String> {
    let status = if payload.scheduled_for.is_some() {
        "scheduled"
    } else {
        "draft"
    };

    let metadata_str = payload
        .metadata
        .map(|m| serde_json::to_string(&m).unwrap_or_default());

    let post = PostRepository::create(
        &state.db,
        &payload.content,
        &payload.content_type,
        status,
        payload.scheduled_for.as_deref(),
        None,
        None,
        None,
        None,
        None,
        None,
        metadata_str.as_deref(),
    )
    .await
    .map_err(|e| e.to_string())?;

    // Attach media
    if let Some(media_ids) = &payload.media_ids {
        for (i, media_id) in media_ids.iter().enumerate() {
            MediaRepository::attach_to_post(&state.db, &post.id, media_id, i as i32)
                .await
                .map_err(|e| e.to_string())?;
        }
    }

    // Create scheduler job
    if let Some(ref scheduled) = payload.scheduled_for {
        SchedulerJobRepository::create(&state.db, &post.id, scheduled)
            .await
            .map_err(|e| e.to_string())?;
    }

    Ok(post)
}

#[tauri::command]
pub async fn list_posts(
    state: State<'_, AppState>,
    payload: ListPostsPayload,
) -> Result<Vec<Post>, String> {
    let limit = payload.limit.unwrap_or(50).min(100);
    PostRepository::list(&state.db, payload.status.as_deref(), limit, payload.cursor.as_deref())
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_post(state: State<'_, AppState>, id: String) -> Result<Post, String> {
    PostRepository::get_by_id(&state.db, &id)
        .await
        .map_err(|e| e.to_string())?
        .ok_or_else(|| format!("Post {} not found", id))
}

#[tauri::command]
pub async fn update_post(
    state: State<'_, AppState>,
    id: String,
    payload: UpdatePostPayload,
) -> Result<Post, String> {
    let metadata_str = payload
        .metadata
        .map(|m| serde_json::to_string(&m).unwrap_or_default());

    PostRepository::update(
        &state.db,
        &id,
        payload.content.as_deref(),
        payload.content_type.as_deref(),
        None,
        payload.scheduled_for.as_deref(),
        metadata_str.as_deref(),
    )
    .await
    .map_err(|e| e.to_string())?
    .ok_or_else(|| format!("Post {} not found", id))
}

#[tauri::command]
pub async fn delete_post(state: State<'_, AppState>, id: String) -> Result<bool, String> {
    SchedulerJobRepository::cancel_for_post(&state.db, &id)
        .await
        .map_err(|e| e.to_string())?;
    PostRepository::delete(&state.db, &id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn publish_post(
    state: State<'_, AppState>,
    id: String,
) -> Result<serde_json::Value, String> {
    let post = PostRepository::get_by_id(&state.db, &id)
        .await
        .map_err(|e| e.to_string())?
        .ok_or("Post not found")?;

    PostRepository::update_status(&state.db, &id, "publishing")
        .await
        .map_err(|e| e.to_string())?;

    let cred = CredentialRepository::get_active_for_platform(&state.db, "x")
        .await
        .map_err(|e| e.to_string())?
        .ok_or("No active X account configured")?;

    let token = state
        .cipher
        .decrypt_string(&cred.encrypted_value)
        .map_err(|e| e.to_string())?;

    let pub_record = PublicationRepository::create(&state.db, &id, &cred.id, "x", None)
        .await
        .map_err(|e| e.to_string())?;
    PublicationRepository::set_publishing(&state.db, &pub_record.id)
        .await
        .map_err(|e| e.to_string())?;

    let client = x_client::XClient::new(&token);
    match client.create_tweet(&post.content, None, None, None).await {
        Ok(tweet) => {
            let url = format!(
                "https://x.com/{}/status/{}",
                cred.platform_username.as_deref().unwrap_or("i"),
                tweet.id
            );
            let _ =
                PublicationRepository::set_published(&state.db, &pub_record.id, &tweet.id, &url)
                    .await;
            let _ = PostRepository::set_published(&state.db, &id).await;

            Ok(serde_json::json!({
                "post_id": id,
                "status": "published",
                "platform_post_id": tweet.id,
                "platform_url": url,
            }))
        }
        Err(e) => {
            let _ =
                PublicationRepository::set_failed(&state.db, &pub_record.id, &e.to_string(), None)
                    .await;
            let _ = PostRepository::update_status(&state.db, &id, "failed").await;
            Err(format!("X API error: {}", e))
        }
    }
}

#[tauri::command]
pub async fn schedule_post(
    state: State<'_, AppState>,
    id: String,
    scheduled_for: String,
) -> Result<Post, String> {
    SchedulerJobRepository::cancel_for_post(&state.db, &id)
        .await
        .map_err(|e| e.to_string())?;

    let post = PostRepository::update(
        &state.db,
        &id,
        None,
        None,
        Some("scheduled"),
        Some(&scheduled_for),
        None,
    )
    .await
    .map_err(|e| e.to_string())?
    .ok_or("Post not found")?;

    SchedulerJobRepository::create(&state.db, &id, &scheduled_for)
        .await
        .map_err(|e| e.to_string())?;

    Ok(post)
}

#[tauri::command]
pub async fn cancel_scheduled_post(state: State<'_, AppState>, id: String) -> Result<Post, String> {
    SchedulerJobRepository::cancel_for_post(&state.db, &id)
        .await
        .map_err(|e| e.to_string())?;

    PostRepository::update(&state.db, &id, None, None, Some("draft"), None, None)
        .await
        .map_err(|e| e.to_string())?
        .ok_or("Post not found".to_string())
}

#[tauri::command]
pub async fn get_post_publications(
    state: State<'_, AppState>,
    post_id: String,
) -> Result<Vec<PostPublication>, String> {
    PublicationRepository::list_for_post(&state.db, &post_id)
        .await
        .map_err(|e| e.to_string())
}

// ─── Media commands ─────────────────────────────────────────────────────────

#[tauri::command]
pub async fn list_media(state: State<'_, AppState>, limit: Option<i64>) -> Result<Vec<MediaAsset>, String> {
    MediaRepository::list(&state.db, limit.unwrap_or(50))
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_media_for_post(
    state: State<'_, AppState>,
    post_id: String,
) -> Result<Vec<MediaAsset>, String> {
    MediaRepository::get_for_post(&state.db, &post_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_media(state: State<'_, AppState>, id: String) -> Result<bool, String> {
    let asset = MediaRepository::get_by_id(&state.db, &id)
        .await
        .map_err(|e| e.to_string())?
        .ok_or("Media not found")?;

    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
    let full_path = std::path::Path::new(&home)
        .join(".q8t")
        .join("assets")
        .join(&asset.file_path);
    if full_path.exists() {
        let _ = std::fs::remove_file(&full_path);
    }

    MediaRepository::delete(&state.db, &id)
        .await
        .map_err(|e| e.to_string())
}

// ─── Scheduler commands ─────────────────────────────────────────────────────

#[tauri::command]
pub async fn get_scheduler_status(
    state: State<'_, AppState>,
) -> Result<serde_json::Value, String> {
    let running = *state.scheduler_running.read().await;
    let pending = SchedulerJobRepository::pending_count(&state.db)
        .await
        .map_err(|e| e.to_string())?;
    Ok(serde_json::json!({
        "running": running,
        "pending_jobs": pending,
    }))
}

#[tauri::command]
pub async fn get_scheduled_queue(
    state: State<'_, AppState>,
    limit: Option<i64>,
) -> Result<Vec<SchedulerJob>, String> {
    SchedulerJobRepository::list_upcoming(&state.db, limit.unwrap_or(50))
        .await
        .map_err(|e| e.to_string())
}

// ─── X direct commands ──────────────────────────────────────────────────────

#[tauri::command]
pub async fn x_get_me(state: State<'_, AppState>) -> Result<serde_json::Value, String> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let user = client.get_me().await.map_err(|e| e.to_string())?;
    serde_json::to_value(&user).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn x_create_tweet(
    state: State<'_, AppState>,
    text: String,
    reply_to: Option<String>,
    quote_tweet_id: Option<String>,
    media_ids: Option<Vec<String>>,
) -> Result<serde_json::Value, String> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let ids_refs: Option<Vec<&str>> = media_ids
        .as_ref()
        .map(|v| v.iter().map(|s| s.as_str()).collect());
    let tweet = client
        .create_tweet(
            &text,
            reply_to.as_deref(),
            quote_tweet_id.as_deref(),
            ids_refs.as_deref(),
        )
        .await
        .map_err(|e| e.to_string())?;
    serde_json::to_value(&tweet).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn x_search_tweets(
    state: State<'_, AppState>,
    query: String,
    max_results: Option<u32>,
) -> Result<serde_json::Value, String> {
    let (_cred, token) = get_x_token(&state).await?;
    let client = x_client::XClient::new(&token);
    let tweets = client
        .search_recent_tweets(&query, max_results)
        .await
        .map_err(|e| e.to_string())?;
    serde_json::to_value(&tweets).map_err(|e| e.to_string())
}

/// Helper to get the decrypted X bearer token.
async fn get_x_token(state: &AppState) -> Result<(Credential, String), String> {
    let cred = CredentialRepository::get_active_for_platform(&state.db, "x")
        .await
        .map_err(|e| e.to_string())?
        .ok_or("No active X account configured")?;

    let token = state
        .cipher
        .decrypt_string(&cred.encrypted_value)
        .map_err(|e| e.to_string())?;

    Ok((cred, token))
}
