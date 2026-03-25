import { invoke } from "@tauri-apps/api/core"
import type { MediaAsset } from "./types"

export async function listMedia(limit?: number): Promise<MediaAsset[]> {
  return invoke<MediaAsset[]>("list_media", { limit: limit ?? 50 })
}

export async function getMediaForPost(postId: string): Promise<MediaAsset[]> {
  return invoke<MediaAsset[]>("get_media_for_post", { post_id: postId })
}

export async function deleteMedia(id: string): Promise<boolean> {
  return invoke<boolean>("delete_media", { id })
}
