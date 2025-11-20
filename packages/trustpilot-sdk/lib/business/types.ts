// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Trustpilot Business API OpenAPI specification

export interface PrivateReview {
  id?: string;
  consumer?: { id?: string; displayName?: string; email?: string };
  stars?: number;
  title?: string;
  text?: string;
  language?: string;
  createdAt?: string;
  referenceId?: string;
  tags?: string[];
  companyReply?: { text?: string; createdAt?: string };
  state?: "published" | "unpublished" | "underModeration" | "flagged" | "deleted";
  isVerified?: boolean;
  location?: { id?: string; name?: string };
}

export interface PrivateReviewsResponse {
  reviews?: PrivateReview[];
  links?: Record<string, any>[];
}

export interface EmailInvitation {
  recipientEmail: string;
  recipientName: string;
  referenceId: string;
  locale?: string;
  senderEmail?: string;
  senderName?: string;
  replyTo?: string;
  preferredSendTime?: string;
  redirectUri?: string;
  tags?: string[];
  templateId?: string;
  serviceReviewInvitation?: { templateId?: string; redirectUri?: string };
  productReviewInvitation?: { templateId?: string; redirectUri?: string; products?: { productUrl?: string; imageUrl?: string; name?: string; sku?: string; brand?: string; gtin?: string; mpn?: string }[] };
}

export interface InvitationResponse {
  id?: string;
  status?: string;
  recipientEmail?: string;
  createdAt?: string;
}

export interface InvitationLink {
  referenceId: string;
  locale?: string;
  redirectUri?: string;
  tags?: string[];
}

export interface InvitationLinkResponse {
  url?: string;
  referenceId?: string;
}

export interface TemplatesResponse {
  templates?: { id?: string; name?: string; type?: string }[];
}

export interface PrivateProductReview {
  id?: string;
  consumer?: { id?: string; displayName?: string; email?: string };
  stars?: number;
  title?: string;
  text?: string;
  createdAt?: string;
  sku?: string;
  productUrl?: string;
  referenceId?: string;
  state?: string;
}

export interface PrivateProductReviewsResponse {
  productReviews?: PrivateProductReview[];
  links?: Record<string, any>[];
}

export interface ProductReviewSummariesResponse {
  summaries?: { sku?: string; productUrl?: string; numberOfReviews?: { total?: number; fiveStars?: number; fourStars?: number; threeStars?: number; twoStars?: number; oneStar?: number }; starsAverage?: number }[];
}

export interface ProductInvitationLink {
  referenceId: string;
  locale?: string;
  redirectUri?: string;
  products: { productUrl?: string; imageUrl?: string; name?: string; sku?: string }[];
}

export interface PrivateProduct {
  sku?: string;
  productUrl?: string;
  imageUrl?: string;
  name?: string;
  brand?: string;
  gtin?: string;
  mpn?: string;
}

export interface PrivateProductsResponse {
  products?: PrivateProduct[];
  links?: Record<string, any>[];
}

export interface ReplyToReview {
  message: string;
}

export interface ReplyResponse {
  id?: string;
  text?: string;
  createdAt?: string;
}

export interface TagOperation {
  tags?: string[];
  group?: string;
}

export interface TagsResponse {
  tags?: string[];
}

export interface ReviewReport {
  businessUnitId?: string;
  startDate?: string;
  endDate?: string;
  totalReviews?: number;
  averageStars?: number;
}

export interface Error {
  code?: string;
  message?: string;
}
