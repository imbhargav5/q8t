/**
 * Types Test Suite
 *
 * This test suite verifies that all types defined in the OpenAPI specification
 * are correctly generated and exported.
 */

import { describe, expect, it } from "vitest";
import type * as Types from "../lib/types";

describe("Generated Types", () => {
  describe("User Types", () => {
    it("should export User interface", () => {
      const user: Types.User = {
        id: 123,
        name: "John Doe",
        login: "johndoe",
      };

      expect(user.id).toBe(123);
      expect(user.name).toBe("John Doe");
      expect(user.login).toBe("johndoe");
    });

    it("should export User with optional fields", () => {
      const user: Types.User = {
        id: 123,
        name: "Jane Designer",
        login: "janedesigner",
        html_url: "https://dribbble.com/janedesigner",
        avatar_url: "https://cdn.dribbble.com/users/123/avatar.jpg",
        bio: "Product Designer",
        location: "San Francisco, CA",
        links: {
          web: "https://janedesigner.com",
          twitter: "https://twitter.com/janedesigner",
        },
        can_upload_shot: true,
        pro: true,
        followers_count: 5000,
        created_at: "2020-01-01T00:00:00Z",
        type: "Player",
      };

      expect(user.pro).toBe(true);
      expect(user.followers_count).toBe(5000);
      expect(user.can_upload_shot).toBe(true);
    });

    it("should export Team interface", () => {
      const team: Types.Team = {
        id: 456,
        name: "Design Team",
        login: "designteam",
      };

      expect(team.id).toBe(456);
      expect(team.name).toBe("Design Team");
    });
  });

  describe("Shot Types", () => {
    it("should export Shot interface", () => {
      const shot: Types.Shot = {
        id: 789,
        title: "Amazing Design",
        description: "<p>Check out this design</p>",
      };

      expect(shot.id).toBe(789);
      expect(shot.title).toBe("Amazing Design");
    });

    it("should export Shot with optional fields", () => {
      const shot: Types.Shot = {
        id: 789,
        title: "UI Concept",
        description: "<p>Mobile app UI</p>",
        width: 800,
        height: 600,
        images: {
          hidpi: "https://cdn.dribbble.com/shot_hidpi.jpg",
          normal: "https://cdn.dribbble.com/shot.jpg",
          teaser: "https://cdn.dribbble.com/shot_teaser.jpg",
        },
        published_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-16T12:00:00Z",
        html_url: "https://dribbble.com/shots/789",
        animated: false,
        tags: ["ui", "mobile", "app"],
        low_profile: false,
      };

      expect(shot.width).toBe(800);
      expect(shot.height).toBe(600);
      expect(shot.tags).toContain("ui");
      expect(shot.animated).toBe(false);
    });

    it("should export ShotImages interface", () => {
      const images: Types.ShotImages = {
        normal: "https://cdn.dribbble.com/shot.jpg",
        teaser: "https://cdn.dribbble.com/shot_teaser.jpg",
      };

      expect(images.normal).toBeDefined();
      expect(images.teaser).toBeDefined();
    });

    it("should export CreateShotRequest interface", () => {
      const request: Types.CreateShotRequest = {
        title: "New Shot",
      };

      expect(request.title).toBe("New Shot");
    });

    it("should export CreateShotRequest with optional fields", () => {
      const request: Types.CreateShotRequest = {
        title: "New Shot",
        description: "A new design",
        tags: ["design", "ui"],
        team_id: 123,
        low_profile: false,
      };

      expect(request.tags).toHaveLength(2);
      expect(request.team_id).toBe(123);
    });

    it("should export UpdateShotRequest interface", () => {
      const request: Types.UpdateShotRequest = {
        title: "Updated Title",
      };

      expect(request.title).toBe("Updated Title");
    });
  });

  describe("Attachment Types", () => {
    it("should export Attachment interface", () => {
      const attachment: Types.Attachment = {
        id: 999,
        url: "https://cdn.dribbble.com/attachment.pdf",
      };

      expect(attachment.id).toBe(999);
      expect(attachment.url).toBeDefined();
    });

    it("should export Attachment with optional fields", () => {
      const attachment: Types.Attachment = {
        id: 999,
        url: "https://cdn.dribbble.com/attachment.pdf",
        thumbnail_url: "https://cdn.dribbble.com/attachment_thumb.jpg",
        size: 1024000,
        content_type: "application/pdf",
        created_at: "2024-01-15T10:00:00Z",
      };

      expect(attachment.size).toBe(1024000);
      expect(attachment.content_type).toBe("application/pdf");
    });
  });

  describe("Project Types", () => {
    it("should export Project interface", () => {
      const project: Types.Project = {
        id: 111,
        name: "Website Redesign",
      };

      expect(project.id).toBe(111);
      expect(project.name).toBe("Website Redesign");
    });

    it("should export Project with optional fields", () => {
      const project: Types.Project = {
        id: 111,
        name: "Website Redesign",
        description: "Complete redesign of company website",
        shots_count: 15,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-20T00:00:00Z",
      };

      expect(project.shots_count).toBe(15);
      expect(project.description).toBeDefined();
    });

    it("should export ProjectReference interface", () => {
      const projectRef: Types.ProjectReference = {
        id: 111,
        name: "Website Redesign",
      };

      expect(projectRef.id).toBe(111);
      expect(projectRef.name).toBe("Website Redesign");
    });

    it("should export CreateProjectRequest interface", () => {
      const request: Types.CreateProjectRequest = {
        name: "New Project",
      };

      expect(request.name).toBe("New Project");
    });

    it("should export CreateProjectRequest with description", () => {
      const request: Types.CreateProjectRequest = {
        name: "New Project",
        description: "A new project for designs",
      };

      expect(request.description).toBe("A new project for designs");
    });

    it("should export UpdateProjectRequest interface", () => {
      const request: Types.UpdateProjectRequest = {
        name: "Updated Project Name",
      };

      expect(request.name).toBe("Updated Project Name");
    });
  });

  describe("Error Types", () => {
    it("should export Error interface", () => {
      const error: Types.Error = {
        message: "Not found",
      };

      expect(error.message).toBe("Not found");
    });

    it("should export Error with errors array", () => {
      const error: Types.Error = {
        message: "Validation failed",
        errors: [{ field: "title", message: "Title is required" }],
      };

      expect(error.errors).toHaveLength(1);
    });
  });

  describe("Type Completeness", () => {
    it("should be able to create instances of all major types", () => {
      // Verify all main types can be instantiated
      const user: Types.User = { id: 1 };
      const team: Types.Team = { id: 2 };
      const shot: Types.Shot = { id: 3 };
      const shotImages: Types.ShotImages = { normal: "url" };
      const createShotRequest: Types.CreateShotRequest = { title: "test" };
      const updateShotRequest: Types.UpdateShotRequest = {};
      const attachment: Types.Attachment = { id: 4 };
      const project: Types.Project = { id: 5 };
      const projectReference: Types.ProjectReference = { id: 6 };
      const createProjectRequest: Types.CreateProjectRequest = { name: "test" };
      const updateProjectRequest: Types.UpdateProjectRequest = {};
      const error: Types.Error = {};

      expect(user).toBeDefined();
      expect(team).toBeDefined();
      expect(shot).toBeDefined();
      expect(shotImages).toBeDefined();
      expect(createShotRequest).toBeDefined();
      expect(updateShotRequest).toBeDefined();
      expect(attachment).toBeDefined();
      expect(project).toBeDefined();
      expect(projectReference).toBeDefined();
      expect(createProjectRequest).toBeDefined();
      expect(updateProjectRequest).toBeDefined();
      expect(error).toBeDefined();
    });
  });

  describe("Type Relationships", () => {
    it("User should have teams array of Team type", () => {
      const user: Types.User = {
        id: 123,
        name: "User",
        login: "user",
        teams: [
          {
            id: 456,
            name: "Team",
            login: "team",
          },
        ],
      };

      expect(user.teams).toHaveLength(1);
      expect(user.teams?.[0].name).toBe("Team");
    });

    it("Shot should have attachments array", () => {
      const shot: Types.Shot = {
        id: 789,
        title: "Shot",
        attachments: [
          {
            id: 999,
            url: "https://example.com/file.pdf",
          },
        ],
      };

      expect(shot.attachments).toHaveLength(1);
    });

    it("Shot should have projects array of ProjectReference", () => {
      const shot: Types.Shot = {
        id: 789,
        title: "Shot",
        projects: [
          {
            id: 111,
            name: "Project",
          },
        ],
      };

      expect(shot.projects).toHaveLength(1);
      expect(shot.projects?.[0].name).toBe("Project");
    });
  });
});
