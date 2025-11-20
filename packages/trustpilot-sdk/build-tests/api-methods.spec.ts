/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specifications
 * are present in the generated TrustpilotPublicApi and TrustpilotBusinessApi classes.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { TrustpilotPublicApi } from "../lib/public/api";
import { TrustpilotBusinessApi } from "../lib/business/api";
import type { HttpClient } from "../src/auth/http-client";

describe("TrustpilotPublicApi - Method Existence", () => {
	let api: TrustpilotPublicApi;
	let mockClient: HttpClient;

	beforeEach(() => {
		// Create a mock HTTP client
		mockClient = {
			get: async () => ({}),
			post: async () => ({}),
			put: async () => ({}),
			delete: async () => ({}),
			patch: async () => ({}),
		} as HttpClient;

		api = new TrustpilotPublicApi(mockClient);
	});

	describe("Business Units API", () => {
		it("should have getBusinessUnit method", () => {
			expect(api.getBusinessUnit).toBeDefined();
			expect(typeof api.getBusinessUnit).toBe("function");
		});

		it("should have findBusinessUnit method", () => {
			expect(api.findBusinessUnit).toBeDefined();
			expect(typeof api.findBusinessUnit).toBe("function");
		});

		it("should have searchBusinessUnits method", () => {
			expect(api.searchBusinessUnits).toBeDefined();
			expect(typeof api.searchBusinessUnits).toBe("function");
		});

		it("should have getBusinessUnitReviews method", () => {
			expect(api.getBusinessUnitReviews).toBeDefined();
			expect(typeof api.getBusinessUnitReviews).toBe("function");
		});

		it("should have getBusinessUnitWebLinks method", () => {
			expect(api.getBusinessUnitWebLinks).toBeDefined();
			expect(typeof api.getBusinessUnitWebLinks).toBe("function");
		});

		it("should have getBusinessUnitLogo method", () => {
			expect(api.getBusinessUnitLogo).toBeDefined();
			expect(typeof api.getBusinessUnitLogo).toBe("function");
		});
	});

	describe("Consumer API", () => {
		it("should have getConsumerReviews method", () => {
			expect(api.getConsumerReviews).toBeDefined();
			expect(typeof api.getConsumerReviews).toBe("function");
		});
	});

	describe("Categories API", () => {
		it("should have getCategories method", () => {
			expect(api.getCategories).toBeDefined();
			expect(typeof api.getCategories).toBe("function");
		});

		it("should have getCategory method", () => {
			expect(api.getCategory).toBeDefined();
			expect(typeof api.getCategory).toBe("function");
		});

		it("should have getCategoryBusinessUnits method", () => {
			expect(api.getCategoryBusinessUnits).toBeDefined();
			expect(typeof api.getCategoryBusinessUnits).toBe("function");
		});
	});

	describe("Resources API", () => {
		it("should have getLocales method", () => {
			expect(api.getLocales).toBeDefined();
			expect(typeof api.getLocales).toBe("function");
		});

		it("should have getCountries method", () => {
			expect(api.getCountries).toBeDefined();
			expect(typeof api.getCountries).toBe("function");
		});

		it("should have getImageResources method", () => {
			expect(api.getImageResources).toBeDefined();
			expect(typeof api.getImageResources).toBe("function");
		});

		it("should have getStarRatingString method", () => {
			expect(api.getStarRatingString).toBeDefined();
			expect(typeof api.getStarRatingString).toBe("function");
		});
	});

	describe("Product Reviews API", () => {
		it("should have getProductReviews method", () => {
			expect(api.getProductReviews).toBeDefined();
			expect(typeof api.getProductReviews).toBe("function");
		});

		it("should have getProductReview method", () => {
			expect(api.getProductReview).toBeDefined();
			expect(typeof api.getProductReview).toBe("function");
		});
	});

	describe("Method Count Validation", () => {
		it("should have exactly 16 public methods (excluding constructor)", () => {
			const methods = Object.getOwnPropertyNames(
				Object.getPrototypeOf(api),
			).filter(
				(name) =>
					name !== "constructor" &&
					typeof api[name as keyof TrustpilotPublicApi] === "function",
			);

			expect(methods).toHaveLength(16);
		});

		it("should have all expected methods", () => {
			const expectedMethods = [
				"getBusinessUnit",
				"findBusinessUnit",
				"searchBusinessUnits",
				"getBusinessUnitReviews",
				"getBusinessUnitWebLinks",
				"getBusinessUnitLogo",
				"getConsumerReviews",
				"getCategories",
				"getCategory",
				"getCategoryBusinessUnits",
				"getLocales",
				"getCountries",
				"getImageResources",
				"getStarRatingString",
				"getProductReviews",
				"getProductReview",
			];

			const actualMethods = Object.getOwnPropertyNames(
				Object.getPrototypeOf(api),
			).filter((name) => name !== "constructor");

			for (const method of expectedMethods) {
				expect(actualMethods).toContain(method);
			}
		});
	});
});

