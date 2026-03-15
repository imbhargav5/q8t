
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload } from "lucide-react";
import { useState } from "react";
import type { SocialPlatform } from "@/lib/zod-schemas/enums.schema";

interface AddPostToQueueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  queueName: string;
  onAddPost: (post: {
    type: "new" | "existing";
    content?: string;
    platforms?: SocialPlatform[];
    media?: string[];
    existingPostId?: string;
    position: "next" | "end" | "specific";
    specificPosition?: number;
  }) => void;
}

const platforms: SocialPlatform[] = ["twitter", "facebook", "instagram", "linkedin", "youtube"];

export function AddPostToQueueDialog({
  open,
  onOpenChange,
  queueName,
  onAddPost,
}: AddPostToQueueDialogProps) {
  const [postType, setPostType] = useState<"new" | "existing">("new");
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [existingPostId, setExistingPostId] = useState("");
  const [position, setPosition] = useState<"next" | "end" | "specific">("end");
  const [specificPosition, setSpecificPosition] = useState("1");

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = () => {
    const postData: Parameters<typeof onAddPost>[0] = {
      type: postType,
      position,
    };

    if (postType === "new") {
      if (!content.trim() || selectedPlatforms.length === 0) return;
      postData.content = content.trim();
      postData.platforms = selectedPlatforms;
    } else {
      if (!existingPostId) return;
      postData.existingPostId = existingPostId;
    }

    if (position === "specific") {
      postData.specificPosition = parseInt(specificPosition);
    }

    onAddPost(postData);

    // Reset form
    setPostType("new");
    setContent("");
    setSelectedPlatforms([]);
    setExistingPostId("");
    setPosition("end");
    setSpecificPosition("1");
    onOpenChange(false);
  };

  const isValid =
    (postType === "new" && content.trim() && selectedPlatforms.length > 0) ||
    (postType === "existing" && existingPostId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Post to Queue</DialogTitle>
          <DialogDescription>
            Add a post to <span className="font-semibold">{queueName}</span>
          </DialogDescription>
        </DialogHeader>

        <Tabs value={postType} onValueChange={(v) => setPostType(v as "new" | "existing")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">Create New Post</TabsTrigger>
            <TabsTrigger value="existing">Select Existing Post</TabsTrigger>
          </TabsList>

          {/* Create New Post */}
          <TabsContent value="new" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="content">
                Content <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="content"
                placeholder="Write your post content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                {content.length} characters
              </p>
            </div>

            <div className="space-y-2">
              <Label>
                Platforms <span className="text-destructive">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center gap-2">
                    <Checkbox
                      id={`platform-${platform}`}
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={() => togglePlatform(platform)}
                    />
                    <Label
                      htmlFor={`platform-${platform}`}
                      className="capitalize cursor-pointer font-normal"
                    >
                      {platform}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Media (Optional)</Label>
              <Button variant="outline" className="w-full" type="button">
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </div>
          </TabsContent>

          {/* Select Existing Post */}
          <TabsContent value="existing" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="existing-post">
                Select Post <span className="text-destructive">*</span>
              </Label>
              <Select value={existingPostId} onValueChange={setExistingPostId}>
                <SelectTrigger id="existing-post">
                  <SelectValue placeholder="Choose a post..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post-1">
                    Check out our latest blog post about...
                  </SelectItem>
                  <SelectItem value="post-2">
                    Exciting announcement coming soon! Stay tuned...
                  </SelectItem>
                  <SelectItem value="post-3">
                    Thank you to our amazing community for...
                  </SelectItem>
                  <SelectItem value="post-4">
                    New feature alert: You can now...
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select from your drafted or scheduled posts
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Position Selection */}
        <div className="space-y-3 pt-4 border-t">
          <Label>Queue Position</Label>
          <RadioGroup value={position} onValueChange={(v) => setPosition(v as typeof position)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="next" id="position-next" />
              <Label htmlFor="position-next" className="font-normal cursor-pointer">
                Next in queue (highest priority)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="end" id="position-end" />
              <Label htmlFor="position-end" className="font-normal cursor-pointer">
                End of queue
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="specific" id="position-specific" />
              <Label htmlFor="position-specific" className="font-normal cursor-pointer">
                Specific position
              </Label>
            </div>
          </RadioGroup>

          {position === "specific" && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="position-number">Position Number</Label>
              <Input
                id="position-number"
                type="number"
                min="1"
                value={specificPosition}
                onChange={(e) => setSpecificPosition(e.target.value)}
                className="w-32"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            <Plus className="mr-2 h-4 w-4" />
            Add to Queue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
