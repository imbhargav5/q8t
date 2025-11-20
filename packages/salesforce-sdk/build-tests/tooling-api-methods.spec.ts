/**
 * Tooling API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the Tooling API OpenAPI specification
 * are present in the generated ToolingApi class.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { ToolingApi } from "../lib/tooling/api";
import type { HttpClient } from "../src/auth/client";

describe("ToolingApi - Method Existence", () => {
	let api: ToolingApi;
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

		api = new ToolingApi(mockClient);
	});

	describe("Query Operations", () => {
		it("should have toolingQuery method", () => {
			expect(api.toolingQuery).toBeDefined();
			expect(typeof api.toolingQuery).toBe("function");
		});
	});

	describe("sObject CRUD Operations", () => {
		it("should have getToolingSObject method", () => {
			expect(api.getToolingSObject).toBeDefined();
			expect(typeof api.getToolingSObject).toBe("function");
		});

		it("should have createToolingSObject method", () => {
			expect(api.createToolingSObject).toBeDefined();
			expect(typeof api.createToolingSObject).toBe("function");
		});

		it("should have updateToolingSObject method", () => {
			expect(api.updateToolingSObject).toBeDefined();
			expect(typeof api.updateToolingSObject).toBe("function");
		});

		it("should have deleteToolingSObject method", () => {
			expect(api.deleteToolingSObject).toBeDefined();
			expect(typeof api.deleteToolingSObject).toBe("function");
		});
	});

	describe("Development Tools Operations", () => {
		it("should have executeAnonymous method", () => {
			expect(api.executeAnonymous).toBeDefined();
			expect(typeof api.executeAnonymous).toBe("function");
		});

		it("should have runTestsAsynchronous method", () => {
			expect(api.runTestsAsynchronous).toBeDefined();
			expect(typeof api.runTestsAsynchronous).toBe("function");
		});

		it("should have runTestsSynchronous method", () => {
			expect(api.runTestsSynchronous).toBeDefined();
			expect(typeof api.runTestsSynchronous).toBe("function");
		});

		it("should have getCompletions method", () => {
			expect(api.getCompletions).toBeDefined();
			expect(typeof api.getCompletions).toBe("function");
		});
	});

	describe("Method Count Validation", () => {
		it("should have exactly 9 public methods (excluding constructor)", () => {
			const methods = Object.getOwnPropertyNames(
				Object.getPrototypeOf(api),
			).filter(
				(name) =>
					name !== "constructor" &&
					typeof api[name as keyof ToolingApi] === "function",
			);

			expect(methods).toHaveLength(9);
		});

		it("should have all expected Tooling API methods", () => {
			const expectedMethods = [
				"toolingQuery",
				"getToolingSObject",
				"createToolingSObject",
				"updateToolingSObject",
				"deleteToolingSObject",
				"executeAnonymous",
				"runTestsAsynchronous",
				"runTestsSynchronous",
				"getCompletions",
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
