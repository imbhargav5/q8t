mod plugins;
mod scheduler;
mod server;
mod state;
mod tray;

use q8t_crypto::CredentialCipher;
use q8t_db::pool;
use state::AppState;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "q8t_desktop=info,tower_http=info".into()),
        )
        .init();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_os::init())
        .setup(|app| {
            tray::create_tray(app.handle())?;

            #[cfg(target_os = "macos")]
            {
                let main_window = app.get_webview_window("main");
                if let Some(window) = main_window {
                    window.set_title("q8t").ok();
                }
            }

            // Initialize backend synchronously so state is available for commands
            let rt = tokio::runtime::Handle::current();
            let state = rt.block_on(async { init_state().await })
                .map_err(|e| Box::new(std::io::Error::new(std::io::ErrorKind::Other, e.to_string())))?;

            // Register state for Tauri commands
            app.manage(state.clone());

            // Spawn scheduler in background
            let sched_state = state.clone();
            tauri::async_runtime::spawn(async move {
                scheduler::runner::spawn_scheduler(sched_state);
            });

            // Spawn HTTP server in background
            tauri::async_runtime::spawn(async move {
                if let Err(e) = server::startup::start_server(state).await {
                    tracing::error!("HTTP server error: {}", e);
                }
            });

            tracing::info!("q8t backend initialized");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // Theme
            get_app_theme,
            set_app_theme,
            // Screen capture
            plugins::screen_capture::list_displays,
            plugins::screen_capture::list_windows,
            plugins::screen_capture::capture_screenshot,
            plugins::screen_capture::save_screenshot,
            plugins::screen_capture::start_recording,
            plugins::screen_capture::stop_recording,
            plugins::screen_capture::pause_recording,
            plugins::screen_capture::resume_recording,
            plugins::screen_capture::cancel_recording,
            plugins::screen_capture::check_screen_recording_permission,
            plugins::screen_capture::request_screen_recording_permission,
            plugins::screen_capture::check_microphone_permission,
            // Social: accounts
            plugins::social::commands::list_accounts,
            plugins::social::commands::add_account,
            plugins::social::commands::remove_account,
            plugins::social::commands::verify_account,
            // Social: posts
            plugins::social::commands::create_post,
            plugins::social::commands::list_posts,
            plugins::social::commands::get_post,
            plugins::social::commands::update_post,
            plugins::social::commands::delete_post,
            plugins::social::commands::publish_post,
            plugins::social::commands::schedule_post,
            plugins::social::commands::cancel_scheduled_post,
            plugins::social::commands::get_post_publications,
            // Social: media
            plugins::social::commands::list_media,
            plugins::social::commands::get_media_for_post,
            plugins::social::commands::delete_media,
            // Social: scheduler
            plugins::social::commands::get_scheduler_status,
            plugins::social::commands::get_scheduled_queue,
            // Social: X direct
            plugins::social::commands::x_get_me,
            plugins::social::commands::x_create_tweet,
            plugins::social::commands::x_search_tweets,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/// Initialize shared state: database, encryption, server token.
async fn init_state() -> Result<AppState, Box<dyn std::error::Error + Send + Sync>> {
    let db_path = pool::default_db_path();
    let db = pool::init_pool(&db_path).await?;

    let cipher = CredentialCipher::load_or_create()
        .map_err(|e| format!("Failed to init encryption: {}", e))?;

    let server_token = load_or_create_server_token()?;
    let server_port = server::startup::default_port();

    Ok(AppState::new(db, cipher, server_token, server_port))
}

/// Load server token from ~/.q8t/server.token or generate a new one.
fn load_or_create_server_token() -> Result<String, std::io::Error> {
    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
    let token_path = std::path::Path::new(&home).join(".q8t").join("server.token");

    if token_path.exists() {
        let token = std::fs::read_to_string(&token_path)?.trim().to_string();
        if !token.is_empty() {
            return Ok(token);
        }
    }

    let token = q8t_crypto::generate_token();
    std::fs::create_dir_all(token_path.parent().unwrap())?;
    std::fs::write(&token_path, &token)?;

    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let _ = std::fs::set_permissions(&token_path, std::fs::Permissions::from_mode(0o600));
    }

    Ok(token)
}

#[tauri::command]
async fn get_app_theme() -> String {
    "system".to_string()
}

#[tauri::command]
async fn set_app_theme(_theme: String) -> Result<(), String> {
    Ok(())
}
