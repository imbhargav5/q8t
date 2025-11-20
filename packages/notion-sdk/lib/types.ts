// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface User {
  object?: "user";
  id?: string;
  type?: "person" | "bot";
  name?: string;
  avatar_url?: string;
}

export interface Page {
  object?: "page";
  id?: string;
  created_time?: string;
  last_edited_time?: string;
  archived?: boolean;
  properties?: Record<string, unknown>;
  parent?: Record<string, unknown>;
  url?: string;
}

export interface Database {
  object?: "database";
  id?: string;
  created_time?: string;
  last_edited_time?: string;
  title?: Record<string, unknown>[];
  properties?: Record<string, unknown>;
}

export interface Block {
  object?: "block";
  id?: string;
  type?: string;
  created_time?: string;
  last_edited_time?: string;
  has_children?: boolean;
}

export interface Comment {
  object?: "comment";
  id?: string;
  parent?: Record<string, unknown>;
  discussion_id?: string;
  created_time?: string;
  last_edited_time?: string;
  created_by?: User;
}

export interface PaginatedResponse {
  has_more?: boolean;
  next_cursor?: string;
}
