/**
 * OpenAPI Specification Validation Test Suite
 *
 * This test suite validates that the OpenAPI specifications are well-formed
 * and contain all expected components.
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

describe("Trustpilot OpenAPI Specifications", () => {
	describe("Public API Specification", () => {
		const specPath = join(__dirname, "..", "api", "public-api.yaml");
		const specContent = readFileSync(specPath, "utf-8");
		const spec = parse(specContent);

		it("should have valid OpenAPI version", () => {
			expect(spec.openapi).toBe("3.0.3");
		});

		it("should have info section with title and version", () => {
			expect(spec.info).toBeDefined();
			expect(spec.info.title).toBe("Trustpilot Public API");
			expect(spec.info.version).toBe("v1");
		});

		it("should have servers defined", () => {
			expect(spec.servers).toBeDefined();
			expect(Array.isArray(spec.servers)).toBe(true);
			expect(spec.servers.length).toBeGreaterThan(0);
		});

		it("should have paths defined", () => {
			expect(spec.paths).toBeDefined();
			expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
		});

		it("should have components with schemas", () => {
			expect(spec.components).toBeDefined();
			expect(spec.components.schemas).toBeDefined();
			expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
		});

		it("should have security schemes defined", () => {
			expect(spec.components.securitySchemes).toBeDefined();
			expect(spec.components.securitySchemes.ApiKeyAuth).toBeDefined();
		});

		it("should have all expected paths for business units", () => {
			expect(spec.paths["/business-units/{businessUnitId}"]).toBeDefined();
			expect(spec.paths["/business-units/find"]).toBeDefined();
			expect(spec.paths["/business-units/search"]).toBeDefined();
			expect(
				spec.paths["/business-units/{businessUnitId}/reviews"],
			).toBeDefined();
		});

		it("should have all expected paths for categories", () => {
			expect(spec.paths["/categories"]).toBeDefined();
			expect(spec.paths["/categories/{categoryId}"]).toBeDefined();
			expect(
				spec.paths["/categories/{categoryId}/business-units"],
			).toBeDefined();
		});

		it("should have all expected paths for resources", () => {
			expect(spec.paths["/resources/metadata/locales"]).toBeDefined();
			expect(spec.paths["/resources/metadata/countries"]).toBeDefined();
			expect(spec.paths["/resources/images"]).toBeDefined();
			expect(spec.paths["/resources/strings/stars/{stars}"]).toBeDefined();
		});

		it("should have operationIds for all operations", () => {
			for (const [path, pathItem] of Object.entries(spec.paths)) {
				for (const [method, operation] of Object.entries(pathItem)) {
					if (["get", "post", "put", "delete", "patch"].includes(method)) {
						expect(operation.operationId).toBeDefined();
						expect(typeof operation.operationId).toBe("string");
					}
				}
			}
		});
	});

	describe("Business API Specification", () => {
		const specPath = join(__dirname, "..", "api", "business-api.yaml");
		const specContent = readFileSync(specPath, "utf-8");
		const spec = parse(specContent);

		it("should have valid OpenAPI version", () => {
			expect(spec.openapi).toBe("3.0.3");
		});

		it("should have info section with title and version", () => {
			expect(spec.info).toBeDefined();
			expect(spec.info.title).toBe("Trustpilot Business API");
			expect(spec.info.version).toBe("v1");
		});

		it("should have servers defined", () => {
			expect(spec.servers).toBeDefined();
			expect(Array.isArray(spec.servers)).toBe(true);
			expect(spec.servers.length).toBeGreaterThan(0);
		});

		it("should have paths defined", () => {
			expect(spec.paths).toBeDefined();
			expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
		});

		it("should have components with schemas", () => {
			expect(spec.components).toBeDefined();
			expect(spec.components.schemas).toBeDefined();
			expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
		});

		it("should have OAuth2 security schemes defined", () => {
			expect(spec.components.securitySchemes).toBeDefined();
			expect(spec.components.securitySchemes.OAuth2).toBeDefined();
			expect(spec.components.securitySchemes.OAuth2.type).toBe("oauth2");
		});

		it("should have all expected paths for private reviews", () => {
			expect(
				spec.paths["/private/business-units/{businessUnitId}/reviews"],
			).toBeDefined();
			expect(spec.paths["/private/reviews/{reviewId}/reply"]).toBeDefined();
			expect(spec.paths["/private/reviews/{reviewId}/tags"]).toBeDefined();
		});

		it("should have all expected paths for invitations", () => {
			expect(
				spec.paths[
					"/private/business-units/{businessUnitId}/email-invitations"
				],
			).toBeDefined();
			expect(
				spec.paths[
					"/private/business-units/{businessUnitId}/invitation-links"
				],
			).toBeDefined();
			expect(
				spec.paths["/private/business-units/{businessUnitId}/templates"],
			).toBeDefined();
		});

		it("should have all expected paths for private products", () => {
			expect(
				spec.paths["/private/business-units/{businessUnitId}/products"],
			).toBeDefined();
			expect(
				spec.paths[
					"/private/business-units/{businessUnitId}/products/{productId}"
				],
			).toBeDefined();
		});

		it("should have all expected paths for product reviews", () => {
			expect(
				spec.paths[
					"/private/product-reviews/business-units/{businessUnitId}/reviews"
				],
			).toBeDefined();
			expect(
				spec.paths[
					"/private/product-reviews/business-units/{businessUnitId}/summaries"
				],
			).toBeDefined();
		});

		it("should have operationIds for all operations", () => {
			for (const [path, pathItem] of Object.entries(spec.paths)) {
				for (const [method, operation] of Object.entries(pathItem)) {
					if (["get", "post", "put", "delete", "patch"].includes(method)) {
						expect(operation.operationId).toBeDefined();
						expect(typeof operation.operationId).toBe("string");
					}
				}
			}
		});
	});

	describe("Specification Consistency", () => {
		const publicSpecPath = join(__dirname, "..", "api", "public-api.yaml");
		const businessSpecPath = join(__dirname, "..", "api", "business-api.yaml");
		const publicSpec = parse(readFileSync(publicSpecPath, "utf-8"));
		const businessSpec = parse(readFileSync(businessSpecPath, "utf-8"));

		it("should have unique operation IDs across both specs", () => {
			const publicOperationIds = new Set<string>();
			const businessOperationIds = new Set<string>();

			for (const pathItem of Object.values(publicSpec.paths)) {
				for (const [method, operation] of Object.entries(pathItem)) {
					if (["get", "post", "put", "delete", "patch"].includes(method)) {
						publicOperationIds.add(operation.operationId);
					}
				}
			}

			for (const pathItem of Object.values(businessSpec.paths)) {
				for (const [method, operation] of Object.entries(pathItem)) {
					if (["get", "post", "put", "delete", "patch"].includes(method)) {
						businessOperationIds.add(operation.operationId);
					}
				}
			}

			expect(publicOperationIds.size).toBe(16);
			expect(businessOperationIds.size).toBe(17);

			// Check for no overlapping operation IDs
			for (const id of publicOperationIds) {
				expect(businessOperationIds.has(id)).toBe(false);
			}
		});

		it("should have proper schema definitions for common types", () => {
			// Public API schemas
			expect(publicSpec.components.schemas.BusinessUnit).toBeDefined();
			expect(publicSpec.components.schemas.Review).toBeDefined();
			expect(publicSpec.components.schemas.Consumer).toBeDefined();
			expect(publicSpec.components.schemas.Category).toBeDefined();

			// Business API schemas
			expect(businessSpec.components.schemas.PrivateReview).toBeDefined();
			expect(businessSpec.components.schemas.EmailInvitation).toBeDefined();
			expect(businessSpec.components.schemas.PrivateProduct).toBeDefined();
		});
	});
});