describe("TrustpilotBusinessApi - Method Existence", () => {
	let api: TrustpilotBusinessApi;
	let mockClient: HttpClient;

	beforeEach(() => {
		// Create a mock HTTP client
		mockClient = {
			get: async () => ({}),
			post: async () => ({}),
			put: async () => ({}),
			delete: async () => ({}),
			patch: async () => ({}),
		} as HttpClient;

		api = new TrustpilotBusinessApi(mockClient);
	});

	describe("Private Reviews API", () => {
		it("should have getPrivateBusinessUnitReviews method", () => {
			expect(api.getPrivateBusinessUnitReviews).toBeDefined();
			expect(typeof api.getPrivateBusinessUnitReviews).toBe("function");
		});
	});

	describe("Review Management API", () => {
		it("should have replyToReview method", () => {
			expect(api.replyToReview).toBeDefined();
			expect(typeof api.replyToReview).toBe("function");
		});

		it("should have deleteReviewReply method", () => {
			expect(api.deleteReviewReply).toBeDefined();
			expect(typeof api.deleteReviewReply).toBe("function");
		});

		it("should have addReviewTags method", () => {
			expect(api.addReviewTags).toBeDefined();
			expect(typeof api.addReviewTags).toBe("function");
		});

		it("should have setReviewTags method", () => {
			expect(api.setReviewTags).toBeDefined();
			expect(typeof api.setReviewTags).toBe("function");
		});

		it("should have removeReviewTags method", () => {
			expect(api.removeReviewTags).toBeDefined();
			expect(typeof api.removeReviewTags).toBe("function");
		});
	});

	describe("Invitations API", () => {
		it("should have sendEmailInvitation method", () => {
			expect(api.sendEmailInvitation).toBeDefined();
			expect(typeof api.sendEmailInvitation).toBe("function");
		});

		it("should have createInvitationLink method", () => {
			expect(api.createInvitationLink).toBeDefined();
			expect(typeof api.createInvitationLink).toBe("function");
		});

		it("should have getInvitationTemplates method", () => {
			expect(api.getInvitationTemplates).toBeDefined();
			expect(typeof api.getInvitationTemplates).toBe("function");
		});
	});

	describe("Private Product Reviews API", () => {
		it("should have getPrivateProductReviews method", () => {
			expect(api.getPrivateProductReviews).toBeDefined();
			expect(typeof api.getPrivateProductReviews).toBe("function");
		});

		it("should have getProductReviewSummaries method", () => {
			expect(api.getProductReviewSummaries).toBeDefined();
			expect(typeof api.getProductReviewSummaries).toBe("function");
		});

		it("should have createProductInvitationLink method", () => {
			expect(api.createProductInvitationLink).toBeDefined();
			expect(typeof api.createProductInvitationLink).toBe("function");
		});
	});

	describe("Private Products Management API", () => {
		it("should have getPrivateProducts method", () => {
			expect(api.getPrivateProducts).toBeDefined();
			expect(typeof api.getPrivateProducts).toBe("function");
		});

		it("should have createPrivateProduct method", () => {
			expect(api.createPrivateProduct).toBeDefined();
			expect(typeof api.createPrivateProduct).toBe("function");
		});

		it("should have updatePrivateProduct method", () => {
			expect(api.updatePrivateProduct).toBeDefined();
			expect(typeof api.updatePrivateProduct).toBe("function");
		});

		it("should have deletePrivateProduct method", () => {
			expect(api.deletePrivateProduct).toBeDefined();
			expect(typeof api.deletePrivateProduct).toBe("function");
		});
	});

	describe("Consumer Profile API", () => {
		it("should have getConsumerProfile method", () => {
			expect(api.getConsumerProfile).toBeDefined();
			expect(typeof api.getConsumerProfile).toBe("function");
		});
	});

	describe("Method Count Validation", () => {
		it("should have exactly 17 public methods (excluding constructor)", () => {
			const methods = Object.getOwnPropertyNames(
				Object.getPrototypeOf(api),
			).filter(
				(name) =>
					name !== "constructor" &&
					typeof api[name as keyof TrustpilotBusinessApi] === "function",
			);

			expect(methods).toHaveLength(17);
		});

		it("should have all expected methods", () => {
			const expectedMethods = [
				"getPrivateBusinessUnitReviews",
				"replyToReview",
				"deleteReviewReply",
				"addReviewTags",
				"setReviewTags",
				"removeReviewTags",
				"sendEmailInvitation",
				"createInvitationLink",
				"getInvitationTemplates",
				"getPrivateProductReviews",
				"getProductReviewSummaries",
				"createProductInvitationLink",
				"getPrivateProducts",
				"createPrivateProduct",
				"updatePrivateProduct",
				"deletePrivateProduct",
				"getConsumerProfile",
			];

			const actualMethods = Object.getOwnPropertyNames(
				Object.getPrototypeOf(api),
			).filter((name) => name !== "constructor");

			for (const method of expectedMethods) {
				expect(actualMethods).toContain(method);
			}
		});
	});
});
