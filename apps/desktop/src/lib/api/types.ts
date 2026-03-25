// Types matching the Rust backend models

export interface Account {
  id: string
  platform: string
  label: string | null
  platform_user_id: string | null
  platform_username: string | null
  is_active: boolean
  verified_at: string | null
  created_at: string
}

export interface Post {
  id: string
  content: string
  content_type: string
  status: "draft" | "scheduled" | "publishing" | "published" | "failed"
  scheduled_for: string | null
  published_at: string | null
  thread_items: string | null
  poll_options: string | null
  poll_duration_minutes: number | null
  hashtags: string | null
  mentions: string | null
  tags: string | null
  metadata: string | null
  created_at: string
  updated_at: string
}

export interface PostPublication {
  id: string
  post_id: string
  credential_id: string
  platform: string
  status: "pending" | "publishing" | "published" | "failed"
  platform_post_id: string | null
  platform_post_url: string | null
  content_override: string | null
  error_message: string | null
  error_code: string | null
  retry_count: number
  max_retries: number
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface MediaAsset {
  id: string
  filename: string
  original_filename: string
  mime_type: string
  media_type: "image" | "video" | "gif"
  file_path: string
  size_bytes: number
  width: number | null
  height: number | null
  duration_seconds: number | null
  alt_text: string | null
  x_media_id: string | null
  metadata: string | null
  created_at: string
  updated_at: string
}

export interface SchedulerJob {
  id: string
  post_id: string
  scheduled_for: string
  status: "pending" | "running" | "completed" | "failed" | "cancelled"
  attempts: number
  max_attempts: number
  last_error: string | null
  locked_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface SchedulerStatus {
  running: boolean
  pending_jobs: number
}

export interface PublishResult {
  post_id: string
  status: string
  platform_post_id?: string
  platform_url?: string
}

export interface VerifyResult {
  valid: boolean
  username?: string
  user_id?: string
  error?: string
}

export interface XUser {
  id: string
  name: string
  username: string
  description?: string
  profile_image_url?: string
  public_metrics?: {
    followers_count: number
    following_count: number
    tweet_count: number
    listed_count: number
  }
}

export interface XTweet {
  id: string
  text: string
  author_id?: string
  created_at?: string
  public_metrics?: {
    retweet_count: number
    reply_count: number
    like_count: number
    quote_count: number
  }
}
