
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import type { SocialPlatform } from "@/lib/zod-schemas/enums.schema";

interface CreateIncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateIncident: (incident: {
    title: string;
    severity: "critical" | "high" | "medium" | "low";
    description: string;
    platforms: SocialPlatform[];
    channels: string[];
    status: "detected" | "investigating" | "identified" | "monitoring" | "resolved";
  }) => void;
}

const platforms: SocialPlatform[] = ["twitter", "facebook", "instagram", "linkedin", "youtube"];
const severityOptions: ("critical" | "high" | "medium" | "low")[] = ["critical", "high", "medium", "low"];
const statusOptions: ("detected" | "investigating" | "identified" | "monitoring" | "resolved")[] = ["detected", "investigating", "identified", "monitoring", "resolved"];

export function CreateIncidentDialog({
  open,
  onOpenChange,
  onCreateIncident,
}: CreateIncidentDialogProps) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<"critical" | "high" | "medium" | "low">("medium");
  const [description, setDescription] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [channels, setChannels] = useState("");
  const [status, setStatus] = useState<"detected" | "investigating" | "identified" | "monitoring" | "resolved">("detected");

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    onCreateIncident({
      title,
      severity,
      description,
      platforms: selectedPlatforms,
      channels: channels.split(",").map((c) => c.trim()).filter(Boolean),
      status,
    });

    // Reset form
    setTitle("");
    setSeverity("medium");
    setDescription("");
    setSelectedPlatforms([]);
    setChannels("");
    setStatus("detected");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Manual Incident</DialogTitle>
          <DialogDescription>
            Create a new crisis incident to track and manage
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Brief description of the incident"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <Label htmlFor="severity">
              Severity <span className="text-destructive">*</span>
            </Label>
            <Select value={severity} onValueChange={(v) => setSeverity(v as "critical" | "high" | "medium" | "low")}>
              <SelectTrigger id="severity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {severityOptions.map((sev) => (
                  <SelectItem key={sev} value={sev}>
                    <span className="capitalize">{sev}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the incident and its impact"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Affected Platforms */}
          <div className="space-y-2">
            <Label>Affected Platforms</Label>
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

          {/* Affected Channels */}
          <div className="space-y-2">
            <Label htmlFor="channels">Affected Channels</Label>
            <Input
              id="channels"
              placeholder="Comma-separated channel names"
              value={channels}
              onChange={(e) => setChannels(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter channel names separated by commas
            </p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "detected" | "investigating" | "identified" | "monitoring" | "resolved")}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((stat) => (
                  <SelectItem key={stat} value={stat}>
                    <span className="capitalize">{stat}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !description.trim()}
          >
            Create Incident
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
