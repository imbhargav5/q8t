use sqlx::SqlitePool;
use uuid::Uuid;

use crate::models::MediaAsset;

pub struct MediaRepository;

impl MediaRepository {
    pub async fn create(
        pool: &SqlitePool,
        filename: &str,
        original_filename: &str,
        mime_type: &str,
        media_type: &str,
        file_path: &str,
        size_bytes: i64,
        width: Option<i32>,
        height: Option<i32>,
        duration_seconds: Option<f64>,
        alt_text: Option<&str>,
    ) -> Result<MediaAsset, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        sqlx::query_as::<_, MediaAsset>(
            r#"
            INSERT INTO media_assets (id, filename, original_filename, mime_type, media_type, file_path, size_bytes, width, height, duration_seconds, alt_text)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING *
            "#,
        )
        .bind(&id)
        .bind(filename)
        .bind(original_filename)
        .bind(mime_type)
        .bind(media_type)
        .bind(file_path)
        .bind(size_bytes)
        .bind(width)
        .bind(height)
        .bind(duration_seconds)
        .bind(alt_text)
        .fetch_one(pool)
        .await
    }

    pub async fn get_by_id(pool: &SqlitePool, id: &str) -> Result<Option<MediaAsset>, sqlx::Error> {
        sqlx::query_as::<_, MediaAsset>("SELECT * FROM media_assets WHERE id = ?")
            .bind(id)
            .fetch_optional(pool)
            .await
    }

    pub async fn list(pool: &SqlitePool, limit: i64) -> Result<Vec<MediaAsset>, sqlx::Error> {
        sqlx::query_as::<_, MediaAsset>(
            "SELECT * FROM media_assets ORDER BY created_at DESC LIMIT ?",
        )
        .bind(limit)
        .fetch_all(pool)
        .await
    }

    pub async fn set_x_media_id(pool: &SqlitePool, id: &str, x_media_id: &str) -> Result<(), sqlx::Error> {
        sqlx::query("UPDATE media_assets SET x_media_id = ?, updated_at = datetime('now') WHERE id = ?")
            .bind(x_media_id)
            .bind(id)
            .execute(pool)
            .await?;
        Ok(())
    }

    pub async fn delete(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
        let result = sqlx::query("DELETE FROM media_assets WHERE id = ?")
            .bind(id)
            .execute(pool)
            .await?;
        Ok(result.rows_affected() > 0)
    }

    pub async fn get_for_post(pool: &SqlitePool, post_id: &str) -> Result<Vec<MediaAsset>, sqlx::Error> {
        sqlx::query_as::<_, MediaAsset>(
            r#"
            SELECT m.* FROM media_assets m
            JOIN post_media pm ON pm.media_asset_id = m.id
            WHERE pm.post_id = ?
            ORDER BY pm.position ASC
            "#,
        )
        .bind(post_id)
        .fetch_all(pool)
        .await
    }

    pub async fn attach_to_post(
        pool: &SqlitePool,
        post_id: &str,
        media_asset_id: &str,
        position: i32,
    ) -> Result<(), sqlx::Error> {
        sqlx::query(
            "INSERT OR REPLACE INTO post_media (post_id, media_asset_id, position) VALUES (?, ?, ?)",
        )
        .bind(post_id)
        .bind(media_asset_id)
        .bind(position)
        .execute(pool)
        .await?;
        Ok(())
    }
}
