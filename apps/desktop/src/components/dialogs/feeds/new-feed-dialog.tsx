
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface NewFeedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFeed: (feed: {
    name: string;
    description: string;
    initialStreams?: string[];
  }) => void;
}

export function NewFeedDialog({
  open,
  onOpenChange,
  onCreateFeed,
}: NewFeedDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [streams, setStreams] = useState<string[]>([]);
  const [streamInput, setStreamInput] = useState("");

  const addStream = () => {
    const stream = streamInput.trim();
    if (stream && !streams.includes(stream)) {
      setStreams([...streams, stream]);
      setStreamInput("");
    }
  };

  const removeStream = (stream: string) => {
    setStreams(streams.filter((s) => s !== stream));
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    onCreateFeed({
      name: name.trim(),
      description: description.trim(),
      initialStreams: streams.length > 0 ? streams : undefined,
    });

    // Reset
    setName("");
    setDescription("");
    setStreams([]);
    setStreamInput("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Feed</DialogTitle>
          <DialogDescription>
            Create a custom feed to organize your social media streams
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Feed Name */}
          <div className="space-y-2">
            <Label htmlFor="feed-name">
              Feed Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="feed-name"
              placeholder="e.g., Morning News, Customer Support, Competition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What is this feed for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Initial Streams */}
          <div className="space-y-2">
            <Label htmlFor="streams">Initial Streams (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="streams"
                placeholder="Add a stream name"
                value={streamInput}
                onChange={(e) => setStreamInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addStream();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addStream}>
                Add
              </Button>
            </div>

            {streams.length > 0 && (
              <div className="space-y-2 mt-3">
                <p className="text-sm text-muted-foreground">
                  {streams.length} stream{streams.length > 1 ? "s" : ""} will be created:
                </p>
                <div className="space-y-1">
                  {streams.map((stream) => (
                    <div
                      key={stream}
                      className="flex items-center justify-between rounded-md border px-3 py-2"
                    >
                      <span className="text-sm">{stream}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStream(stream)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              You can add more streams after creating the feed
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Create Feed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
