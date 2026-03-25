use sqlx::SqlitePool;
use uuid::Uuid;

use crate::models::Post;

pub struct PostRepository;

impl PostRepository {
    pub async fn create(
        pool: &SqlitePool,
        content: &str,
        content_type: &str,
        status: &str,
        scheduled_for: Option<&str>,
        thread_items: Option<&str>,
        poll_options: Option<&str>,
        poll_duration_minutes: Option<i32>,
        hashtags: Option<&str>,
        mentions: Option<&str>,
        tags: Option<&str>,
        metadata: Option<&str>,
    ) -> Result<Post, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        sqlx::query_as::<_, Post>(
            r#"
            INSERT INTO posts (id, content, content_type, status, scheduled_for, thread_items, poll_options, poll_duration_minutes, hashtags, mentions, tags, metadata)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING *
            "#,
        )
        .bind(&id)
        .bind(content)
        .bind(content_type)
        .bind(status)
        .bind(scheduled_for)
        .bind(thread_items)
        .bind(poll_options)
        .bind(poll_duration_minutes)
        .bind(hashtags)
        .bind(mentions)
        .bind(tags)
        .bind(metadata)
        .fetch_one(pool)
        .await
    }

    pub async fn get_by_id(pool: &SqlitePool, id: &str) -> Result<Option<Post>, sqlx::Error> {
        sqlx::query_as::<_, Post>("SELECT * FROM posts WHERE id = ?")
            .bind(id)
            .fetch_optional(pool)
            .await
    }

    pub async fn list(
        pool: &SqlitePool,
        status: Option<&str>,
        limit: i64,
        cursor: Option<&str>,
    ) -> Result<Vec<Post>, sqlx::Error> {
        match (status, cursor) {
            (Some(s), Some(c)) => {
                sqlx::query_as::<_, Post>(
                    "SELECT * FROM posts WHERE status = ? AND created_at < ? ORDER BY created_at DESC LIMIT ?",
                )
                .bind(s)
                .bind(c)
                .bind(limit)
                .fetch_all(pool)
                .await
            }
            (Some(s), None) => {
                sqlx::query_as::<_, Post>(
                    "SELECT * FROM posts WHERE status = ? ORDER BY created_at DESC LIMIT ?",
                )
                .bind(s)
                .bind(limit)
                .fetch_all(pool)
                .await
            }
            (None, Some(c)) => {
                sqlx::query_as::<_, Post>(
                    "SELECT * FROM posts WHERE created_at < ? ORDER BY created_at DESC LIMIT ?",
                )
                .bind(c)
                .bind(limit)
                .fetch_all(pool)
                .await
            }
            (None, None) => {
                sqlx::query_as::<_, Post>(
                    "SELECT * FROM posts ORDER BY created_at DESC LIMIT ?",
                )
                .bind(limit)
                .fetch_all(pool)
                .await
            }
        }
    }

    pub async fn update(
        pool: &SqlitePool,
        id: &str,
        content: Option<&str>,
        content_type: Option<&str>,
        status: Option<&str>,
        scheduled_for: Option<&str>,
        metadata: Option<&str>,
    ) -> Result<Option<Post>, sqlx::Error> {
        // Use COALESCE pattern: each field updates only if a new value is provided
        sqlx::query_as::<_, Post>(
            r#"
            UPDATE posts SET
                content = COALESCE(?, content),
                content_type = COALESCE(?, content_type),
                status = COALESCE(?, status),
                scheduled_for = COALESCE(?, scheduled_for),
                metadata = COALESCE(?, metadata),
                updated_at = datetime('now')
            WHERE id = ?
            RETURNING *
            "#,
        )
        .bind(content)
        .bind(content_type)
        .bind(status)
        .bind(scheduled_for)
        .bind(metadata)
        .bind(id)
        .fetch_optional(pool)
        .await
    }

    pub async fn update_status(pool: &SqlitePool, id: &str, status: &str) -> Result<(), sqlx::Error> {
        sqlx::query("UPDATE posts SET status = ?, updated_at = datetime('now') WHERE id = ?")
            .bind(status)
            .bind(id)
            .execute(pool)
            .await?;
        Ok(())
    }

    pub async fn set_published(pool: &SqlitePool, id: &str) -> Result<(), sqlx::Error> {
        sqlx::query(
            "UPDATE posts SET status = 'published', published_at = datetime('now'), updated_at = datetime('now') WHERE id = ?",
        )
        .bind(id)
        .execute(pool)
        .await?;
        Ok(())
    }

    pub async fn delete(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
        let result = sqlx::query("DELETE FROM posts WHERE id = ?")
            .bind(id)
            .execute(pool)
            .await?;
        Ok(result.rows_affected() > 0)
    }
}
