import { invoke } from "@tauri-apps/api/core"
import type { Post, PostPublication, PublishResult } from "./types"

export async function createPost(payload: {
  content: string
  content_type?: string
  platforms?: string[]
  account_ids?: string[]
  media_ids?: string[]
  scheduled_for?: string
  metadata?: Record<string, unknown>
}): Promise<Post> {
  return invoke<Post>("create_post", { payload })
}

export async function listPosts(payload?: {
  status?: string
  limit?: number
  cursor?: string
}): Promise<Post[]> {
  return invoke<Post[]>("list_posts", { payload: payload ?? {} })
}

export async function getPost(id: string): Promise<Post> {
  return invoke<Post>("get_post", { id })
}

export async function updatePost(
  id: string,
  payload: {
    content?: string
    content_type?: string
    scheduled_for?: string
    metadata?: Record<string, unknown>
  }
): Promise<Post> {
  return invoke<Post>("update_post", { id, payload })
}

export async function deletePost(id: string): Promise<boolean> {
  return invoke<boolean>("delete_post", { id })
}

export async function publishPost(id: string): Promise<PublishResult> {
  return invoke<PublishResult>("publish_post", { id })
}

export async function schedulePost(
  id: string,
  scheduledFor: string
): Promise<Post> {
  return invoke<Post>("schedule_post", { id, scheduled_for: scheduledFor })
}

export async function cancelScheduledPost(id: string): Promise<Post> {
  return invoke<Post>("cancel_scheduled_post", { id })
}

export async function getPostPublications(
  postId: string
): Promise<PostPublication[]> {
  return invoke<PostPublication[]>("get_post_publications", {
    post_id: postId,
  })
}
