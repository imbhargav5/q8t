import type { ComposeDraft, ComposeState } from "./types";
import { createEmptyDraft } from "./types";

const DRAFT_STORAGE_KEY = "compose-draft";
const AUTO_SAVE_DEBOUNCE_MS = 3000;

export class DraftManager {
  private static instance: DraftManager;
  private autoSaveTimer: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): DraftManager {
    if (!DraftManager.instance) {
      DraftManager.instance = new DraftManager();
    }
    return DraftManager.instance;
  }

  /**
   * Load the current draft from localStorage
   */
  loadDraft(): ComposeDraft | null {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!stored) return null;

      const draft = JSON.parse(stored) as ComposeDraft;
      return draft;
    } catch (error) {
      console.error("Failed to load draft:", error);
      return null;
    }
  }

  /**
   * Save draft to localStorage
   */
  saveDraft(draft: Partial<ComposeDraft>): void {
    if (typeof window === "undefined") return;

    try {
      const existing = this.loadDraft() || createEmptyDraft();
      const updated: ComposeDraft = {
        ...existing,
        ...draft,
        lastModified: new Date().toISOString(),
      };

      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  }

  /**
   * Auto-save draft with debouncing
   */
  autoSave(draft: Partial<ComposeDraft>): void {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }

    this.autoSaveTimer = setTimeout(() => {
      this.saveDraft(draft);
    }, AUTO_SAVE_DEBOUNCE_MS);
  }

  /**
   * Clear the current draft
   */
  clearDraft(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear draft:", error);
    }
  }

  /**
   * Check if a draft exists
   */
  hasDraft(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(DRAFT_STORAGE_KEY) !== null;
  }

  /**
   * Convert ComposeState to ComposeDraft for saving
   */
  composeStateToDraft(state: ComposeState): Partial<ComposeDraft> {
    return {
      content: state.content,
      platforms: state.platforms,
      media: state.media,
      scheduledDate: state.scheduledDate,
      scheduledTime: state.scheduledTime,
      hashtags: state.hashtags,
      platformCustomizations: state.platformCustomizations,
      poll: state.poll,
      linkPreview: state.linkPreview,
    };
  }

  /**
   * Convert ComposeDraft to ComposeState for loading
   */
  draftToComposeState(draft: ComposeDraft): Partial<ComposeState> {
    return {
      content: draft.content,
      platforms: draft.platforms,
      media: draft.media,
      scheduledDate: draft.scheduledDate,
      scheduledTime: draft.scheduledTime,
      hashtags: draft.hashtags,
      platformCustomizations: draft.platformCustomizations,
      poll: draft.poll,
      linkPreview: draft.linkPreview,
    };
  }
}

// Export singleton instance
export const draftManager = DraftManager.getInstance();
