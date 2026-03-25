import { invoke } from "@tauri-apps/api/core"
import type { SchedulerJob, SchedulerStatus } from "./types"

export async function getSchedulerStatus(): Promise<SchedulerStatus> {
  return invoke<SchedulerStatus>("get_scheduler_status")
}

export async function getScheduledQueue(
  limit?: number
): Promise<SchedulerJob[]> {
  return invoke<SchedulerJob[]>("get_scheduled_queue", { limit: limit ?? 50 })
}
