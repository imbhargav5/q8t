use sqlx::SqlitePool;
use uuid::Uuid;

use crate::models::Credential;

pub struct CredentialRepository;

impl CredentialRepository {
    pub async fn create(
        pool: &SqlitePool,
        platform: &str,
        credential_type: &str,
        encrypted_value: &str,
        label: Option<&str>,
    ) -> Result<Credential, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        sqlx::query_as::<_, Credential>(
            r#"
            INSERT INTO credentials (id, platform, credential_type, encrypted_value, label)
            VALUES (?, ?, ?, ?, ?)
            RETURNING *
            "#,
        )
        .bind(&id)
        .bind(platform)
        .bind(credential_type)
        .bind(encrypted_value)
        .bind(label)
        .fetch_one(pool)
        .await
    }

    pub async fn get_by_id(pool: &SqlitePool, id: &str) -> Result<Option<Credential>, sqlx::Error> {
        sqlx::query_as::<_, Credential>("SELECT * FROM credentials WHERE id = ?")
            .bind(id)
            .fetch_optional(pool)
            .await
    }

    pub async fn list(pool: &SqlitePool, platform: Option<&str>) -> Result<Vec<Credential>, sqlx::Error> {
        if let Some(platform) = platform {
            sqlx::query_as::<_, Credential>(
                "SELECT * FROM credentials WHERE platform = ? AND is_active = 1 ORDER BY created_at DESC",
            )
            .bind(platform)
            .fetch_all(pool)
            .await
        } else {
            sqlx::query_as::<_, Credential>(
                "SELECT * FROM credentials WHERE is_active = 1 ORDER BY created_at DESC",
            )
            .fetch_all(pool)
            .await
        }
    }

    pub async fn get_active_for_platform(
        pool: &SqlitePool,
        platform: &str,
    ) -> Result<Option<Credential>, sqlx::Error> {
        sqlx::query_as::<_, Credential>(
            "SELECT * FROM credentials WHERE platform = ? AND is_active = 1 LIMIT 1",
        )
        .bind(platform)
        .fetch_optional(pool)
        .await
    }

    pub async fn update_platform_info(
        pool: &SqlitePool,
        id: &str,
        platform_user_id: &str,
        platform_username: &str,
    ) -> Result<(), sqlx::Error> {
        sqlx::query(
            r#"
            UPDATE credentials
            SET platform_user_id = ?, platform_username = ?, verified_at = datetime('now'), updated_at = datetime('now')
            WHERE id = ?
            "#,
        )
        .bind(platform_user_id)
        .bind(platform_username)
        .bind(id)
        .execute(pool)
        .await?;
        Ok(())
    }

    pub async fn delete(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
        let result = sqlx::query("DELETE FROM credentials WHERE id = ?")
            .bind(id)
            .execute(pool)
            .await?;
        Ok(result.rows_affected() > 0)
    }

    pub async fn set_active(pool: &SqlitePool, id: &str, active: bool) -> Result<(), sqlx::Error> {
        sqlx::query("UPDATE credentials SET is_active = ?, updated_at = datetime('now') WHERE id = ?")
            .bind(active)
            .bind(id)
            .execute(pool)
            .await?;
        Ok(())
    }
}
