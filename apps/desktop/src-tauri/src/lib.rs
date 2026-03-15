mod tray;
mod plugins;

use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
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

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_app_theme,
            set_app_theme,
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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn get_app_theme() -> String {
    "system".to_string()
}

#[tauri::command]
async fn set_app_theme(_theme: String) -> Result<(), String> {
    // Theme is handled on the frontend via CSS class
    Ok(())
}
