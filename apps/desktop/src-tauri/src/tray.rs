use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::TrayIconBuilder,
    AppHandle, Emitter, Manager, Runtime,
};

pub fn create_tray<R: Runtime>(app: &AppHandle<R>) -> Result<(), Box<dyn std::error::Error>> {
    let record_screen = MenuItem::with_id(app, "record_screen", "Record Screen", true, Some("CmdOrCtrl+Shift+R"))?;
    let quick_screenshot = MenuItem::with_id(app, "quick_screenshot", "Quick Screenshot", true, Some("CmdOrCtrl+Shift+S"))?;
    let separator1 = PredefinedMenuItem::separator(app)?;
    let configure = MenuItem::with_id(app, "configure", "Configure...", true, None::<&str>)?;
    let separator2 = PredefinedMenuItem::separator(app)?;
    let open_q8t = MenuItem::with_id(app, "open_q8t", "Open q8t", true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", "Quit q8t", true, Some("CmdOrCtrl+Q"))?;

    let menu = Menu::with_items(
        app,
        &[
            &record_screen,
            &quick_screenshot,
            &separator1,
            &configure,
            &separator2,
            &open_q8t,
            &quit,
        ],
    )?;

    TrayIconBuilder::new()
        .menu(&menu)
        .tooltip("q8t")
        .on_menu_event(move |app, event| {
            match event.id.as_ref() {
                "open_q8t" => {
                    if let Some(window) = app.get_webview_window("main") {
                        window.show().ok();
                        window.set_focus().ok();
                    }
                }
                "quit" => {
                    app.exit(0);
                }
                "record_screen" => {
                    if let Some(window) = app.get_webview_window("main") {
                        window.show().ok();
                        window.set_focus().ok();
                        window.emit("tray-action", "record_screen").ok();
                    }
                }
                "quick_screenshot" => {
                    if let Some(window) = app.get_webview_window("main") {
                        window.show().ok();
                        window.set_focus().ok();
                        window.emit("tray-action", "quick_screenshot").ok();
                    }
                }
                "configure" => {
                    if let Some(window) = app.get_webview_window("main") {
                        window.show().ok();
                        window.set_focus().ok();
                        window.emit("tray-action", "configure").ok();
                    }
                }
                _ => {}
            }
        })
        .build(app)?;

    Ok(())
}
