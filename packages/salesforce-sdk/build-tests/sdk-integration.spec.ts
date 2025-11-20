/**
 * SDK Integration Test Suite
 *
 * This test suite verifies the main SDK class integrates all API clients correctly
 * and provides the expected factory methods.
 */

import { describe, it, expect } from "vitest";
import {
	SalesforceSDK,
	createWithAccessToken,
	createWithSessionId,
} from "../src/index";
import { RestApi } from "../lib/rest/api";
import { BulkApi } from "../lib/bulk/api";
import { ToolingApi } from "../lib/tooling/api";

describe("SalesforceSDK - Main SDK Class", () => {
	describe("Constructor", () => {
		it("should create SDK instance with access token", () => {
			const sdk = new SalesforceSDK({
				instanceUrl: "https://test.my.salesforce.com",
				accessToken: "test-token",
			});

			expect(sdk).toBeInstanceOf(SalesforceSDK);
		});

		it("should create SDK instance with API version", () => {
			const sdk = new SalesforceSDK({
				instanceUrl: "https://test.my.salesforce.com",
				accessToken: "test-token",
				apiVersion: "65.0",
			});

			expect(sdk).toBeInstanceOf(SalesforceSDK);
		});
	});

	describe("API Client Access", () => {
		let sdk: SalesforceSDK;

		beforeEach(() => {
			sdk = new SalesforceSDK({
				instanceUrl: "https://test.my.salesforce.com",
				accessToken: "test-token",
			});
		});

		it("should provide access to REST API client", () => {
			const restApi = sdk.rest();

			expect(restApi).toBeInstanceOf(RestApi);
			expect(restApi).toBeDefined();
		});

		it("should provide access to Bulk API client", () => {
			const bulkApi = sdk.bulk();

			expect(bulkApi).toBeInstanceOf(BulkApi);
			expect(bulkApi).toBeDefined();
		});

		it("should provide access to Tooling API client", () => {
			const toolingApi = sdk.tooling();

			expect(toolingApi).toBeInstanceOf(ToolingApi);
			expect(toolingApi).toBeDefined();
		});

		it("should provide access to HTTP client", () => {
			const httpClient = sdk.getHttpClient();

			expect(httpClient).toBeDefined();
			expect(httpClient.get).toBeDefined();
			expect(httpClient.post).toBeDefined();
			expect(httpClient.put).toBeDefined();
			expect(httpClient.patch).toBeDefined();
			expect(httpClient.delete).toBeDefined();
		});

		it("should return same REST API instance on multiple calls", () => {
			const restApi1 = sdk.rest();
			const restApi2 = sdk.rest();

			expect(restApi1).toBe(restApi2);
		});

		it("should return same Bulk API instance on multiple calls", () => {
			const bulkApi1 = sdk.bulk();
			const bulkApi2 = sdk.bulk();

			expect(bulkApi1).toBe(bulkApi2);
		});
	});
});

describe("SDK Factory Methods", () => {
	describe("createWithAccessToken", () => {
		it("should create SDK instance", () => {
			const sdk = createWithAccessToken(
				"https://test.my.salesforce.com",
				"test-token",
			);

			expect(sdk).toBeInstanceOf(SalesforceSDK);
		});

		it("should create SDK with API version", () => {
			const sdk = createWithAccessToken(
				"https://test.my.salesforce.com",
				"test-token",
				"65.0",
			);

			expect(sdk).toBeInstanceOf(SalesforceSDK);
		});

		it("should create SDK with working REST API", () => {
			const sdk = createWithAccessToken(
				"https://test.my.salesforce.com",
				"test-token",
			);

			const restApi = sdk.rest();
			expect(restApi).toBeInstanceOf(RestApi);
			expect(restApi.query).toBeDefined();
		});

		it("should create SDK with working Bulk API", () => {
			const sdk = createWithAccessToken(
				"https://test.my.salesforce.com",
				"test-token",
			);

			const bulkApi = sdk.bulk();
			expect(bulkApi).toBeInstanceOf(BulkApi);
			expect(bulkApi.createIngestJob).toBeDefined();
		});
	});

	describe("createWithSessionId", () => {
		it("should create SDK instance", () => {
			const sdk = createWithSessionId({
				instanceUrl: "https://test.my.salesforce.com",
				sessionId: "session-id-123",
			});

			expect(sdk).toBeInstanceOf(SalesforceSDK);
		});

		it("should create SDK with API version", () => {
			const sdk = createWithSessionId({
				instanceUrl: "https://test.my.salesforce.com",
				sessionId: "session-id-123",
				apiVersion: "65.0",
			});

			expect(sdk).toBeInstanceOf(SalesforceSDK);
		});
	});
});

describe("SDK Module Exports", () => {
	it("should export SalesforceSDK class", () => {
		expect(SalesforceSDK).toBeDefined();
		expect(typeof SalesforceSDK).toBe("function");
	});

	it("should export createWithAccessToken function", () => {
		expect(createWithAccessToken).toBeDefined();
		expect(typeof createWithAccessToken).toBe("function");
	});

	it("should export createWithSessionId function", () => {
		expect(createWithSessionId).toBeDefined();
		expect(typeof createWithSessionId).toBe("function");
	});

	it("should export createWithJWT function", async () => {
		const { createWithJWT } = await import("../src/index");
		expect(createWithJWT).toBeDefined();
		expect(typeof createWithJWT).toBe("function");
	});

	it("should export createWithUsernamePassword function", async () => {
		const { createWithUsernamePassword } = await import("../src/index");
		expect(createWithUsernamePassword).toBeDefined();
		expect(typeof createWithUsernamePassword).toBe("function");
	});

	it("should export RestTypes namespace", async () => {
		const { RestTypes } = await import("../src/index");
		expect(RestTypes).toBeDefined();
		expect(typeof RestTypes).toBe("object");
	});

	it("should export BulkTypes namespace", async () => {
		const { BulkTypes } = await import("../src/index");
		expect(BulkTypes).toBeDefined();
		expect(typeof BulkTypes).toBe("object");
	});

	it("should export ToolingTypes namespace", async () => {
		const { ToolingTypes } = await import("../src/index");
		expect(ToolingTypes).toBeDefined();
		expect(typeof ToolingTypes).toBe("object");
	});
});

describe("SDK Complete API Surface", () => {
	it("should have all expected methods across all APIs", () => {
		const sdk = createWithAccessToken(
			"https://test.my.salesforce.com",
			"test-token",
		);

		// REST API methods (sample)
		expect(sdk.rest().query).toBeDefined();
		expect(sdk.rest().createSObject).toBeDefined();
		expect(sdk.rest().updateSObject).toBeDefined();
		expect(sdk.rest().deleteSObject).toBeDefined();
		expect(sdk.rest().composite).toBeDefined();

		// Bulk API methods (sample)
		expect(sdk.bulk().createIngestJob).toBeDefined();
		expect(sdk.bulk().getAllIngestJobs).toBeDefined();
		expect(sdk.bulk().createQueryJob).toBeDefined();
		expect(sdk.bulk().getQueryResults).toBeDefined();

		// Tooling API methods (sample)
		expect(sdk.tooling().toolingQuery).toBeDefined();
		expect(sdk.tooling().executeAnonymous).toBeDefined();
		expect(sdk.tooling().runTestsSynchronous).toBeDefined();
	});
});
