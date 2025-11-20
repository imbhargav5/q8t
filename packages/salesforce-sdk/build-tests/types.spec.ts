/**
 * Types Test Suite
 *
 * This test suite verifies that all types defined in the OpenAPI specifications
 * are correctly generated and exported.
 */

import { describe, it, expect } from "vitest";
import * as RestTypes from "../lib/rest/types";
import * as BulkTypes from "../lib/bulk/types";
import * as ToolingTypes from "../lib/tooling/types";

describe("REST API Generated Types", () => {
	describe("Core Response Types", () => {
		it("should export QueryResult interface", () => {
			const result: RestTypes.QueryResult = {
				totalSize: 10,
				done: true,
				records: [],
			};

			expect(result.totalSize).toBe(10);
			expect(result.done).toBe(true);
			expect(Array.isArray(result.records)).toBe(true);
		});

		it("should export SObjectRecord interface", () => {
			const record: RestTypes.SObjectRecord = {
				Id: "001xx000003DGb0AAG",
				attributes: {
					type: "Account",
					url: "/services/data/v65.0/sobjects/Account/001xx000003DGb0AAG",
				},
			};

			expect(record.Id).toBe("001xx000003DGb0AAG");
			expect(record.attributes.type).toBe("Account");
		});

		it("should export CreateResponse interface", () => {
			const response: RestTypes.CreateResponse = {
				id: "001xx000003DGb0AAG",
				success: true,
				errors: [],
			};

			expect(response.id).toBeDefined();
			expect(response.success).toBe(true);
		});

		it("should export UpsertResponse interface", () => {
			const response: RestTypes.UpsertResponse = {
				id: "001xx000003DGb0AAG",
				success: true,
				created: false,
				errors: [],
			};

			expect(response.created).toBe(false);
			expect(response.success).toBe(true);
		});
	});

	describe("Describe Types", () => {
		it("should export GlobalDescribe interface", () => {
			const describe: RestTypes.GlobalDescribe = {
				encoding: "UTF-8",
				maxBatchSize: 200,
				sobjects: [],
			};

			expect(describe.encoding).toBe("UTF-8");
			expect(describe.maxBatchSize).toBe(200);
		});

		it("should export SObjectDescribe interface", () => {
			const describe: RestTypes.SObjectDescribe = {
				name: "Account",
				label: "Account",
				fields: [],
				recordTypeInfos: [],
				childRelationships: [],
			};

			expect(describe.name).toBe("Account");
			expect(Array.isArray(describe.fields)).toBe(true);
		});

		it("should export Field interface", () => {
			const field: RestTypes.Field = {
				name: "Name",
				label: "Account Name",
				type: "string",
				length: 255,
				updateable: true,
				createable: true,
				required: false,
			};

			expect(field.name).toBe("Name");
			expect(field.type).toBe("string");
		});
	});

	describe("Composite Request Types", () => {
		it("should export CompositeRequest interface", () => {
			const request: RestTypes.CompositeRequest = {
				allOrNone: true,
				compositeRequest: [],
			};

			expect(request.allOrNone).toBe(true);
			expect(Array.isArray(request.compositeRequest)).toBe(true);
		});

		it("should export CompositeBatchRequest interface", () => {
			const request: RestTypes.CompositeBatchRequest = {
				batchRequests: [],
			};

			expect(Array.isArray(request.batchRequests)).toBe(true);
		});
	});

	describe("Collection Types", () => {
		it("should export SaveResult interface", () => {
			const result: RestTypes.SaveResult = {
				id: "001xx000003DGb0AAG",
				success: true,
				errors: [],
			};

			expect(result.success).toBe(true);
		});

		it("should export DeleteResult interface", () => {
			const result: RestTypes.DeleteResult = {
				id: "001xx000003DGb0AAG",
				success: true,
				errors: [],
			};

			expect(result.success).toBe(true);
		});
	});
});

