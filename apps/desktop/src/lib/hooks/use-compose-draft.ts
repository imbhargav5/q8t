
import { useEffect, useState, useCallback } from "react";
import { draftManager } from "../compose/draft-manager";
import type { ComposeState } from "../compose/types";
import { createEmptyComposeState } from "../compose/types";

export function useComposeDraft() {
  const [composeState, setComposeState] = useState<ComposeState>(createEmptyComposeState());
  const [isLoading, setIsLoading] = useState(true);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const draft = draftManager.loadDraft();
    if (draft) {
      const stateFromDraft = draftManager.draftToComposeState(draft);
      setComposeState((prev) => ({
        ...prev,
        ...stateFromDraft,
      }));
      setHasSavedDraft(true);
    }
    setIsLoading(false);
  }, []);

  // Auto-save when state changes
  useEffect(() => {
    if (!isLoading && composeState.content) {
      const draftData = draftManager.composeStateToDraft(composeState);
      draftManager.autoSave(draftData);
    }
  }, [composeState, isLoading]);

  const updateComposeState = useCallback((updates: Partial<ComposeState>) => {
    setComposeState((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const saveDraft = useCallback(() => {
    const draftData = draftManager.composeStateToDraft(composeState);
    draftManager.saveDraft(draftData);
  }, [composeState]);

  const clearDraft = useCallback(() => {
    draftManager.clearDraft();
    setComposeState(createEmptyComposeState());
    setHasSavedDraft(false);
  }, []);

  const loadDraft = useCallback(() => {
    const draft = draftManager.loadDraft();
    if (draft) {
      const stateFromDraft = draftManager.draftToComposeState(draft);
      setComposeState((prev) => ({
        ...prev,
        ...stateFromDraft,
      }));
      setHasSavedDraft(true);
    }
  }, []);

  return {
    composeState,
    updateComposeState,
    saveDraft,
    clearDraft,
    loadDraft,
    isLoading,
    hasSavedDraft,
  };
}
