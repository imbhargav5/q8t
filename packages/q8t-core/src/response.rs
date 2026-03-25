use serde::Serialize;

use crate::error::ErrorCode;

/// Standard success response envelope.
#[derive(Debug, Serialize)]
pub struct ApiResponse<T: Serialize> {
    pub ok: bool,
    pub data: T,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub meta: Option<PaginationMeta>,
}

/// Pagination metadata for list responses.
#[derive(Debug, Serialize)]
pub struct PaginationMeta {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub cursor: Option<String>,
    pub has_more: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub total: Option<u64>,
}

/// Standard error response envelope.
#[derive(Debug, Serialize)]
pub struct ApiErrorResponse {
    pub ok: bool,
    pub error: ApiErrorDetail,
}

#[derive(Debug, Serialize)]
pub struct ApiErrorDetail {
    pub code: ErrorCode,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub details: Option<serde_json::Value>,
}

impl<T: Serialize> ApiResponse<T> {
    pub fn ok(data: T) -> Self {
        Self {
            ok: true,
            data,
            meta: None,
        }
    }

    pub fn ok_with_meta(data: T, meta: PaginationMeta) -> Self {
        Self {
            ok: true,
            data,
            meta: Some(meta),
        }
    }
}

impl ApiErrorResponse {
    pub fn new(code: ErrorCode, message: impl Into<String>) -> Self {
        Self {
            ok: false,
            error: ApiErrorDetail {
                code,
                message: message.into(),
                details: None,
            },
        }
    }

    pub fn with_details(code: ErrorCode, message: impl Into<String>, details: serde_json::Value) -> Self {
        Self {
            ok: false,
            error: ApiErrorDetail {
                code,
                message: message.into(),
                details: Some(details),
            },
        }
    }
}
