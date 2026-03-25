use axum::{
    body::Bytes,
    extract::{Multipart, Path, Query, State},
    routing::{delete, get, post},
    Json, Router,
};
use q8t_core::response::ApiResponse;
use q8t_db::models::MediaAsset;
use q8t_db::repositories::media::MediaRepository;
use serde::Deserialize;
use uuid::Uuid;

use crate::server::error::AppError;
use crate::state::AppState;

#[derive(Deserialize)]
pub struct ListMediaQuery {
    pub limit: Option<i64>,
}

async fn list_media(
    State(state): State<AppState>,
    Query(params): Query<ListMediaQuery>,
) -> Result<Json<ApiResponse<Vec<MediaAsset>>>, AppError> {
    let limit = params.limit.unwrap_or(20).min(100);
    let assets = MediaRepository::list(&state.db, limit).await?;
    Ok(Json(ApiResponse::ok(assets)))
}

async fn get_media(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<MediaAsset>>, AppError> {
    let asset = MediaRepository::get_by_id(&state.db, &id)
        .await?
        .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Media {} not found", id)))?;
    Ok(Json(ApiResponse::ok(asset)))
}

async fn upload_media(
    State(state): State<AppState>,
    mut multipart: Multipart,
) -> Result<Json<ApiResponse<MediaAsset>>, AppError> {
    let mut file_data: Option<Bytes> = None;
    let mut original_filename = String::new();
    let mut content_type = String::new();
    let mut alt_text: Option<String> = None;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|e| q8t_core::error::Q8tError::Validation(e.to_string()))?
    {
        let name = field.name().unwrap_or("").to_string();
        match name.as_str() {
            "file" => {
                original_filename = field
                    .file_name()
                    .unwrap_or("upload")
                    .to_string();
                content_type = field
                    .content_type()
                    .unwrap_or("application/octet-stream")
                    .to_string();
                file_data = Some(
                    field
                        .bytes()
                        .await
                        .map_err(|e| q8t_core::error::Q8tError::Validation(e.to_string()))?,
                );
            }
            "alt_text" => {
                alt_text = Some(
                    field
                        .text()
                        .await
                        .map_err(|e| q8t_core::error::Q8tError::Validation(e.to_string()))?,
                );
            }
            _ => {}
        }
    }

    let data = file_data.ok_or_else(|| {
        q8t_core::error::Q8tError::Validation("No file field in multipart upload".to_string())
    })?;

    // Determine media type from content type
    let media_type = if content_type.starts_with("image/gif") {
        "gif"
    } else if content_type.starts_with("image/") {
        "image"
    } else if content_type.starts_with("video/") {
        "video"
    } else {
        "image" // default
    };

    // Determine sub-directory
    let subdir = match media_type {
        "video" => "videos",
        "gif" => "images",
        _ => "images",
    };

    // Generate unique filename
    let uuid = Uuid::new_v4().to_string();
    let ext = original_filename
        .rsplit('.')
        .next()
        .unwrap_or("bin");
    let filename = format!("{}.{}", uuid, ext);
    let relative_path = format!("{}/{}", subdir, filename);

    // Write file to disk
    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
    let assets_dir = std::path::Path::new(&home).join(".q8t").join("assets").join(subdir);
    std::fs::create_dir_all(&assets_dir)
        .map_err(|e| q8t_core::error::Q8tError::Io(e))?;
    let full_path = assets_dir.join(&filename);
    std::fs::write(&full_path, &data)
        .map_err(|e| q8t_core::error::Q8tError::Io(e))?;

    let size_bytes = data.len() as i64;

    let asset = MediaRepository::create(
        &state.db,
        &filename,
        &original_filename,
        &content_type,
        media_type,
        &relative_path,
        size_bytes,
        None, // width - TODO: read from image metadata
        None, // height
        None, // duration
        alt_text.as_deref(),
    )
    .await?;

    Ok(Json(ApiResponse::ok(asset)))
}

async fn download_file(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<(axum::http::HeaderMap, Bytes), AppError> {
    let asset = MediaRepository::get_by_id(&state.db, &id)
        .await?
        .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Media {} not found", id)))?;

    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
    let full_path = std::path::Path::new(&home)
        .join(".q8t")
        .join("assets")
        .join(&asset.file_path);

    let data = std::fs::read(&full_path).map_err(|e| q8t_core::error::Q8tError::Io(e))?;

    let mut headers = axum::http::HeaderMap::new();
    headers.insert(
        axum::http::header::CONTENT_TYPE,
        asset.mime_type.parse().unwrap_or(axum::http::HeaderValue::from_static("application/octet-stream")),
    );
    headers.insert(
        axum::http::header::CONTENT_DISPOSITION,
        format!("inline; filename=\"{}\"", asset.original_filename)
            .parse()
            .unwrap_or(axum::http::HeaderValue::from_static("inline")),
    );

    Ok((headers, Bytes::from(data)))
}

async fn delete_media(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<ApiResponse<serde_json::Value>>, AppError> {
    let asset = MediaRepository::get_by_id(&state.db, &id)
        .await?
        .ok_or_else(|| q8t_core::error::Q8tError::NotFound(format!("Media {} not found", id)))?;

    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
    let full_path = std::path::Path::new(&home)
        .join(".q8t")
        .join("assets")
        .join(&asset.file_path);
    if full_path.exists() {
        let _ = std::fs::remove_file(&full_path);
    }

    MediaRepository::delete(&state.db, &id).await?;
    Ok(Json(ApiResponse::ok(serde_json::json!({"deleted": true}))))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(list_media).post(upload_media))
        .route("/{id}", get(get_media).delete(delete_media))
        .route("/{id}/file", get(download_file))
}
