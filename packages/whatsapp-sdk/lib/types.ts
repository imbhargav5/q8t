// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface SendMessageRequest {
  messaging_product: "whatsapp";
  recipient_type?: "individual" | "group";
  to: string;
  type: "text" | "template" | "image" | "video" | "audio" | "document" | "sticker" | "location" | "contacts" | "interactive" | "reaction";
  text?: TextObject;
  template?: TemplateObject;
  image?: MediaObject;
  video?: MediaObject;
  audio?: MediaObject;
  document?: DocumentObject;
  sticker?: MediaObject;
  location?: LocationObject;
  contacts?: ContactObject[];
  interactive?: InteractiveObject;
  reaction?: ReactionObject;
  context?: ContextObject;
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
  policy?: "deterministic";
}

export interface TemplateComponent {
  type: "header" | "body" | "button";
  sub_type?: "quick_reply" | "url";
  index?: string;
  parameters?: TemplateParameter[];
}

export interface TemplateParameter {
  type: "text" | "currency" | "date_time" | "image" | "video" | "document" | "payload";
  text?: string;
  currency?: CurrencyParameter;
  date_time?: DateTimeParameter;
  image?: MediaObject;
  video?: MediaObject;
  document?: MediaObject;
  payload?: string;
}

export interface CurrencyParameter {
  fallback_value: string;
  code: string;
  amount_1000: number;
}

export interface DateTimeParameter {
  fallback_value: string;
}

export interface MediaObject {
  id?: string;
  link?: string;
  caption?: string;
}

export interface DocumentObject {
  id?: string;
  link?: string;
  caption?: string;
  filename?: string;
}

export interface LocationObject {
  longitude: number;
  latitude: number;
  name?: string;
  address?: string;
}

export interface ContactObject {
  name?: ContactName;
  phones?: ContactPhone[];
  emails?: ContactEmail[];
}

export interface ContactName {
  formatted_name: string;
  first_name?: string;
  last_name?: string;
}

export interface ContactPhone {
  phone?: string;
  type?: "CELL" | "MAIN" | "IPHONE" | "HOME" | "WORK";
}

export interface ContactEmail {
  email?: string;
  type?: "WORK" | "HOME";
}

export interface InteractiveObject {
  type: "button" | "list";
  header?: InteractiveHeader;
  body?: InteractiveBody;
  footer?: InteractiveFooter;
  action: InteractiveAction;
}

export interface InteractiveHeader {
  type: "text" | "image" | "video" | "document";
  text?: string;
  image?: MediaObject;
  video?: MediaObject;
  document?: MediaObject;
}

export interface InteractiveBody {
  text: string;
}

export interface InteractiveFooter {
  text: string;
}

export interface InteractiveAction {
  button?: string;
  buttons?: InteractiveButton[];
  sections?: InteractiveSection[];
}

export interface InteractiveButton {
  type: "reply";
  reply: InteractiveReply;
}

export interface InteractiveReply {
  id: string;
  title: string;
}

export interface InteractiveSection {
  title?: string;
  rows: InteractiveRow[];
}

export interface InteractiveRow {
  id: string;
  title: string;
  description?: string;
}

export interface ReactionObject {
  message_id: string;
  emoji: string;
}

export interface ContextObject {
  message_id: string;
}

export interface MarkAsReadRequest {
  messaging_product: "whatsapp";
  status: "read";
  message_id: string;
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

export interface UploadMediaRequest {
  file: string;
  type: string;
  messaging_product: "whatsapp";
}

export interface MediaUploadResponse {
  id?: string;
}

export interface MediaUrlResponse {
  url?: string;
  mime_type?: string;
  sha256?: string;
  file_size?: number;
  id?: string;
  messaging_product?: string;
}

export interface CreateTemplateRequest {
  name: string;
  language: string;
  category: "AUTHENTICATION" | "MARKETING" | "UTILITY";
  components: TemplateComponentDefinition[];
}

export interface TemplateComponentDefinition {
  type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
  format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT";
  text?: string;
  buttons?: TemplateButton[];
  example?: Record<string, unknown>;
}

export interface TemplateButton {
  type: "QUICK_REPLY" | "PHONE_NUMBER" | "URL" | "OTP";
  text: string;
  phone_number?: string;
  url?: string;
}

export interface Template {
  id?: string;
  name?: string;
  status?: "APPROVED" | "PENDING" | "REJECTED" | "PAUSED" | "DISABLED";
  category?: string;
  language?: string;
  components?: TemplateComponentDefinition[];
}

export interface TemplatesListResponse {
  data?: Template[];
  paging?: Paging;
}

export interface TemplateResponse {
  id?: string;
  status?: string;
  category?: string;
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

export interface RegisterPhoneRequest {
  messaging_product: "whatsapp";
  pin: string;
}

export interface DeregisterPhoneRequest {
  messaging_product: "whatsapp";
}

export interface RequestCodeRequest {
  code_method: "SMS" | "VOICE";
  language: string;
}

export interface VerifyCodeRequest {
  code: string;
}

export interface QRCodesResponse {
  data?: QRCode[];
}

export interface QRCode {
  code?: string;
  prefilled_message?: string;
  deep_link_url?: string;
  qr_image_url?: string;
}

export interface CreateQRCodeRequest {
  prefilled_message: string;
  generate_qr_image: "PNG" | "SVG";
}

export interface UpdateQRCodeRequest {
  code?: string;
  prefilled_message?: string;
}

export interface BusinessProfileResponse {
  data?: BusinessProfile[];
}

export interface BusinessProfile {
  about?: string;
  address?: string;
  description?: string;
  email?: string;
  messaging_product?: string;
  profile_picture_url?: string;
  websites?: string[];
  vertical?: string;
}

export interface UpdateBusinessProfileRequest {
  messaging_product: "whatsapp";
  about?: string;
  address?: string;
  description?: string;
  email?: string;
  profile_picture_handle?: string;
  websites?: string[];
  vertical?: string;
}

export interface WABA {
  id?: string;
  name?: string;
  timezone_id?: string;
  message_template_namespace?: string;
}

export interface SubscribedAppsResponse {
  data?: { whatsapp_business_api_data?: Record<string, unknown> }[];
}

export interface SuccessResponse {
  success?: boolean;
}

export interface Paging {
  cursors?: Cursors;
  next?: string;
  previous?: string;
}

export interface Cursors {
  before?: string;
  after?: string;
}
