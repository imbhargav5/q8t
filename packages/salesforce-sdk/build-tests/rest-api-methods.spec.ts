/**
 * REST API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the REST API OpenAPI specification
 * are present in the generated RestApi class.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { RestApi } from "../lib/rest/api";
import type { HttpClient } from "../src/auth/client";

describe("RestApi - Method Existence", () => {
	let api: RestApi;
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

		api = new RestApi(mockClient);
	});

	describe("Core Operations", () => {
		it("should have getResources method", () => {
			expect(api.getResources).toBeDefined();
			expect(typeof api.getResources).toBe("function");
		});

		it("should have getLimits method", () => {
			expect(api.getLimits).toBeDefined();
			expect(typeof api.getLimits).toBe("function");
		});

		it("should have describeGlobal method", () => {
			expect(api.describeGlobal).toBeDefined();
			expect(typeof api.describeGlobal).toBe("function");
		});

		it("should have describeSObject method", () => {
			expect(api.describeSObject).toBeDefined();
			expect(typeof api.describeSObject).toBe("function");
		});
	});

	describe("sObject CRUD Operations", () => {
		it("should have getSObject method", () => {
			expect(api.getSObject).toBeDefined();
			expect(typeof api.getSObject).toBe("function");
		});

		it("should have createSObject method", () => {
			expect(api.createSObject).toBeDefined();
			expect(typeof api.createSObject).toBe("function");
		});

		it("should have updateSObject method", () => {
			expect(api.updateSObject).toBeDefined();
			expect(typeof api.updateSObject).toBe("function");
		});

		it("should have deleteSObject method", () => {
			expect(api.deleteSObject).toBeDefined();
			expect(typeof api.deleteSObject).toBe("function");
		});

		it("should have getSObjectByExternalId method", () => {
			expect(api.getSObjectByExternalId).toBeDefined();
			expect(typeof api.getSObjectByExternalId).toBe("function");
		});

		it("should have upsertSObject method", () => {
			expect(api.upsertSObject).toBeDefined();
			expect(typeof api.upsertSObject).toBe("function");
		});
	});

	describe("Query & Search Operations", () => {
		it("should have query method", () => {
			expect(api.query).toBeDefined();
			expect(typeof api.query).toBe("function");
		});

		it("should have queryMore method", () => {
			expect(api.queryMore).toBeDefined();
			expect(typeof api.queryMore).toBe("function");
		});

		it("should have queryAll method", () => {
			expect(api.queryAll).toBeDefined();
			expect(typeof api.queryAll).toBe("function");
		});

		it("should have search method", () => {
			expect(api.search).toBeDefined();
			expect(typeof api.search).toBe("function");
		});

		it("should have parameterizedSearch method", () => {
			expect(api.parameterizedSearch).toBeDefined();
			expect(typeof api.parameterizedSearch).toBe("function");
		});
	});

	describe("Composite Operations", () => {
		it("should have composite method", () => {
			expect(api.composite).toBeDefined();
			expect(typeof api.composite).toBe("function");
		});

		it("should have compositeBatch method", () => {
			expect(api.compositeBatch).toBeDefined();
			expect(typeof api.compositeBatch).toBe("function");
		});

		it("should have compositeGraph method", () => {
			expect(api.compositeGraph).toBeDefined();
			expect(typeof api.compositeGraph).toBe("function");
		});

		it("should have compositeTree method", () => {
			expect(api.compositeTree).toBeDefined();
			expect(typeof api.compositeTree).toBe("function");
		});
	});

	describe("sObject Collection Operations", () => {
		it("should have getSObjectCollection method", () => {
			expect(api.getSObjectCollection).toBeDefined();
			expect(typeof api.getSObjectCollection).toBe("function");
		});

		it("should have createSObjectCollection method", () => {
			expect(api.createSObjectCollection).toBeDefined();
			expect(typeof api.createSObjectCollection).toBe("function");
		});

		it("should have updateSObjectCollection method", () => {
			expect(api.updateSObjectCollection).toBeDefined();
			expect(typeof api.updateSObjectCollection).toBe("function");
		});

		it("should have deleteSObjectCollection method", () => {
			expect(api.deleteSObjectCollection).toBeDefined();
			expect(typeof api.deleteSObjectCollection).toBe("function");
		});

		it("should have upsertSObjectCollection method", () => {
			expect(api.upsertSObjectCollection).toBeDefined();
			expect(typeof api.upsertSObjectCollection).toBe("function");
		});
	});

	describe("Utility Operations", () => {
		it("should have getRecentItems method", () => {
			expect(api.getRecentItems).toBeDefined();
			expect(typeof api.getRecentItems).toBe("function");
		});
	});

	describe("Method Count Validation", () => {
		it("should have exactly 25 public methods (excluding constructor)", () => {
			const methods = Object.getOwnPropertyNames(
				Object.getPrototypeOf(api),
			).filter(
				(name) =>
					name !== "constructor" &&
					typeof api[name as keyof RestApi] === "function",
			);

			expect(methods).toHaveLength(25);
		});

		it("should have all expected REST API methods", () => {
			const expectedMethods = [
				"getResources",
				"getLimits",
				"describeGlobal",
				"describeSObject",
				"getSObject",
				"createSObject",
				"updateSObject",
				"deleteSObject",
				"getSObjectByExternalId",
				"upsertSObject",
				"query",
				"queryMore",
				"queryAll",
				"search",
				"composite",
				"compositeBatch",
				"compositeGraph",
				"getSObjectCollection",
				"createSObjectCollection",
				"updateSObjectCollection",
				"deleteSObjectCollection",
				"upsertSObjectCollection",
				"compositeTree",
				"getRecentItems",
				"parameterizedSearch",
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
