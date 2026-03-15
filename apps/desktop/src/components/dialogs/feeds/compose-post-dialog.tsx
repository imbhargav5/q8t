
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image, Send, Calendar as CalendarIcon, Clock, Upload } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import type { SocialPlatform } from "@/lib/zod-schemas/enums.schema";

interface ComposePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPost: (post: {
    content: string;
    platforms: SocialPlatform[];
    media?: string[];
    action: "post-now" | "schedule" | "save-draft" | "add-to-queue";
    scheduledTime?: Date;
    queueId?: string;
  }) => void;
}

const platforms: SocialPlatform[] = ["twitter", "facebook", "instagram", "linkedin", "youtube"];

const mockQueues = [
  { id: "queue-1", name: "Daily Updates" },
  { id: "queue-2", name: "Product News" },
  { id: "queue-3", name: "Evergreen Content" },
];

export function ComposePostDialog({
  open,
  onOpenChange,
  onPost,
}: ComposePostDialogProps) {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(["twitter"]);
  const [media, setMedia] = useState<string[]>([]);
  const [publishTab, setPublishTab] = useState("now");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("12:00");
  const [selectedQueue, setSelectedQueue] = useState(mockQueues[0].id);

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const addMedia = () => {
    // Mock media upload
    setMedia([...media, `image-${media.length + 1}.jpg`]);
  };

  const handleSubmit = (action: "post-now" | "schedule" | "save-draft" | "add-to-queue") => {
    if (!content.trim() || selectedPlatforms.length === 0) return;

    const postData: Parameters<typeof onPost>[0] = {
      content: content.trim(),
      platforms: selectedPlatforms,
      media: media.length > 0 ? media : undefined,
      action,
    };

    if (action === "schedule" && scheduledDate) {
      const [hours, minutes] = scheduledTime.split(":");
      const scheduled = new Date(scheduledDate);
      scheduled.setHours(parseInt(hours), parseInt(minutes));
      postData.scheduledTime = scheduled;
    }

    if (action === "add-to-queue") {
      postData.queueId = selectedQueue;
    }

    onPost(postData);

    // Reset
    setContent("");
    setSelectedPlatforms(["twitter"]);
    setMedia([]);
    setPublishTab("now");
    setScheduledDate(undefined);
    setScheduledTime("12:00");
    onOpenChange(false);
  };

  const getCharacterLimit = () => {
    if (selectedPlatforms.includes("twitter")) return 280;
    return 5000;
  };

  const charLimit = getCharacterLimit();
  const isOverLimit = content.length > charLimit;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compose Post</DialogTitle>
          <DialogDescription>
            Create and publish content across your social platforms
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="What do you want to share?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={isOverLimit ? "border-destructive" : ""}
            />
            <div className="flex items-center justify-between text-xs">
              <span className={isOverLimit ? "text-destructive" : "text-muted-foreground"}>
                {content.length} / {charLimit} characters
              </span>
              {selectedPlatforms.includes("twitter") && (
                <span className="text-muted-foreground">
                  Twitter limit: 280 characters
                </span>
              )}
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <Label>
              Platforms <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center gap-2">
                  <Checkbox
                    id={`compose-platform-${platform}`}
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => togglePlatform(platform)}
                  />
                  <Label
                    htmlFor={`compose-platform-${platform}`}
                    className="capitalize cursor-pointer font-normal"
                  >
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Media */}
          <div className="space-y-2">
            <Label>Media</Label>
            {media.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-2">
                {media.map((item, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md border bg-muted flex items-center justify-center"
                  >
                    <Image className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMedia}
              disabled={media.length >= 4}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Media {media.length > 0 && `(${media.length}/4)`}
            </Button>
          </div>

          {/* Publish Options */}
          <div className="space-y-3 pt-4 border-t">
            <Label>Publish Options</Label>
            <Tabs value={publishTab} onValueChange={setPublishTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="now">Post Now</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="queue">Add to Queue</TabsTrigger>
              </TabsList>

              <TabsContent value="now" className="mt-3">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-3 text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Post immediately
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200 mt-1">
                    Your post will be published right away to all selected platforms
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                    {scheduledDate && (
                      <p className="text-sm text-muted-foreground">
                        <CalendarIcon className="inline h-3 w-3 mr-1" />
                        {format(scheduledDate, "MMM dd, yyyy")} at {scheduledTime}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="queue" className="mt-3 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="queue">Select Queue</Label>
                  <Select value={selectedQueue} onValueChange={setSelectedQueue}>
                    <SelectTrigger id="queue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockQueues.map((queue) => (
                        <SelectItem key={queue.id} value={queue.id}>
                          {queue.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Post will be added to the queue and published according to the queue schedule
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => handleSubmit("save-draft")}>
            Save Draft
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (publishTab === "now") handleSubmit("post-now");
              else if (publishTab === "schedule") handleSubmit("schedule");
              else handleSubmit("add-to-queue");
            }}
            disabled={
              !content.trim() ||
              selectedPlatforms.length === 0 ||
              isOverLimit ||
              (publishTab === "schedule" && !scheduledDate)
            }
          >
            {publishTab === "now" && <Send className="mr-2 h-4 w-4" />}
            {publishTab === "schedule" && <Clock className="mr-2 h-4 w-4" />}
            {publishTab === "now" && "Post Now"}
            {publishTab === "schedule" && "Schedule Post"}
            {publishTab === "queue" && "Add to Queue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
