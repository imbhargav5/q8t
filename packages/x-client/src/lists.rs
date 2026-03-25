use crate::error::XApiError;
use crate::types::*;
use crate::XClient;

impl XClient {
    pub async fn create_list(&self, name: &str, description: Option<&str>, private: Option<bool>) -> Result<XList, XApiError> {
        let body = CreateListRequest {
            name: name.to_string(),
            description: description.map(|s| s.to_string()),
            private,
        };
        let resp: DataResponse<XList> = self.post("/lists", &body).await?;
        resp.data.ok_or_else(|| XApiError::Deserialize("No data in response".to_string()))
    }

    pub async fn get_list(&self, id: &str) -> Result<XList, XApiError> {
        let resp: DataResponse<XList> = self.get(&format!("/lists/{}", id), &[]).await?;
        resp.data.ok_or_else(|| XApiError::Deserialize("No data in response".to_string()))
    }

    pub async fn update_list(&self, id: &str, name: Option<&str>, description: Option<&str>, private: Option<bool>) -> Result<XList, XApiError> {
        let body = UpdateListRequest {
            name: name.map(|s| s.to_string()),
            description: description.map(|s| s.to_string()),
            private,
        };
        let resp: DataResponse<XList> = self.put(&format!("/lists/{}", id), &body).await?;
        resp.data.ok_or_else(|| XApiError::Deserialize("No data in response".to_string()))
    }

    pub async fn delete_list(&self, id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/lists/{}", id)).await?;
        Ok(resp.data.and_then(|d| d.fields.get("deleted").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn get_list_tweets(&self, list_id: &str, max_results: Option<u32>, pagination_token: Option<&str>) -> Result<Vec<Tweet>, XApiError> {
        let max = max_results.unwrap_or(10).to_string();
        let mut query = vec![("max_results", max.as_str())];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }
        let resp: DataListResponse<Tweet> = self.get(&format!("/lists/{}/tweets", list_id), &query).await?;
        Ok(resp.data.unwrap_or_default())
    }

    pub async fn get_list_members(&self, list_id: &str, max_results: Option<u32>, pagination_token: Option<&str>) -> Result<Vec<User>, XApiError> {
        let max = max_results.unwrap_or(100).to_string();
        let mut query = vec![("max_results", max.as_str())];
        if let Some(token) = pagination_token {
            query.push(("pagination_token", token));
        }
        let resp: DataListResponse<User> = self.get(&format!("/lists/{}/members", list_id), &query).await?;
        Ok(resp.data.unwrap_or_default())
    }

    pub async fn add_list_member(&self, list_id: &str, user_id: &str) -> Result<bool, XApiError> {
        let body = serde_json::json!({"user_id": user_id});
        let resp: BoolDataResponse = self.post(&format!("/lists/{}/members", list_id), &body).await?;
        Ok(resp.data.and_then(|d| d.fields.get("is_member").and_then(|v| v.as_bool())).unwrap_or(false))
    }

    pub async fn remove_list_member(&self, list_id: &str, user_id: &str) -> Result<bool, XApiError> {
        let resp: BoolDataResponse = self.delete(&format!("/lists/{}/members/{}", list_id, user_id)).await?;
        Ok(resp.data.and_then(|d| d.fields.get("is_member").and_then(|v| v.as_bool())).unwrap_or(false))
    }
}
