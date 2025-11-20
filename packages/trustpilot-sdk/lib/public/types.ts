// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Trustpilot Public API OpenAPI specification

export interface BusinessUnit {
  id?: string;
  displayName?: string;
  identifyingName?: string;
  websiteUrl?: string;
  numberOfReviews?: { total?: number; usedForTrustScoreCalculation?: number };
  trustScore?: number;
  stars?: number;
  score?: { trustScore?: number; stars?: number };
  profileUrl?: string;
}

export interface Review {
  id?: string;
  stars?: number;
  title?: string;
  text?: string;
  language?: string;
  location?: { id?: string; name?: string };
  createdAt?: string;
  consumer?: { id?: string; displayName?: string; numberOfReviews?: number; displayLocation?: string; hasImage?: boolean };
  businessUnit?: { id?: string; identifyingName?: string };
  companyReply?: { text?: string; createdAt?: string };
  isVerified?: boolean;
  source?: string;
}

export interface ReviewsResponse {
  reviews?: Review[];
  links?: { href?: string; method?: string; rel?: string }[];
}

export interface Consumer {
  id?: string;
  displayName?: string;
  numberOfReviews?: number;
  displayLocation?: string;
  hasImage?: boolean;
}

export interface Category {
  categoryId?: string;
  displayName?: string;
  parentId?: string;
  children?: { categoryId?: string; displayName?: string }[];
}

export interface CategoriesResponse {
  categories?: Category[];
}

export interface Locale {
  code?: string;
  name?: string;
  url?: string;
}

export interface Country {
  id?: string;
  code?: string;
  name?: string;
}

export interface ImageResources {
  stars?: Record<string, any>;
  logo?: Record<string, any>;
  trustScore?: Record<string, any>;
}

export interface ProductReview {
  id?: string;
  stars?: number;
  title?: string;
  text?: string;
  consumer?: Consumer;
  createdAt?: string;
  productName?: string;
  productUrl?: string;
  sku?: string;
}

export interface ProductReviewsResponse {
  productReviews?: ProductReview[];
  links?: Record<string, any>[];
}

export interface ProductReviewSummary {
  sku?: string;
  productUrl?: string;
  numberOfReviews?: { total?: number; fiveStars?: number; fourStars?: number; threeStars?: number; twoStars?: number; oneStar?: number };
  starsAverage?: number;
}
