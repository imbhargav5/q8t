use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DisplayInfo {
    pub id: u32,
    pub name: String,
    pub width: u32,
    pub height: u32,
    pub is_primary: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WindowInfo {
    pub id: u32,
    pub title: String,
    pub app_name: String,
    pub width: u32,
    pub height: u32,
    pub is_on_screen: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum CaptureTarget {
    Display { display_id: u32 },
    Window { window_id: u32 },
    Region { x: f64, y: f64, width: f64, height: f64 },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RecordingConfig {
    pub fps: u32,
    pub include_audio: bool,
    pub include_microphone: bool,
    pub show_cursor: bool,
    pub highlight_clicks: bool,
}

impl Default for RecordingConfig {
    fn default() -> Self {
        Self {
            fps: 30,
            include_audio: false,
            include_microphone: false,
            show_cursor: true,
            highlight_clicks: false,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CaptureResult {
    pub path: String,
    pub width: u32,
    pub height: u32,
    pub format: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RecordingResult {
    pub path: String,
    pub duration_secs: f64,
    pub file_size_bytes: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PermissionState {
    Granted,
    Denied,
    Unknown,
}
