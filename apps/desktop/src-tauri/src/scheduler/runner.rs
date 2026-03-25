use crate::state::AppState;
use std::time::Duration;

/// Start the scheduler background task.
///
/// Polls every 30 seconds for due jobs and executes them.
pub fn spawn_scheduler(state: AppState) -> tokio::task::JoinHandle<()> {
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_secs(30));

        loop {
            interval.tick().await;

            let running = *state.scheduler_running.read().await;
            if !running {
                continue;
            }

            if let Err(e) = super::publisher::process_due_jobs(&state).await {
                tracing::error!("Scheduler error: {}", e);
            }
        }
    })
}
