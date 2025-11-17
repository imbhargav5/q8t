// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface SendMessageRequest {
  messaging_product: string;
  recipient_type?: string;
  to: string;
  type: "text" | "template" | "image" | "document" | "audio" | "video" | "sticker" | "location" | "contacts" | "interactive";
  text?: TextObject;
  template?: TemplateObject;
  image?: MediaObject;
  document?: MediaObject;
  audio?: MediaObject;
  video?: MediaObject;
}

export interface TextObject {
  body: string;
  preview_url?: boolean;
}

export interface TemplateObject {
  name: string;
  language: LanguageObject;
  components?: TemplateComponent[];
}

export interface LanguageObject {
  code: string;
}

export interface TemplateComponent {
  type?: "header" | "body" | "button";
  parameters?: TemplateParameter[];
}

export interface TemplateParameter {
  type?: "text" | "currency" | "date_time" | "image" | "document" | "video";
  text?: string;
}

export interface MediaObject {
  id?: string;
  link?: string;
  caption?: string;
  filename?: string;
}

export interface SendMessageResponse {
  messaging_product?: string;
  contacts?: ContactInfo[];
  messages?: MessageInfo[];
}

export interface ContactInfo {
  input?: string;
  wa_id?: string;
}

export interface MessageInfo {
  id?: string;
  message_status?: string;
}

export interface MessageTemplatesResponse {
  data?: MessageTemplate[];
  paging?: Paging;
}

export interface MessageTemplate {
  id?: string;
  name?: string;
  status?: "APPROVED" | "PENDING" | "REJECTED";
  category?: string;
  language?: string;
  components?: TemplateComponentDefinition[];
}

export interface TemplateComponentDefinition {
  type?: string;
  text?: string;
  format?: string;
}

export interface PhoneNumbersResponse {
  data?: PhoneNumber[];
  paging?: Paging;
}

export interface PhoneNumber {
  id?: string;
  display_phone_number?: string;
  verified_name?: string;
  quality_rating?: "GREEN" | "YELLOW" | "RED";
  code_verification_status?: string;
}

export interface Paging {
  cursors?: Cursors;
}

export interface Cursors {
  before?: string;
  after?: string;
}
