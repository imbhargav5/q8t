import { z } from "zod";

// Enums
export const AnalyticsPeriodSchema = z.enum([
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "yearly",
  "custom",
]);

export const ContentPerformanceTierSchema = z.enum([
  "viral",
  "high",
  "medium",
  "low",
  "poor",
]);

export const SocialPlatformSchema = z.enum([
  "facebook",
  "instagram",
  "twitter",
  "x",
  "linkedin",
  "tiktok",
  "youtube",
  "pinterest",
  "threads",
  "reddit",
  "bluesky",
]);

// Types
export type AnalyticsPeriod = z.infer<typeof AnalyticsPeriodSchema>;
export type ContentPerformanceTier = z.infer<typeof ContentPerformanceTierSchema>;
export type SocialPlatform = z.infer<typeof SocialPlatformSchema>;
