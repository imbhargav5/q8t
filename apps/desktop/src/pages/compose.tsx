import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Send,
  Calendar as CalendarIcon,
  Save,
  Sparkles,
} from "lucide-react";
import { ComposeEditor } from "@/components/compose/compose-editor";
import { AIControls } from "@/components/compose/ai-controls";
import { PlatformAccountSelector } from "@/components/compose/platform-account-selector";
import { MediaUploadZone } from "@/components/compose/media-upload-zone";
import { SchedulingPanel } from "@/components/compose/scheduling-panel";
import { PlatformPreview } from "@/components/compose/platform-preview";
import { PlatformCustomizationTabs } from "@/components/compose/platform-customization";
import { useComposeDraft } from "@/lib/hooks/use-compose-draft";
import type { SocialPlatform, PostMedia } from "@/lib/zod-schemas";
import { PLATFORM_CHARACTER_LIMITS } from "@/lib/compose/constants";
import { toast } from "sonner";

export function ComposePage() {
  const navigate = useNavigate();
  const { composeState, updateComposeState, saveDraft, clearDraft, loadDraft } =
    useComposeDraft();

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  // Load draft when page opens
  useEffect(() => {
    loadDraft();
  }, []);

  const handleBack = () => {
    // Save before going back
    saveDraft();
    navigate(-1);
  };

  const handleAccountChange = (platforms: SocialPlatform[], accounts: string[]) => {
    updateComposeState({ platforms });
    setSelectedAccounts(accounts);
  };

  const handleMediaChange = (media: PostMedia[]) => {
    updateComposeState({ media });
  };

  const handlePlatformCustomizationChange = (
    platform: SocialPlatform,
    customization: any
  ) => {
    updateComposeState({
      platformCustomizations: {
        ...composeState.platformCustomizations,
        [platform]: customization,
      },
    });
  };

  const handlePublishNow = () => {
    if (composeState.platforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    if (!composeState.content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }

    toast.success("Post published successfully! (Demo)");
    clearDraft();
    navigate("/content-calendar");
  };

  const handleSchedule = () => {
    if (composeState.platforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    if (!composeState.content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }

    if (!composeState.scheduledDate || !composeState.scheduledTime) {
      toast.error("Please select a date and time");
      return;
    }

    toast.success("Post scheduled successfully! (Demo)");
    clearDraft();
    navigate("/content-calendar");
  };

  const handleSaveDraft = () => {
    saveDraft();
    toast.success("Draft saved!");
    navigate("/content-calendar");
  };

  // Calculate character limit based on selected platforms
  const getCharacterLimit = () => {
    if (composeState.platforms.length === 0) return 2200;

    return Math.min(
      ...composeState.platforms.map((p) => PLATFORM_CHARACTER_LIMITS[p])
    );
  };

  const canPublish =
    composeState.platforms.length > 0 && composeState.content.trim().length > 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Compose Post</h1>
              <p className="text-sm text-muted-foreground">
                Create and schedule content across all your social platforms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button
              variant="default"
              onClick={handleSchedule}
              disabled={!canPublish}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button
              variant="default"
              onClick={handlePublishNow}
              disabled={!canPublish}
            >
              <Send className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Platform & Scheduling */}
        <div className="w-[320px] border-r flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Platform Selection */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Select Accounts</h3>
                <PlatformAccountSelector
                  selectedPlatforms={composeState.platforms}
                  selectedAccounts={selectedAccounts}
                  onChange={handleAccountChange}
                />
              </div>

              <Separator />

              {/* Scheduling */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Publishing</h3>
                <SchedulingPanel
                  scheduledDate={composeState.scheduledDate}
                  scheduledTime={composeState.scheduledTime}
                  onScheduledDateChange={(date) =>
                    updateComposeState({ scheduledDate: date })
                  }
                  onScheduledTimeChange={(time) =>
                    updateComposeState({ scheduledTime: time })
                  }
                  selectedPlatforms={composeState.platforms}
                />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Center - Main Editor */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="max-w-3xl mx-auto p-6 space-y-6">
              {/* AI Controls */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Content</h2>
                <AIControls disabled={!composeState.content.trim()} />
              </div>

              {/* Editor */}
              <ComposeEditor
                content={composeState.content}
                onChange={(content) => updateComposeState({ content })}
                maxLength={getCharacterLimit()}
              />

              <Separator />

              {/* Media Upload */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Media</h3>
                <MediaUploadZone
                  media={composeState.media}
                  onMediaChange={handleMediaChange}
                />
              </div>

              <Separator />

              {/* Platform Customization */}
              <div>
                <h3 className="text-sm font-semibold mb-4">
                  Platform-Specific Settings
                </h3>
                <PlatformCustomizationTabs
                  selectedPlatforms={composeState.platforms}
                  platformCustomizations={composeState.platformCustomizations}
                  onCustomizationChange={handlePlatformCustomizationChange}
                />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right Sidebar - Preview */}
        <div className="w-[400px] border-l flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-4">
              <PlatformPreview
                content={composeState.content}
                media={composeState.media}
                selectedPlatforms={composeState.platforms}
                platformCustomizations={composeState.platformCustomizations}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
