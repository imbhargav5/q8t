
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlatformSelector } from "./platform-selector";
import type { SocialPlatform } from "@/lib/zod-schemas";
import {
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Calendar as CalendarIcon,
  Send,
  Save,
} from "lucide-react";
import { format } from "date-fns";

interface PostComposerProps {
  open: boolean;
  onClose: () => void;
  defaultDate?: Date;
  onSave?: (postData: any) => void;
}

export function PostComposer({
  open,
  onClose,
  defaultDate,
  onSave,
}: PostComposerProps) {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [scheduledDate, setScheduledDate] = useState(
    defaultDate ? format(defaultDate, "yyyy-MM-dd") : ""
  );
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [hashtags, setHashtags] = useState("");

  const characterCount = content.length;
  const maxCharacters = platforms.includes("twitter") ? 280 : 2200;

  const handleSaveDraft = () => {
    console.log("Saving draft...");
    onClose();
  };

  const handleSchedule = () => {
    const postData = {
      content,
      platforms,
      scheduled_for: scheduledDate && scheduledTime
        ? new Date(`${scheduledDate}T${scheduledTime}`)
        : null,
      hashtags: hashtags.split(" ").filter(tag => tag.startsWith("#")),
    };

    if (onSave) {
      onSave(postData);
    }

    console.log("Scheduling post:", postData);
    onClose();
  };

  const handlePublishNow = () => {
    console.log("Publishing now...");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Compose your post and select platforms to publish
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Platform Selection */}
          <PlatformSelector selected={platforms} onChange={setPlatforms} />

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              placeholder="What would you like to share?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {characterCount} / {maxCharacters} characters
              </span>
              {characterCount > maxCharacters && (
                <span className="text-red-500">
                  Over limit by {characterCount - maxCharacters}
                </span>
              )}
            </div>
          </div>

          {/* Media and attachments */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 mr-2" />
              Add Image
            </Button>
            <Button variant="outline" size="sm">
              <Video className="h-4 w-4 mr-2" />
              Add Video
            </Button>
            <Button variant="outline" size="sm">
              <LinkIcon className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags (optional)</Label>
            <Input
              id="hashtags"
              placeholder="#hashtag #another"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <Label>Schedule</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>
              <div className="w-32">
                <Input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Leave empty to save as draft
            </p>
          </div>

          {/* Platform-specific settings */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Platforms</TabsTrigger>
              {platforms.map((platform) => (
                <TabsTrigger key={platform} value={platform}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground">
                Post will use the same content across all platforms
              </p>
            </TabsContent>

            {platforms.map((platform) => (
              <TabsContent key={platform} value={platform} className="space-y-2 mt-4">
                <Label>Platform-specific content (optional)</Label>
                <Textarea
                  placeholder={`Custom content for ${platform}...`}
                  className="min-h-[100px]"
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            variant="default"
            onClick={handleSchedule}
            disabled={platforms.length === 0 || !content}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Post
          </Button>
          <Button
            variant="default"
            onClick={handlePublishNow}
            disabled={platforms.length === 0 || !content}
          >
            <Send className="h-4 w-4 mr-2" />
            Publish Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
