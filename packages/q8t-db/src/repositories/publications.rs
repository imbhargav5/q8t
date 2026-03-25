use sqlx::SqlitePool;
use uuid::Uuid;

use crate::models::PostPublication;

pub struct PublicationRepository;

impl PublicationRepository {
    pub async fn create(
        pool: &SqlitePool,
        post_id: &str,
        credential_id: &str,
        platform: &str,
        content_override: Option<&str>,
    ) -> Result<PostPublication, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        sqlx::query_as::<_, PostPublication>(
            r#"
            INSERT INTO post_publications (id, post_id, credential_id, platform, content_override)
            VALUES (?, ?, ?, ?, ?)
            RETURNING *
            "#,
        )
        .bind(&id)
        .bind(post_id)
        .bind(credential_id)
        .bind(platform)
        .bind(content_override)
        .fetch_one(pool)
        .await
    }

    pub async fn get_by_id(pool: &SqlitePool, id: &str) -> Result<Option<PostPublication>, sqlx::Error> {
        sqlx::query_as::<_, PostPublication>("SELECT * FROM post_publications WHERE id = ?")
            .bind(id)
            .fetch_optional(pool)
            .await
    }

    pub async fn list_for_post(pool: &SqlitePool, post_id: &str) -> Result<Vec<PostPublication>, sqlx::Error> {
        sqlx::query_as::<_, PostPublication>(
            "SELECT * FROM post_publications WHERE post_id = ? ORDER BY created_at DESC",
        )
        .bind(post_id)
        .fetch_all(pool)
        .await
    }

    pub async fn set_published(
        pool: &SqlitePool,
        id: &str,
        platform_post_id: &str,
        platform_post_url: &str,
    ) -> Result<(), sqlx::Error> {
        sqlx::query(
            r#"
            UPDATE post_publications
            SET status = 'published', platform_post_id = ?, platform_post_url = ?, published_at = datetime('now'), updated_at = datetime('now')
            WHERE id = ?
            "#,
        )
        .bind(platform_post_id)
        .bind(platform_post_url)
        .bind(id)
        .execute(pool)
        .await?;
        Ok(())
    }

    pub async fn set_failed(
        pool: &SqlitePool,
        id: &str,
        error_message: &str,
        error_code: Option<&str>,
    ) -> Result<(), sqlx::Error> {
        sqlx::query(
            r#"
            UPDATE post_publications
            SET status = 'failed', error_message = ?, error_code = ?, retry_count = retry_count + 1, updated_at = datetime('now')
            WHERE id = ?
            "#,
        )
        .bind(error_message)
        .bind(error_code)
        .bind(id)
        .execute(pool)
        .await?;
        Ok(())
    }

    pub async fn set_publishing(pool: &SqlitePool, id: &str) -> Result<(), sqlx::Error> {
        sqlx::query(
            "UPDATE post_publications SET status = 'publishing', updated_at = datetime('now') WHERE id = ?",
        )
        .bind(id)
        .execute(pool)
        .await?;
        Ok(())
    }
}
