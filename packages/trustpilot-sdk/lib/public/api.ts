// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Trustpilot Public API OpenAPI specification

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class TrustpilotPublicApi {
  constructor() {}

  /**
   * Get a business unit by ID
   */
  getBusinessUnit(businessUnitId: string): Effect.Effect<Types.BusinessUnit, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.BusinessUnit>(`/business-units/${businessUnitId}`);
  }

  /**
   * Find a business unit by domain
   */
  findBusinessUnit(params?: { name?: string }): Effect.Effect<Types.BusinessUnit, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.name !== undefined) queryParams["name"] = params.name;
    return yield* client.get<Types.BusinessUnit>("/business-units/find", queryParams);
  }

  /**
   * Search for business units
   */
  searchBusinessUnits(params?: { query?: string; country?: string; perPage?: number }): Effect.Effect<{ businessUnits?: Types.BusinessUnit[] }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.query !== undefined) queryParams["query"] = params.query;
    if (params?.country !== undefined) queryParams["country"] = params.country;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    return yield* client.get<{ businessUnits?: Types.BusinessUnit[] }>("/business-units/search", queryParams);
  }

  /**
   * Get reviews for a business unit
   */
  getBusinessUnitReviews(businessUnitId: string, params?: { stars?: string; language?: string; perPage?: number; page?: number; orderBy?: string }): Effect.Effect<Types.ReviewsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.stars !== undefined) queryParams["stars"] = params.stars;
    if (params?.language !== undefined) queryParams["language"] = params.language;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    if (params?.orderBy !== undefined) queryParams["orderBy"] = params.orderBy;
    return yield* client.get<Types.ReviewsResponse>(`/business-units/${businessUnitId}/reviews`, queryParams);
  }

  /**
   * Get web links for a business unit
   */
  getBusinessUnitWebLinks(businessUnitId: string, params?: { locale?: string }): Effect.Effect<{ profileUrl?: unknown }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.locale !== undefined) queryParams["locale"] = params.locale;
    return yield* client.get<{ profileUrl?: unknown }>(`/business-units/${businessUnitId}/web-links`, queryParams);
  }

  /**
   * Get company logo
   */
  getBusinessUnitLogo(businessUnitId: string): Effect.Effect<{ logoUrl?: unknown }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<{ logoUrl?: unknown }>(`/business-units/${businessUnitId}/images/logo`);
  }

  /**
   * Get reviews by a consumer
   */
  getConsumerReviews(consumerId: string, params?: { stars?: string; language?: string; perPage?: number; page?: number }): Effect.Effect<Types.ReviewsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.stars !== undefined) queryParams["stars"] = params.stars;
    if (params?.language !== undefined) queryParams["language"] = params.language;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return yield* client.get<Types.ReviewsResponse>(`/consumers/${consumerId}/reviews`, queryParams);
  }

  /**
   * Get all categories
   */
  getCategories(params?: { country?: string; locale?: string }): Effect.Effect<Types.CategoriesResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.country !== undefined) queryParams["country"] = params.country;
    if (params?.locale !== undefined) queryParams["locale"] = params.locale;
    return yield* client.get<Types.CategoriesResponse>("/categories", queryParams);
  }

  /**
   * Get a specific category
   */
  getCategory(categoryId: string, params?: { locale?: string }): Effect.Effect<Types.Category, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.locale !== undefined) queryParams["locale"] = params.locale;
    return yield* client.get<Types.Category>(`/categories/${categoryId}`, queryParams);
  }

  /**
   * Get business units in a category
   */
  getCategoryBusinessUnits(categoryId: string, params?: { country?: string; perPage?: number }): Effect.Effect<{ businessUnits?: Types.BusinessUnit[] }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.country !== undefined) queryParams["country"] = params.country;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    return yield* client.get<{ businessUnits?: Types.BusinessUnit[] }>(`/categories/${categoryId}/business-units`, queryParams);
  }

  /**
   * Get supported locales
   */
  getLocales(): Effect.Effect<Types.Locale[], HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.Locale[]>("/resources/metadata/locales");
  }

  /**
   * Get countries
   */
  getCountries(params?: { translationLocale?: string }): Effect.Effect<Types.Country[], HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.translationLocale !== undefined) queryParams["translationLocale"] = params.translationLocale;
    return yield* client.get<Types.Country[]>("/resources/metadata/countries", queryParams);
  }

  /**
   * Get image resources
   */
  getImageResources(): Effect.Effect<Types.ImageResources, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ImageResources>("/resources/images");
  }

  /**
   * Get localized star rating text
   */
  getStarRatingString(stars: string, params?: { locale?: string }): Effect.Effect<{ text?: unknown }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.locale !== undefined) queryParams["locale"] = params.locale;
    return yield* client.get<{ text?: unknown }>(`/resources/strings/stars/${stars}`, queryParams);
  }

  /**
   * Get public product reviews
   */
  getProductReviews(businessUnitId: string, params?: { sku?: string; productUrl?: string; perPage?: number; page?: number }): Effect.Effect<Types.ProductReviewsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.sku !== undefined) queryParams["sku"] = params.sku;
    if (params?.productUrl !== undefined) queryParams["productUrl"] = params.productUrl;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return yield* client.get<Types.ProductReviewsResponse>(`/product-reviews/business-units/${businessUnitId}/reviews`, queryParams);
  }

  /**
   * Get a specific product review
   */
  getProductReview(businessUnitId: string, reviewId: string): Effect.Effect<Types.ProductReview, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ProductReview>(`/product-reviews/business-units/${businessUnitId}/reviews/${reviewId}`);
  }

}