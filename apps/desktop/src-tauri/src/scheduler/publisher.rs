use crate::state::AppState;
use q8t_db::repositories::credentials::CredentialRepository;
use q8t_db::repositories::posts::PostRepository;
use q8t_db::repositories::publications::PublicationRepository;
use q8t_db::repositories::scheduler_jobs::SchedulerJobRepository;

/// Process all due scheduler jobs.
pub async fn process_due_jobs(state: &AppState) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let jobs = SchedulerJobRepository::fetch_due_jobs(&state.db).await?;

    for job in jobs {
        if !SchedulerJobRepository::lock_job(&state.db, &job.id).await? {
            continue; // Another instance locked it
        }

        tracing::info!("Processing scheduler job {} for post {}", job.id, job.post_id);

        match publish_post(state, &job.post_id).await {
            Ok(()) => {
                SchedulerJobRepository::set_completed(&state.db, &job.id).await?;
                tracing::info!("Job {} completed successfully", job.id);
            }
            Err(e) => {
                tracing::error!("Job {} failed: {}", job.id, e);
                SchedulerJobRepository::set_failed(&state.db, &job.id, &e.to_string()).await?;
            }
        }
    }

    Ok(())
}

async fn publish_post(state: &AppState, post_id: &str) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let post = PostRepository::get_by_id(&state.db, post_id)
        .await?
        .ok_or("Post not found")?;

    PostRepository::update_status(&state.db, post_id, "publishing").await?;

    // Get X credential
    let cred = CredentialRepository::get_active_for_platform(&state.db, "x")
        .await?
        .ok_or("No active X account")?;

    let token = state
        .cipher
        .decrypt_string(&cred.encrypted_value)
        .map_err(|e| format!("Decryption error: {}", e))?;

    // Create publication record
    let pub_record = PublicationRepository::create(&state.db, post_id, &cred.id, "x", None).await?;
    PublicationRepository::set_publishing(&state.db, &pub_record.id).await?;

    // Call X API
    let client = x_client::XClient::new(&token);
    match client.create_tweet(&post.content, None, None, None).await {
        Ok(tweet) => {
            let tweet_url = format!(
                "https://x.com/{}/status/{}",
                cred.platform_username.as_deref().unwrap_or("i"),
                tweet.id
            );
            PublicationRepository::set_published(&state.db, &pub_record.id, &tweet.id, &tweet_url).await?;
            PostRepository::set_published(&state.db, post_id).await?;
            Ok(())
        }
        Err(e) => {
            PublicationRepository::set_failed(&state.db, &pub_record.id, &e.to_string(), None).await?;
            PostRepository::update_status(&state.db, post_id, "failed").await?;
            Err(e.into())
        }
    }
}
