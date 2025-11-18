// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  picture?: { data?: { url?: string; width?: number; height?: number } };
}

export interface PageFeed {
  data?: Post[];
  paging?: Paging;
}

export interface Post {
  id: string;
  message?: string;
  created_time: string;
  story?: string;
  full_picture?: string;
  permalink_url?: string;
}

export interface CreatePostRequest {
  message: string;
  link?: string;
  published?: boolean;
  scheduled_publish_time?: number;
}

export interface CreatePostResponse {
  id: string;
}

export interface PageInsights {
  data?: InsightMetric[];
  paging?: Paging;
}

export interface InsightMetric {
  id: string;
  name: string;
  period: string;
  values: InsightValue[];
  title?: string;
  description?: string;
}

export interface InsightValue {
  value: number;
  end_time: string;
}

export interface Paging {
  cursors?: { before?: string; after?: string };
  next?: string;
  previous?: string;
}
