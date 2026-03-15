
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { SocialPlatform } from "@/lib/zod-schemas/enums.schema";

interface AddStreamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feedName: string;
  onAddStream: (stream: {
    type: string;
    name: string;
    platform: SocialPlatform;
    query: string;
    autoRefresh: boolean;
    refreshInterval?: number;
  }) => void;
}

const streamTypes = [
  {
    value: "mentions",
    label: "Mentions",
    description: "Monitor mentions of specific keywords or accounts",
  },
  {
    value: "hashtags",
    label: "Hashtags",
    description: "Track specific hashtags",
  },
  {
    value: "user",
    label: "User Timeline",
    description: "Follow a specific user's posts",
  },
  {
    value: "list",
    label: "List",
    description: "Monitor a curated list",
  },
  {
    value: "search",
    label: "Search",
    description: "Advanced search query",
  },
];

const platforms: SocialPlatform[] = ["twitter", "facebook", "instagram", "linkedin", "youtube"];

const refreshIntervals = [
  { value: "1", label: "1 minute" },
  { value: "5", label: "5 minutes" },
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
];

export function AddStreamDialog({
  open,
  onOpenChange,
  feedName,
  onAddStream,
}: AddStreamDialogProps) {
  const [streamType, setStreamType] = useState("mentions");
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState<SocialPlatform>("twitter");
  const [query, setQuery] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("5");

  const getQueryPlaceholder = () => {
    switch (streamType) {
      case "mentions":
        return "@username or keyword";
      case "hashtags":
        return "#hashtag (without #)";
      case "user":
        return "@username";
      case "list":
        return "List name or ID";
      case "search":
        return "Advanced search query";
      default:
        return "Enter query";
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !query.trim()) return;

    onAddStream({
      type: streamType,
      name: name.trim(),
      platform,
      query: query.trim(),
      autoRefresh,
      refreshInterval: autoRefresh ? parseInt(refreshInterval) : undefined,
    });

    // Reset
    setStreamType("mentions");
    setName("");
    setPlatform("twitter");
    setQuery("");
    setAutoRefresh(true);
    setRefreshInterval("5");
    onOpenChange(false);
  };

  const selectedType = streamTypes.find((t) => t.value === streamType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add Stream</DialogTitle>
          <DialogDescription>
            Add a new stream to <span className="font-semibold">{feedName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Stream Type */}
          <div className="space-y-2">
            <Label htmlFor="stream-type">
              Stream Type <span className="text-destructive">*</span>
            </Label>
            <Select value={streamType} onValueChange={setStreamType}>
              <SelectTrigger id="stream-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {streamTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stream Name */}
          <div className="space-y-2">
            <Label htmlFor="stream-name">
              Stream Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="stream-name"
              placeholder={`e.g., ${selectedType?.label} Stream`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* SocialPlatform */}
          <div className="space-y-2">
            <Label htmlFor="platform">
              SocialPlatform <span className="text-destructive">*</span>
            </Label>
            <Select value={platform} onValueChange={(v) => setPlatform(v as SocialPlatform)}>
              <SelectTrigger id="platform">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p} value={p}>
                    <span className="capitalize">{p}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Query/Settings */}
          <div className="space-y-2">
            <Label htmlFor="query">
              {streamType === "search" ? "Search Query" : "Query"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="query"
              placeholder={getQueryPlaceholder()}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {streamType === "hashtags" && (
              <p className="text-xs text-muted-foreground">
                Enter hashtag without the # symbol
              </p>
            )}
          </div>

          {/* Auto-refresh Toggle */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="auto-refresh" className="cursor-pointer">
                Auto-refresh
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically fetch new posts
              </p>
            </div>
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
          </div>

          {/* Refresh Interval */}
          {autoRefresh && (
            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Refresh Interval</Label>
              <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                <SelectTrigger id="refresh-interval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {refreshIntervals.map((interval) => (
                    <SelectItem key={interval.value} value={interval.value}>
                      {interval.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || !query.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Stream
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
