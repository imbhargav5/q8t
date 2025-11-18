// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface Profile {
  id: string;
  firstName: LocalizedString;
  lastName: LocalizedString;
  profilePicture?: ProfilePicture;
  headline?: LocalizedString;
}

export interface LocalizedString {
  localized: { en_US?: string };
  preferredLocale: Locale;
}

export interface Locale {
  country: string;
  language: string;
}

export interface ProfilePicture {
  displayImage?: string;
}

export interface CreatePostRequest {
  author: string;
  lifecycleState: "PUBLISHED" | "DRAFT";
  specificContent: SpecificContent;
  visibility: Visibility;
}

export interface SpecificContent {
  "com.linkedin.ugc.ShareContent"?: ShareContent;
}

export interface ShareContent {
  shareCommentary: ShareCommentary;
  shareMediaCategory: "NONE" | "ARTICLE" | "IMAGE" | "VIDEO";
}

export interface ShareCommentary {
  text: string;
}

export interface Visibility {
  "com.linkedin.ugc.MemberNetworkVisibility"?: "PUBLIC" | "CONNECTIONS";
}

export interface PostResponse {
  id: string;
  author?: string;
  lifecycleState?: string;
  created?: AuditStamp;
}

export interface AuditStamp {
  actor?: string;
  time?: number;
}

export interface ConnectionsResponse {
  elements: Connection[];
  paging?: Paging;
}

export interface Connection {
  to: string;
  created: number;
}

export interface Paging {
  start?: number;
  count?: number;
  total?: number;
}
