/// Print a JSON value in the requested format.
pub fn print(value: &serde_json::Value, format: &str) {
    match format {
        "json" => {
            println!("{}", serde_json::to_string_pretty(value).unwrap_or_default());
        }
        "quiet" => {
            // Only print data IDs
            if let Some(data) = value.get("data") {
                if let Some(arr) = data.as_array() {
                    for item in arr {
                        if let Some(id) = item.get("id").and_then(|v| v.as_str()) {
                            println!("{}", id);
                        }
                    }
                } else if let Some(id) = data.get("id").and_then(|v| v.as_str()) {
                    println!("{}", id);
                }
            }
        }
        _ => {
            // "table" - default: pretty print JSON for now
            println!("{}", serde_json::to_string_pretty(value).unwrap_or_default());
        }
    }
}
