use sqlx::SqlitePool;
use uuid::Uuid;

use crate::models::SchedulerJob;

pub struct SchedulerJobRepository;

impl SchedulerJobRepository {
    pub async fn create(
        pool: &SqlitePool,
        post_id: &str,
        scheduled_for: &str,
    ) -> Result<SchedulerJob, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        sqlx::query_as::<_, SchedulerJob>(
            r#"
            INSERT INTO scheduler_jobs (id, post_id, scheduled_for)
            VALUES (?, ?, ?)
            RETURNING *
            "#,
        )
        .bind(&id)
        .bind(post_id)
        .bind(scheduled_for)
        .fetch_one(pool)
        .await
    }

    /// Fetch pending jobs that are due for execution.
    pub async fn fetch_due_jobs(pool: &SqlitePool) -> Result<Vec<SchedulerJob>, sqlx::Error> {
        sqlx::query_as::<_, SchedulerJob>(
            r#"
            SELECT * FROM scheduler_jobs
            WHERE status = 'pending' AND scheduled_for <= datetime('now')
            ORDER BY scheduled_for ASC
            LIMIT 10
            "#,
        )
        .fetch_all(pool)
        .await
    }

    /// Lock a job for processing. Returns true if the lock was acquired.
    pub async fn lock_job(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
        let result = sqlx::query(
            r#"
            UPDATE scheduler_jobs
            SET status = 'running', locked_at = datetime('now'), attempts = attempts + 1, updated_at = datetime('now')
            WHERE id = ? AND status = 'pending'
            "#,
        )
        .bind(id)
        .execute(pool)
        .await?;
        Ok(result.rows_affected() > 0)
    }

    pub async fn set_completed(pool: &SqlitePool, id: &str) -> Result<(), sqlx::Error> {
        sqlx::query(
            "UPDATE scheduler_jobs SET status = 'completed', completed_at = datetime('now'), updated_at = datetime('now') WHERE id = ?",
        )
        .bind(id)
        .execute(pool)
        .await?;
        Ok(())
    }

    pub async fn set_failed(pool: &SqlitePool, id: &str, error: &str) -> Result<(), sqlx::Error> {
        // If max attempts reached, mark as failed; otherwise return to pending for retry
        sqlx::query(
            r#"
            UPDATE scheduler_jobs
            SET status = CASE WHEN attempts >= max_attempts THEN 'failed' ELSE 'pending' END,
                last_error = ?,
                locked_at = NULL,
                updated_at = datetime('now')
            WHERE id = ?
            "#,
        )
        .bind(error)
        .bind(id)
        .execute(pool)
        .await?;
        Ok(())
    }

    pub async fn cancel(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
        let result = sqlx::query(
            "UPDATE scheduler_jobs SET status = 'cancelled', updated_at = datetime('now') WHERE id = ? AND status = 'pending'",
        )
        .bind(id)
        .execute(pool)
        .await?;
        Ok(result.rows_affected() > 0)
    }

    pub async fn cancel_for_post(pool: &SqlitePool, post_id: &str) -> Result<(), sqlx::Error> {
        sqlx::query(
            "UPDATE scheduler_jobs SET status = 'cancelled', updated_at = datetime('now') WHERE post_id = ? AND status = 'pending'",
        )
        .bind(post_id)
        .execute(pool)
        .await?;
        Ok(())
    }

    pub async fn list_upcoming(pool: &SqlitePool, limit: i64) -> Result<Vec<SchedulerJob>, sqlx::Error> {
        sqlx::query_as::<_, SchedulerJob>(
            "SELECT * FROM scheduler_jobs WHERE status = 'pending' ORDER BY scheduled_for ASC LIMIT ?",
        )
        .bind(limit)
        .fetch_all(pool)
        .await
    }

    pub async fn list_recent(pool: &SqlitePool, limit: i64) -> Result<Vec<SchedulerJob>, sqlx::Error> {
        sqlx::query_as::<_, SchedulerJob>(
            "SELECT * FROM scheduler_jobs WHERE status IN ('completed', 'failed') ORDER BY updated_at DESC LIMIT ?",
        )
        .bind(limit)
        .fetch_all(pool)
        .await
    }

    pub async fn pending_count(pool: &SqlitePool) -> Result<i64, sqlx::Error> {
        let row: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM scheduler_jobs WHERE status = 'pending'")
            .fetch_one(pool)
            .await?;
        Ok(row.0)
    }
}
