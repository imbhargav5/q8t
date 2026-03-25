use axum::{
    extract::Request,
    http::StatusCode,
    middleware::Next,
    response::Response,
    Json,
};
use q8t_core::error::ErrorCode;
use q8t_core::response::ApiErrorResponse;

/// Bearer token authentication middleware.
///
/// Validates the `Authorization: Bearer <token>` header against the server token.
/// Skips auth for the health endpoint.
pub async fn auth_middleware(
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<ApiErrorResponse>)> {
    let path = request.uri().path();

    // Allow health endpoint without auth
    if path == "/api/v1/health" {
        return Ok(next.run(request).await);
    }

    let server_token = request
        .extensions()
        .get::<ServerToken>()
        .map(|t| t.0.clone())
        .unwrap_or_default();

    let auth_header = request
        .headers()
        .get("authorization")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("");

    let provided_token = auth_header.strip_prefix("Bearer ").unwrap_or("");

    if provided_token.is_empty() || provided_token != server_token {
        return Err((
            StatusCode::UNAUTHORIZED,
            Json(ApiErrorResponse::new(
                ErrorCode::Unauthorized,
                "Invalid or missing bearer token",
            )),
        ));
    }

    Ok(next.run(request).await)
}

/// Extension type to carry the server token through the middleware chain.
#[derive(Clone)]
pub struct ServerToken(pub String);