describe("Bulk API Generated Types", () => {
	describe("Ingest Job Types", () => {
		it("should export CreateIngestJobRequest interface", () => {
			const request: BulkTypes.CreateIngestJobRequest = {
				object: "Account",
				operation: "insert",
			};

			expect(request.object).toBe("Account");
			expect(request.operation).toBe("insert");
		});

		it("should export IngestJob interface", () => {
			const job: BulkTypes.IngestJob = {
				id: "job123",
				object: "Account",
				operation: "insert",
				state: "Open",
				createdDate: "2025-01-01T00:00:00Z",
				systemModstamp: "2025-01-01T00:00:00Z",
				createdById: "005xx000001X8UzAAK",
				numberRecordsProcessed: 0,
				numberRecordsFailed: 0,
				retries: 0,
				totalProcessingTime: 0,
				apiVersion: 65.0,
				contentType: "CSV",
			};

			expect(job.id).toBe("job123");
			expect(job.operation).toBe("insert");
		});

		it("should export IngestJobList interface", () => {
			const list: BulkTypes.IngestJobList = {
				done: true,
				records: [],
			};

			expect(list.done).toBe(true);
			expect(Array.isArray(list.records)).toBe(true);
		});

		it("should export UpdateIngestJobStateRequest interface", () => {
			const request: BulkTypes.UpdateIngestJobStateRequest = {
				state: "UploadComplete",
			};

			expect(request.state).toBe("UploadComplete");
		});
	});

	describe("Query Job Types", () => {
		it("should export CreateQueryJobRequest interface", () => {
			const request: BulkTypes.CreateQueryJobRequest = {
				operation: "query",
				query: "SELECT Id FROM Account",
			};

			expect(request.operation).toBe("query");
			expect(request.query).toBeDefined();
		});

		it("should export QueryJob interface", () => {
			const job: BulkTypes.QueryJob = {
				id: "query123",
				operation: "query",
				object: "Account",
				createdById: "005xx000001X8UzAAK",
				createdDate: "2025-01-01T00:00:00Z",
				systemModstamp: "2025-01-01T00:00:00Z",
				state: "JobComplete",
				query: "SELECT Id FROM Account",
				numberRecordsProcessed: 100,
				retries: 0,
				totalProcessingTime: 1000,
				apiVersion: 65.0,
				contentType: "CSV",
			};

			expect(job.id).toBe("query123");
			expect(job.operation).toBe("query");
		});

		it("should export AbortJobRequest interface", () => {
			const request: BulkTypes.AbortJobRequest = {
				state: "Aborted",
			};

			expect(request.state).toBe("Aborted");
		});
	});

	describe("Job State Enum Values", () => {
		it("should support all IngestJob state values", () => {
			const states: Array<BulkTypes.IngestJob["state"]> = [
				"Open",
				"UploadComplete",
				"InProgress",
				"Aborted",
				"JobComplete",
				"Failed",
			];

			expect(states).toHaveLength(6);
		});

		it("should support all operation types", () => {
			const operations: Array<BulkTypes.CreateIngestJobRequest["operation"]> = [
				"insert",
				"update",
				"upsert",
				"delete",
				"hardDelete",
			];

			expect(operations).toHaveLength(5);
		});
	});
});

describe("Tooling API Generated Types", () => {
	describe("Query Types", () => {
		it("should export QueryResult interface", () => {
			const result: ToolingTypes.QueryResult = {
				totalSize: 5,
				done: true,
				records: [],
			};

			expect(result.totalSize).toBe(5);
			expect(result.done).toBe(true);
		});

		it("should export ToolingSObjectRecord interface", () => {
			const record: ToolingTypes.ToolingSObjectRecord = {
				Id: "01pxx0000000001AAA",
				attributes: {},
			};

			expect(record.Id).toBeDefined();
		});
	});

	describe("Development Tool Types", () => {
		it("should export ExecuteAnonymousResult interface", () => {
			const result: ToolingTypes.ExecuteAnonymousResult = {
				compiled: true,
				success: true,
				line: -1,
				column: -1,
			};

			expect(result.compiled).toBe(true);
			expect(result.success).toBe(true);
		});

		it("should export RunTestsRequest interface", () => {
			const request: ToolingTypes.RunTestsRequest = {
				tests: [
					{
						classId: "01pxx0000000001AAA",
						testMethods: ["testMethod1", "testMethod2"],
					},
				],
			};

			expect(Array.isArray(request.tests)).toBe(true);
			expect(request.tests?.[0].classId).toBeDefined();
		});

		it("should export RunTestsResult interface", () => {
			const result: ToolingTypes.RunTestsResult = {
				numFailures: 0,
				numTestsRun: 10,
				successes: [],
				failures: [],
				codeCoverage: [],
			};

			expect(result.numTestsRun).toBe(10);
			expect(result.numFailures).toBe(0);
		});
	});

	describe("Response Types", () => {
		it("should export CreateResponse interface", () => {
			const response: ToolingTypes.CreateResponse = {
				id: "01pxx0000000001AAA",
				success: true,
				errors: [],
			};

			expect(response.id).toBeDefined();
			expect(response.success).toBe(true);
		});

		it("should export SuccessResponse interface", () => {
			const response: ToolingTypes.SuccessResponse = {
				success: true,
			};

			expect(response.success).toBe(true);
		});
	});
});

describe("Type Exports", () => {
	it("should export all REST API types", () => {
		expect(RestTypes).toBeDefined();
		expect(typeof RestTypes).toBe("object");
	});

	it("should export all Bulk API types", () => {
		expect(BulkTypes).toBeDefined();
		expect(typeof BulkTypes).toBe("object");
	});

	it("should export all Tooling API types", () => {
		expect(ToolingTypes).toBeDefined();
		expect(typeof ToolingTypes).toBe("object");
	});
});
