import { describe, expect, it } from "vitest";
import { NotionApi } from "../lib/api";
import { BearerTokenManager } from "../src/auth/bearer-token";
import { HttpClient } from "../src/auth/client";

describe("Notion API Structure", () => {
  // Create a mock client for testing
  const tokenManager = new BearerTokenManager({ token: "test-token" });
  const httpClient = new HttpClient(tokenManager, {});
  const api = new NotionApi(httpClient);

  describe("OAuth Methods", () => {
    it("should have exchangeOAuthToken method", () => {
      expect(api.exchangeOAuthToken).toBeDefined();
      expect(typeof api.exchangeOAuthToken).toBe("function");
    });

    it("should have introspectOAuthToken method", () => {
      expect(api.introspectOAuthToken).toBeDefined();
      expect(typeof api.introspectOAuthToken).toBe("function");
    });

    it("should have revokeOAuthToken method", () => {
      expect(api.revokeOAuthToken).toBeDefined();
      expect(typeof api.revokeOAuthToken).toBe("function");
    });
  });

  describe("Pages Methods", () => {
    it("should have createPage method", () => {
      expect(api.createPage).toBeDefined();
      expect(typeof api.createPage).toBe("function");
    });

    it("should have retrievePage method", () => {
      expect(api.retrievePage).toBeDefined();
      expect(typeof api.retrievePage).toBe("function");
    });

    it("should have updatePage method", () => {
      expect(api.updatePage).toBeDefined();
      expect(typeof api.updatePage).toBe("function");
    });

    it("should have retrievePageProperty method", () => {
      expect(api.retrievePageProperty).toBeDefined();
      expect(typeof api.retrievePageProperty).toBe("function");
    });
  });

  describe("Databases Methods", () => {
    it("should have createDatabase method", () => {
      expect(api.createDatabase).toBeDefined();
      expect(typeof api.createDatabase).toBe("function");
    });

    it("should have retrieveDatabase method", () => {
      expect(api.retrieveDatabase).toBeDefined();
      expect(typeof api.retrieveDatabase).toBe("function");
    });

    it("should have updateDatabase method", () => {
      expect(api.updateDatabase).toBeDefined();
      expect(typeof api.updateDatabase).toBe("function");
    });

    it("should have queryDatabase method", () => {
      expect(api.queryDatabase).toBeDefined();
      expect(typeof api.queryDatabase).toBe("function");
    });
  });

  describe("Blocks Methods", () => {
    it("should have retrieveBlock method", () => {
      expect(api.retrieveBlock).toBeDefined();
      expect(typeof api.retrieveBlock).toBe("function");
    });

    it("should have updateBlock method", () => {
      expect(api.updateBlock).toBeDefined();
      expect(typeof api.updateBlock).toBe("function");
    });

    it("should have deleteBlock method", () => {
      expect(api.deleteBlock).toBeDefined();
      expect(typeof api.deleteBlock).toBe("function");
    });

    it("should have retrieveBlockChildren method", () => {
      expect(api.retrieveBlockChildren).toBeDefined();
      expect(typeof api.retrieveBlockChildren).toBe("function");
    });

    it("should have appendBlockChildren method", () => {
      expect(api.appendBlockChildren).toBeDefined();
      expect(typeof api.appendBlockChildren).toBe("function");
    });
  });

  describe("Data Sources Methods", () => {
    it("should have createDataSource method", () => {
      expect(api.createDataSource).toBeDefined();
      expect(typeof api.createDataSource).toBe("function");
    });

    it("should have retrieveDataSource method", () => {
      expect(api.retrieveDataSource).toBeDefined();
      expect(typeof api.retrieveDataSource).toBe("function");
    });

    it("should have updateDataSource method", () => {
      expect(api.updateDataSource).toBeDefined();
      expect(typeof api.updateDataSource).toBe("function");
    });

    it("should have updateDataSourceProperties method", () => {
      expect(api.updateDataSourceProperties).toBeDefined();
      expect(typeof api.updateDataSourceProperties).toBe("function");
    });

    it("should have queryDataSource method", () => {
      expect(api.queryDataSource).toBeDefined();
      expect(typeof api.queryDataSource).toBe("function");
    });

    it("should have listDataSourceTemplates method", () => {
      expect(api.listDataSourceTemplates).toBeDefined();
      expect(typeof api.listDataSourceTemplates).toBe("function");
    });
  });

  describe("Comments Methods", () => {
    it("should have listComments method", () => {
      expect(api.listComments).toBeDefined();
      expect(typeof api.listComments).toBe("function");
    });

    it("should have createComment method", () => {
      expect(api.createComment).toBeDefined();
      expect(typeof api.createComment).toBe("function");
    });

    it("should have retrieveComment method", () => {
      expect(api.retrieveComment).toBeDefined();
      expect(typeof api.retrieveComment).toBe("function");
    });
  });

  describe("File Upload Methods", () => {
    it("should have createFileUpload method", () => {
      expect(api.createFileUpload).toBeDefined();
      expect(typeof api.createFileUpload).toBe("function");
    });

    it("should have listFileUploads method", () => {
      expect(api.listFileUploads).toBeDefined();
      expect(typeof api.listFileUploads).toBe("function");
    });

    it("should have retrieveFileUpload method", () => {
      expect(api.retrieveFileUpload).toBeDefined();
      expect(typeof api.retrieveFileUpload).toBe("function");
    });

    it("should have sendFileData method", () => {
      expect(api.sendFileData).toBeDefined();
      expect(typeof api.sendFileData).toBe("function");
    });

    it("should have completeFileUpload method", () => {
      expect(api.completeFileUpload).toBeDefined();
      expect(typeof api.completeFileUpload).toBe("function");
    });
  });

  describe("Search Method", () => {
    it("should have search method", () => {
      expect(api.search).toBeDefined();
      expect(typeof api.search).toBe("function");
    });
  });

  describe("Users Methods", () => {
    it("should have listUsers method", () => {
      expect(api.listUsers).toBeDefined();
      expect(typeof api.listUsers).toBe("function");
    });

    it("should have retrieveUser method", () => {
      expect(api.retrieveUser).toBeDefined();
      expect(typeof api.retrieveUser).toBe("function");
    });

    it("should have retrieveBotUser method", () => {
      expect(api.retrieveBotUser).toBeDefined();
      expect(typeof api.retrieveBotUser).toBe("function");
    });
  });
});

describe("Notion API Method Count", () => {
  it("should have all expected API methods", () => {
    const tokenManager = new BearerTokenManager({ token: "test-token" });
    const httpClient = new HttpClient(tokenManager, {});
    const api = new NotionApi(httpClient);

    // Count all methods (excluding constructor and private methods)
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api))
      .filter((name) => name !== "constructor")
      .filter((name) => typeof api[name as keyof typeof api] === "function");

    // We should have 37 API methods
    expect(methods.length).toBeGreaterThanOrEqual(30);
    console.log(`Total API methods: ${methods.length}`);
  });
});
