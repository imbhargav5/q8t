
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  X,
  Maximize2,
  Send,
  Calendar as CalendarIcon,
  Save,
  Sparkles,
  Image as ImageIcon,
  Settings,
} from "lucide-react";
import { ComposeEditor } from "./compose-editor";
import { AIControls } from "./ai-controls";
import { PlatformAccountSelector } from "./platform-account-selector";
import { MediaUploadZone } from "./media-upload-zone";
import { SchedulingPanel } from "./scheduling-panel";
import { PlatformPreview } from "./platform-preview";
import { PlatformCustomizationTabs } from "./platform-customization";
import { useComposeDraft } from "@/lib/hooks/use-compose-draft";
import type { SocialPlatform, PostMedia } from "@/lib/zod-schemas";
import { PLATFORM_CHARACTER_LIMITS } from "@/lib/compose/constants";
import { toast } from "sonner";

interface ComposeSheetProps {
  open: boolean;
  onClose: () => void;
  defaultDate?: Date;
}

export function ComposeSheet({ open, onClose, defaultDate }: ComposeSheetProps) {
  const navigate = useNavigate();
  const { composeState, updateComposeState, saveDraft, clearDraft } = useComposeDraft();

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"compose" | "media" | "customize" | "schedule">(
    "compose"
  );

  // Initialize with default date if provided
  useEffect(() => {
    if (defaultDate && open) {
      updateComposeState({
        scheduledDate: defaultDate.toISOString().split("T")[0],
        scheduledTime: "09:00",
      });
    }
  }, [defaultDate, open]);

  const handleExpandToFullPage = () => {
    // Save current state
    saveDraft();

    // Navigate to full compose page
    navigate("/compose");

    // Close the sheet
    onClose();
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
    onClose();
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
    onClose();
  };

  const handleSaveDraft = () => {
    saveDraft();
    toast.success("Draft saved!");
    onClose();
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
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent className="fixed right-0 top-0 bottom-0 w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] max-w-[1400px] rounded-none">
        {/* Header */}
        <DrawerHeader className="border-b flex flex-row items-center justify-between p-4">
          <DrawerTitle className="text-xl font-bold">Create New Post</DrawerTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExpandToFullPage}
              className="gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              Expand
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DrawerHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Left Panel - Compose */}
            <div className="flex-1 flex flex-col border-r">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
                <div className="border-b px-4">
                  <TabsList className="h-12">
                    <TabsTrigger value="compose" className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Compose
                    </TabsTrigger>
                    <TabsTrigger value="media" className="gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Media
                    </TabsTrigger>
                    <TabsTrigger value="customize" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Customize
                    </TabsTrigger>
                    <TabsTrigger value="schedule" className="gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Schedule
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-6">
                    <TabsContent value="compose" className="mt-0 space-y-4">
                      {/* Platform Selection */}
                      <PlatformAccountSelector
                        selectedPlatforms={composeState.platforms}
                        selectedAccounts={selectedAccounts}
                        onChange={handleAccountChange}
                      />

                      <Separator />

                      {/* AI Controls */}
                      <div>
                        <AIControls disabled={!composeState.content.trim()} />
                      </div>

                      {/* Editor */}
                      <div>
                        <ComposeEditor
                          content={composeState.content}
                          onChange={(content) => updateComposeState({ content })}
                          maxLength={getCharacterLimit()}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="media" className="mt-0">
                      <MediaUploadZone
                        media={composeState.media}
                        onMediaChange={handleMediaChange}
                      />
                    </TabsContent>

                    <TabsContent value="customize" className="mt-0">
                      <PlatformCustomizationTabs
                        selectedPlatforms={composeState.platforms}
                        platformCustomizations={composeState.platformCustomizations}
                        onCustomizationChange={handlePlatformCustomizationChange}
                      />
                    </TabsContent>

                    <TabsContent value="schedule" className="mt-0">
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
                    </TabsContent>
                  </div>
                </ScrollArea>
              </Tabs>
            </div>

            {/* Right Panel - Preview */}
            <div className="w-[400px] hidden lg:flex flex-col">
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

          {/* Footer Actions */}
          <div className="border-t p-4 bg-background">
            <div className="flex items-center justify-between gap-4">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  onClick={handleSchedule}
                  disabled={!canPublish}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
                <Button
                  variant="default"
                  onClick={handlePublishNow}
                  disabled={!canPublish}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
