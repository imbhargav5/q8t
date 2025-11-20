/**
 * API Integration Test Suite
 *
 * This test suite verifies that the generated API methods correctly call
 * the HTTP client with the expected paths, methods, and parameters.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { RestApi } from "../lib/rest/api";
import { BulkApi } from "../lib/bulk/api";
import { ToolingApi } from "../lib/tooling/api";
import type { HttpClient } from "../src/auth/client";
import type * as RestTypes from "../lib/rest/types";
import type * as BulkTypes from "../lib/bulk/types";
import type * as ToolingTypes from "../lib/tooling/types";

describe("REST API - HTTP Client Integration", () => {
	let api: RestApi;
	let mockClient: HttpClient;

	beforeEach(() => {
		mockClient = {
			get: vi.fn().mockResolvedValue({}),
			post: vi.fn().mockResolvedValue({}),
			put: vi.fn().mockResolvedValue({}),
			delete: vi.fn().mockResolvedValue({}),
			patch: vi.fn().mockResolvedValue({}),
		} as unknown as HttpClient;

		api = new RestApi(mockClient);
	});

	describe("Core Operations", () => {
		it("getLimits should GET from /limits", async () => {
			await api.getLimits();

			expect(mockClient.get).toHaveBeenCalledWith("/limits");
			expect(mockClient.get).toHaveBeenCalledTimes(1);
		});

		it("describeGlobal should GET from /sobjects", async () => {
			await api.describeGlobal();

			expect(mockClient.get).toHaveBeenCalledWith("/sobjects");
		});

		it("describeSObject should GET from /sobjects/:type/describe", async () => {
			await api.describeSObject("Account");

			expect(mockClient.get).toHaveBeenCalledWith(
				"/sobjects/Account/describe",
			);
		});
	});

	describe("sObject CRUD Operations", () => {
		it("getSObject should GET from /sobjects/:type/:id", async () => {
			await api.getSObject("Account", "001xx000003DGb0AAG");

			expect(mockClient.get).toHaveBeenCalledWith(
				"/sobjects/Account/001xx000003DGb0AAG",
				{
					fields: undefined,
				},
			);
		});

		it("getSObject should GET with fields parameter", async () => {
			await api.getSObject("Account", "001xx000003DGb0AAG", {
				fields: "Name,Industry",
			});

			expect(mockClient.get).toHaveBeenCalledWith(
				"/sobjects/Account/001xx000003DGb0AAG",
				{
					fields: "Name,Industry",
				},
			);
		});

		it("createSObject should POST to /sobjects/:type", async () => {
			const data = { Name: "Acme Corp", Industry: "Technology" };
			await api.createSObject("Account", data);

			expect(mockClient.post).toHaveBeenCalledWith("/sobjects/Account", data);
		});

		it("updateSObject should PATCH to /sobjects/:type/:id", async () => {
			const data = { Name: "Updated Name" };
			await api.updateSObject("Account", "001xx000003DGb0AAG", data);

			expect(mockClient.patch).toHaveBeenCalledWith(
				"/sobjects/Account/001xx000003DGb0AAG",
				data,
			);
		});

		it("deleteSObject should DELETE from /sobjects/:type/:id", async () => {
			await api.deleteSObject("Account", "001xx000003DGb0AAG");

			expect(mockClient.delete).toHaveBeenCalledWith(
				"/sobjects/Account/001xx000003DGb0AAG",
			);
		});
	});

	describe("Query Operations", () => {
		it("query should GET from /query with SOQL", async () => {
			await api.query({ q: "SELECT Id, Name FROM Account" });

			expect(mockClient.get).toHaveBeenCalledWith("/query", {
				q: "SELECT Id, Name FROM Account",
			});
		});

		it("queryMore should GET from /query/:locator", async () => {
			await api.queryMore("locator123");

			expect(mockClient.get).toHaveBeenCalledWith("/query/locator123");
		});

		it("search should GET from /search with SOSL", async () => {
			await api.search({ q: "FIND {Acme} IN NAME FIELDS" });

			expect(mockClient.get).toHaveBeenCalledWith("/search", {
				q: "FIND {Acme} IN NAME FIELDS",
			});
		});
	});

	describe("Composite Operations", () => {
		it("composite should POST to /composite", async () => {
			const request: RestTypes.CompositeRequest = {
				allOrNone: true,
				compositeRequest: [
					{
						method: "POST",
						url: "/services/data/v65.0/sobjects/Account",
						referenceId: "newAccount",
						body: { Name: "Test" },
					},
				],
			};

			await api.composite(request);

			expect(mockClient.post).toHaveBeenCalledWith("/composite", request);
		});

		it("compositeBatch should POST to /composite/batch", async () => {
			const request: RestTypes.CompositeBatchRequest = {
				batchRequests: [
					{
						method: "GET",
						url: "v65.0/sobjects/Account/describe",
					},
				],
			};

			await api.compositeBatch(request);

			expect(mockClient.post).toHaveBeenCalledWith("/composite/batch", request);
		});
	});
});

describe("Bulk API - HTTP Client Integration", () => {
	let api: BulkApi;
	let mockClient: HttpClient;

	beforeEach(() => {
		mockClient = {
			get: vi.fn().mockResolvedValue({}),
			post: vi.fn().mockResolvedValue({}),
			put: vi.fn().mockResolvedValue({}),
			delete: vi.fn().mockResolvedValue({}),
			patch: vi.fn().mockResolvedValue({}),
		} as unknown as HttpClient;

		api = new BulkApi(mockClient);
	});

	describe("Ingest Job Operations", () => {
		it("createIngestJob should POST to /jobs/ingest", async () => {
			const request: BulkTypes.CreateIngestJobRequest = {
				object: "Account",
				operation: "insert",
			};

			await api.createIngestJob(request);

			expect(mockClient.post).toHaveBeenCalledWith("/jobs/ingest", request);
		});

		it("getAllIngestJobs should GET from /jobs/ingest", async () => {
			await api.getAllIngestJobs();

			expect(mockClient.get).toHaveBeenCalledWith("/jobs/ingest", {
				isPkChunkingEnabled: undefined,
				jobType: undefined,
				queryLocator: undefined,
			});
		});

		it("getIngestJob should GET from /jobs/ingest/:jobId", async () => {
			await api.getIngestJob("job123");

			expect(mockClient.get).toHaveBeenCalledWith("/jobs/ingest/job123");
		});

		it("updateIngestJobState should PATCH to /jobs/ingest/:jobId", async () => {
			const request: BulkTypes.UpdateIngestJobStateRequest = {
				state: "UploadComplete",
			};

			await api.updateIngestJobState("job123", request);

			expect(mockClient.patch).toHaveBeenCalledWith(
				"/jobs/ingest/job123",
				request,
			);
		});

		it("uploadJobData should PUT to /jobs/ingest/:jobId/batches", async () => {
			const csvData = "Name,Industry\nAcme,Tech";

			await api.uploadJobData("job123", csvData);

			expect(mockClient.put).toHaveBeenCalledWith(
				"/jobs/ingest/job123/batches",
				csvData,
			);
		});
	});

	describe("Query Job Operations", () => {
		it("createQueryJob should POST to /jobs/query", async () => {
			const request: BulkTypes.CreateQueryJobRequest = {
				operation: "query",
				query: "SELECT Id, Name FROM Account",
			};

			await api.createQueryJob(request);

			expect(mockClient.post).toHaveBeenCalledWith("/jobs/query", request);
		});

		it("getQueryJob should GET from /jobs/query/:jobId", async () => {
			await api.getQueryJob("query123");

			expect(mockClient.get).toHaveBeenCalledWith("/jobs/query/query123");
		});

		it("getQueryResults should GET from /jobs/query/:jobId/results", async () => {
			await api.getQueryResults("query123");

			expect(mockClient.get).toHaveBeenCalledWith(
				"/jobs/query/query123/results",
				{
					locator: undefined,
					maxRecords: undefined,
				},
			);
		});
	});
});

describe("Tooling API - HTTP Client Integration", () => {
	let api: ToolingApi;
	let mockClient: HttpClient;

	beforeEach(() => {
		mockClient = {
			get: vi.fn().mockResolvedValue({}),
			post: vi.fn().mockResolvedValue({}),
			put: vi.fn().mockResolvedValue({}),
			delete: vi.fn().mockResolvedValue({}),
			patch: vi.fn().mockResolvedValue({}),
		} as unknown as HttpClient;

		api = new ToolingApi(mockClient);
	});

	describe("Query Operations", () => {
		it("toolingQuery should GET from /query", async () => {
			await api.toolingQuery({ q: "SELECT Id FROM ApexClass" });

			expect(mockClient.get).toHaveBeenCalledWith("/query", {
				q: "SELECT Id FROM ApexClass",
			});
		});
	});

	describe("sObject Operations", () => {
		it("getToolingSObject should GET from /sobjects/:type/:id", async () => {
			await api.getToolingSObject("ApexClass", "01pxx0000000001AAA");

			expect(mockClient.get).toHaveBeenCalledWith(
				"/sobjects/ApexClass/01pxx0000000001AAA",
			);
		});

		it("createToolingSObject should POST to /sobjects/:type", async () => {
			const data = { Name: "MyClass", Body: "public class MyClass {}" };

			await api.createToolingSObject("ApexClass", data);

			expect(mockClient.post).toHaveBeenCalledWith("/sobjects/ApexClass", data);
		});
	});

	describe("Development Tools", () => {
		it("executeAnonymous should GET from /executeAnonymous", async () => {
			await api.executeAnonymous({
				anonymousBody: 'System.debug("Hello");',
			});

			expect(mockClient.get).toHaveBeenCalledWith("/executeAnonymous", {
				anonymousBody: 'System.debug("Hello");',
			});
		});

		it("runTestsSynchronous should POST to /runTestsSynchronous", async () => {
			const request: ToolingTypes.RunTestsRequest = {
				tests: [{ classId: "01pxx0000000001AAA" }],
			};

			await api.runTestsSynchronous(request);

			expect(mockClient.post).toHaveBeenCalledWith(
				"/runTestsSynchronous",
				request,
			);
		});
	});
});
