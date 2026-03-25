import { invoke } from "@tauri-apps/api/core"
import type { XUser, XTweet } from "./types"

export async function xGetMe(): Promise<XUser> {
  return invoke<XUser>("x_get_me")
}

export async function xCreateTweet(params: {
  text: string
  reply_to?: string
  quote_tweet_id?: string
  media_ids?: string[]
}): Promise<XTweet> {
  return invoke<XTweet>("x_create_tweet", params)
}

export async function xSearchTweets(
  query: string,
  maxResults?: number
): Promise<XTweet[]> {
  return invoke<XTweet[]>("x_search_tweets", {
    query,
    max_results: maxResults,
  })
}
