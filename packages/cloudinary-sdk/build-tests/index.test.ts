import { describe, expect, it } from "vitest";
import { CloudinarySDK } from "../src/index";

describe("CloudinarySDK", () => {
  describe("Factory Methods", () => {
    it("should have createSignedClient factory method", () => {
      expect(typeof CloudinarySDK.createSignedClient).toBe("function");
    });

    it("should have createUnsignedClient factory method", () => {
      expect(typeof CloudinarySDK.createUnsignedClient).toBe("function");
    });

    it("should have createProvisioningClient factory method", () => {
      expect(typeof CloudinarySDK.createProvisioningClient).toBe("function");
    });
  });

  describe("Signed Client - Upload API", () => {
    const client = CloudinarySDK.createSignedClient({
      cloud_name: "test",
      api_key: "test_key",
      api_secret: "test_secret",
    });

    it("should have upload.upload method", () => {
      expect(typeof client.upload.upload).toBe("function");
    });

    it("should have upload.destroy method", () => {
      expect(typeof client.upload.destroy).toBe("function");
    });

    it("should have upload.explicit method", () => {
      expect(typeof client.upload.explicit).toBe("function");
    });

    it("should have upload.rename method", () => {
      expect(typeof client.upload.rename).toBe("function");
    });

    it("should have upload.explode method", () => {
      expect(typeof client.upload.explode).toBe("function");
    });

    it("should have upload.generateArchive method", () => {
      expect(typeof client.upload.generateArchive).toBe("function");
    });

    it("should have upload.manageTags method", () => {
      expect(typeof client.upload.manageTags).toBe("function");
    });

    it("should have upload.manageContext method", () => {
      expect(typeof client.upload.manageContext).toBe("function");
    });

    it("should have upload.updateMetadata method", () => {
      expect(typeof client.upload.updateMetadata).toBe("function");
    });
  });

  describe("Signed Client - Admin API - Resources", () => {
    const client = CloudinarySDK.createSignedClient({
      cloud_name: "test",
      api_key: "test_key",
      api_secret: "test_secret",
    });

    it("should have admin.getResources method", () => {
      expect(typeof client.admin.getResources).toBe("function");
    });

    it("should have admin.getResource method", () => {
      expect(typeof client.admin.getResource).toBe("function");
    });

    it("should have admin.deleteResources method", () => {
      expect(typeof client.admin.deleteResources).toBe("function");
    });

    it("should have admin.restoreResource method", () => {
      expect(typeof client.admin.restoreResource).toBe("function");
    });

    it("should have admin.updateResource method", () => {
      expect(typeof client.admin.updateResource).toBe("function");
    });
  });

  describe("Signed Client - Admin API - Transformations", () => {
    const client = CloudinarySDK.createSignedClient({
      cloud_name: "test",
      api_key: "test_key",
      api_secret: "test_secret",
    });

    it("should have admin.listTransformations method", () => {
      expect(typeof client.admin.listTransformations).toBe("function");
    });

    it("should have admin.getTransformation method", () => {
      expect(typeof client.admin.getTransformation).toBe("function");
    });

    it("should have admin.deleteTransformation method", () => {
      expect(typeof client.admin.deleteTransformation).toBe("function");
    });
  });

  describe("Signed Client - Admin API - Upload Presets", () => {
    const client = CloudinarySDK.createSignedClient({
      cloud_name: "test",
      api_key: "test_key",
      api_secret: "test_secret",
    });

    it("should have admin.listUploadPresets method", () => {
      expect(typeof client.admin.listUploadPresets).toBe("function");
    });

    it("should have admin.getUploadPreset method", () => {
      expect(typeof client.admin.getUploadPreset).toBe("function");
    });

    it("should have admin.createUploadPreset method", () => {
      expect(typeof client.admin.createUploadPreset).toBe("function");
    });

    it("should have admin.updateUploadPreset method", () => {
      expect(typeof client.admin.updateUploadPreset).toBe("function");
    });

    it("should have admin.deleteUploadPreset method", () => {
      expect(typeof client.admin.deleteUploadPreset).toBe("function");
    });
  });

  describe("Signed Client - Admin API - Tags & Folders", () => {
    const client = CloudinarySDK.createSignedClient({
      cloud_name: "test",
      api_key: "test_key",
      api_secret: "test_secret",
    });

    it("should have admin.listTags method", () => {
      expect(typeof client.admin.listTags).toBe("function");
    });

    it("should have admin.listSubFolders method", () => {
      expect(typeof client.admin.listSubFolders).toBe("function");
    });

    it("should have admin.deleteFolder method", () => {
      expect(typeof client.admin.deleteFolder).toBe("function");
    });
  });

  describe("Signed Client - Admin API - Search", () => {
    const client = CloudinarySDK.createSignedClient({
      cloud_name: "test",
      api_key: "test_key",
      api_secret: "test_secret",
    });

    it("should have admin.search method", () => {
      expect(typeof client.admin.search).toBe("function");
    });
  });

  describe("Signed Client - Admin API - Metadata", () => {
    const client = CloudinarySDK.createSignedClient({
      cloud_name: "test",
      api_key: "test_key",
      api_secret: "test_secret",
    });

    it("should have admin.listMetadataFields method", () => {
      expect(typeof client.admin.listMetadataFields).toBe("function");
    });

    it("should have admin.getMetadataField method", () => {
      expect(typeof client.admin.getMetadataField).toBe("function");
    });

    it("should have admin.createMetadataField method", () => {
      expect(typeof client.admin.createMetadataField).toBe("function");
    });

    it("should have admin.updateMetadataField method", () => {
      expect(typeof client.admin.updateMetadataField).toBe("function");
    });

    it("should have admin.deleteMetadataField method", () => {
      expect(typeof client.admin.deleteMetadataField).toBe("function");
    });
  });

  describe("Unsigned Client", () => {
    const client = CloudinarySDK.createUnsignedClient({
      cloud_name: "test",
      upload_preset: "test_preset",
    });

    it("should have upload.unsignedUpload method", () => {
      expect(typeof client.upload.unsignedUpload).toBe("function");
    });
  });

  describe("Provisioning Client - Users", () => {
    const client = CloudinarySDK.createProvisioningClient({
      account_id: "test_account",
      provisioning_key: "test_key",
      provisioning_secret: "test_secret",
    });

    it("should have users.listUsers method", () => {
      expect(typeof client.users.listUsers).toBe("function");
    });

    it("should have users.getUser method", () => {
      expect(typeof client.users.getUser).toBe("function");
    });

    it("should have users.createUser method", () => {
      expect(typeof client.users.createUser).toBe("function");
    });

    it("should have users.updateUser method", () => {
      expect(typeof client.users.updateUser).toBe("function");
    });

    it("should have users.deleteUser method", () => {
      expect(typeof client.users.deleteUser).toBe("function");
    });
  });

  describe("Provisioning Client - User Groups", () => {
    const client = CloudinarySDK.createProvisioningClient({
      account_id: "test_account",
      provisioning_key: "test_key",
      provisioning_secret: "test_secret",
    });

    it("should have userGroups.listUserGroups method", () => {
      expect(typeof client.userGroups.listUserGroups).toBe("function");
    });

    it("should have userGroups.getUserGroup method", () => {
      expect(typeof client.userGroups.getUserGroup).toBe("function");
    });

    it("should have userGroups.createUserGroup method", () => {
      expect(typeof client.userGroups.createUserGroup).toBe("function");
    });

    it("should have userGroups.updateUserGroup method", () => {
      expect(typeof client.userGroups.updateUserGroup).toBe("function");
    });

    it("should have userGroups.deleteUserGroup method", () => {
      expect(typeof client.userGroups.deleteUserGroup).toBe("function");
    });

    it("should have userGroups.addUserToGroup method", () => {
      expect(typeof client.userGroups.addUserToGroup).toBe("function");
    });

    it("should have userGroups.removeUserFromGroup method", () => {
      expect(typeof client.userGroups.removeUserFromGroup).toBe("function");
    });
  });

  describe("Provisioning Client - Sub-Accounts", () => {
    const client = CloudinarySDK.createProvisioningClient({
      account_id: "test_account",
      provisioning_key: "test_key",
      provisioning_secret: "test_secret",
    });

    it("should have subAccounts.listSubAccounts method", () => {
      expect(typeof client.subAccounts.listSubAccounts).toBe("function");
    });

    it("should have subAccounts.getSubAccount method", () => {
      expect(typeof client.subAccounts.getSubAccount).toBe("function");
    });

    it("should have subAccounts.createSubAccount method", () => {
      expect(typeof client.subAccounts.createSubAccount).toBe("function");
    });

    it("should have subAccounts.updateSubAccount method", () => {
      expect(typeof client.subAccounts.updateSubAccount).toBe("function");
    });

    it("should have subAccounts.deleteSubAccount method", () => {
      expect(typeof client.subAccounts.deleteSubAccount).toBe("function");
    });
  });

  describe("Provisioning Client - Access Keys", () => {
    const client = CloudinarySDK.createProvisioningClient({
      account_id: "test_account",
      provisioning_key: "test_key",
      provisioning_secret: "test_secret",
    });

    it("should have accessKeys.listAccessKeys method", () => {
      expect(typeof client.accessKeys.listAccessKeys).toBe("function");
    });

    it("should have accessKeys.generateAccessKey method", () => {
      expect(typeof client.accessKeys.generateAccessKey).toBe("function");
    });

    it("should have accessKeys.updateAccessKey method", () => {
      expect(typeof client.accessKeys.updateAccessKey).toBe("function");
    });

    it("should have accessKeys.deleteAccessKey method", () => {
      expect(typeof client.accessKeys.deleteAccessKey).toBe("function");
    });
  });

  describe("Method Counts", () => {
    it("should have correct number of Upload API methods (9)", () => {
      const client = CloudinarySDK.createSignedClient({
        cloud_name: "test",
        api_key: "test_key",
        api_secret: "test_secret",
      });

      const uploadMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(client.upload)).filter(
        (name) => name !== "constructor",
      );

      expect(uploadMethods.length).toBe(9);
    });

    it("should have correct number of Admin API methods (22)", () => {
      const client = CloudinarySDK.createSignedClient({
        cloud_name: "test",
        api_key: "test_key",
        api_secret: "test_secret",
      });

      const adminMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(client.admin)).filter(
        (name) => name !== "constructor",
      );

      expect(adminMethods.length).toBe(22);
    });

    it("should have correct number of Unsigned Upload API methods (1)", () => {
      const client = CloudinarySDK.createUnsignedClient({
        cloud_name: "test",
        upload_preset: "test_preset",
      });

      const uploadMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(client.upload)).filter(
        (name) => name !== "constructor",
      );

      expect(uploadMethods.length).toBe(1);
    });

    it("should have correct number of Provisioning API methods (21)", () => {
      const client = CloudinarySDK.createProvisioningClient({
        account_id: "test_account",
        provisioning_key: "test_key",
        provisioning_secret: "test_secret",
      });

      const provisioningMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(client.users),
      ).filter((name) => name !== "constructor");

      expect(provisioningMethods.length).toBe(21);
    });
  });
});
