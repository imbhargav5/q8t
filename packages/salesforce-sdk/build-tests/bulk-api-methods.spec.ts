/**
 * Bulk API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the Bulk API 2.0 OpenAPI specification
 * are present in the generated BulkApi class.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { BulkApi } from "../lib/bulk/api";
import type { HttpClient } from "../src/auth/client";

describe("BulkApi - Method Existence", () => {
	let api: BulkApi;
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

		api = new BulkApi(mockClient);
	});

	describe("Ingest Job Operations", () => {
		it("should have createIngestJob method", () => {
			expect(api.createIngestJob).toBeDefined();
			expect(typeof api.createIngestJob).toBe("function");
		});

		it("should have getAllIngestJobs method", () => {
			expect(api.getAllIngestJobs).toBeDefined();
			expect(typeof api.getAllIngestJobs).toBe("function");
		});

		it("should have getIngestJob method", () => {
			expect(api.getIngestJob).toBeDefined();
			expect(typeof api.getIngestJob).toBe("function");
		});

		it("should have updateIngestJobState method", () => {
			expect(api.updateIngestJobState).toBeDefined();
			expect(typeof api.updateIngestJobState).toBe("function");
		});

		it("should have deleteIngestJob method", () => {
			expect(api.deleteIngestJob).toBeDefined();
			expect(typeof api.deleteIngestJob).toBe("function");
		});

		it("should have uploadJobData method", () => {
			expect(api.uploadJobData).toBeDefined();
			expect(typeof api.uploadJobData).toBe("function");
		});

		it("should have getSuccessfulResults method", () => {
			expect(api.getSuccessfulResults).toBeDefined();
			expect(typeof api.getSuccessfulResults).toBe("function");
		});

		it("should have getFailedResults method", () => {
			expect(api.getFailedResults).toBeDefined();
			expect(typeof api.getFailedResults).toBe("function");
		});

		it("should have getUnprocessedRecords method", () => {
			expect(api.getUnprocessedRecords).toBeDefined();
			expect(typeof api.getUnprocessedRecords).toBe("function");
		});
	});

	describe("Query Job Operations", () => {
		it("should have createQueryJob method", () => {
			expect(api.createQueryJob).toBeDefined();
			expect(typeof api.createQueryJob).toBe("function");
		});

		it("should have getAllQueryJobs method", () => {
			expect(api.getAllQueryJobs).toBeDefined();
			expect(typeof api.getAllQueryJobs).toBe("function");
		});

		it("should have getQueryJob method", () => {
			expect(api.getQueryJob).toBeDefined();
			expect(typeof api.getQueryJob).toBe("function");
		});

		it("should have abortQueryJob method", () => {
			expect(api.abortQueryJob).toBeDefined();
			expect(typeof api.abortQueryJob).toBe("function");
		});

		it("should have deleteQueryJob method", () => {
			expect(api.deleteQueryJob).toBeDefined();
			expect(typeof api.deleteQueryJob).toBe("function");
		});

		it("should have getQueryResults method", () => {
			expect(api.getQueryResults).toBeDefined();
			expect(typeof api.getQueryResults).toBe("function");
		});
	});

	describe("Method Count Validation", () => {
		it("should have exactly 15 public methods (excluding constructor)", () => {
			const methods = Object.getOwnPropertyNames(
				Object.getPrototypeOf(api),
			).filter(
				(name) =>
					name !== "constructor" &&
					typeof api[name as keyof BulkApi] === "function",
			);

			expect(methods).toHaveLength(15);
		});

		it("should have all expected Bulk API methods", () => {
			const expectedMethods = [
				"createIngestJob",
				"getAllIngestJobs",
				"getIngestJob",
				"updateIngestJobState",
				"deleteIngestJob",
				"uploadJobData",
				"getSuccessfulResults",
				"getFailedResults",
				"getUnprocessedRecords",
				"createQueryJob",
				"getAllQueryJobs",
				"getQueryJob",
				"abortQueryJob",
				"deleteQueryJob",
				"getQueryResults",
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
