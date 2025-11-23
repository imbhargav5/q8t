"use client";

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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import type { SocialPlatform } from "@/lib/zod-schemas/enums.schema";

interface CreateRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateRule: (rule: {
    name: string;
    description: string;
    keywords: string[];
    platforms: SocialPlatform[];
    threshold: number;
    thresholdUnit: string;
    severity: "critical" | "high" | "medium" | "low";
    active: boolean;
  }) => void;
}

const platforms: SocialPlatform[] = ["twitter", "facebook", "instagram", "linkedin", "youtube"];
const severityOptions: ("critical" | "high" | "medium" | "low")[] = ["critical", "high", "medium", "low"];
const thresholdUnits = [
  { value: "mentions_hour", label: "mentions/hour" },
  { value: "mentions_day", label: "mentions/day" },
  { value: "sentiment_drop", label: "% sentiment drop" },
];

export function CreateRuleDialog({
  open,
  onOpenChange,
  onCreateRule,
}: CreateRuleDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [threshold, setThreshold] = useState("50");
  const [thresholdUnit, setThresholdUnit] = useState("mentions_hour");
  const [severity, setSeverity] = useState<"critical" | "high" | "medium" | "low">("medium");
  const [active, setActive] = useState(true);

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const addKeyword = () => {
    const keyword = keywordInput.trim();
    if (keyword && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || keywords.length === 0) return;

    onCreateRule({
      name: name.trim(),
      description: description.trim(),
      keywords,
      platforms: selectedPlatforms,
      threshold: parseInt(threshold),
      thresholdUnit,
      severity,
      active,
    });

    // Reset form
    setName("");
    setDescription("");
    setKeywords([]);
    setKeywordInput("");
    setSelectedPlatforms([]);
    setThreshold("50");
    setThresholdUnit("mentions_hour");
    setSeverity("medium");
    setActive(true);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Detection Rule</DialogTitle>
          <DialogDescription>
            Set up automated detection for potential crisis situations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Rule Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Rule Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Negative Sentiment Spike"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What does this rule detect?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords">
              Keywords <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="keywords"
                placeholder="Type a keyword and press Enter"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button type="button" variant="outline" onClick={addKeyword}>
                Add
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="gap-1">
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <Label>Platforms to Monitor</Label>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center gap-2">
                  <Checkbox
                    id={`rule-platform-${platform}`}
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => togglePlatform(platform)}
                  />
                  <Label
                    htmlFor={`rule-platform-${platform}`}
                    className="capitalize cursor-pointer font-normal"
                  >
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Threshold */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">Threshold</Label>
              <Input
                id="threshold"
                type="number"
                min="1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threshold-unit">Unit</Label>
              <Select value={thresholdUnit} onValueChange={setThresholdUnit}>
                <SelectTrigger id="threshold-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {thresholdUnits.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <Label htmlFor="severity">Incident Severity</Label>
            <Select
              value={severity}
              onValueChange={(v) => setSeverity(v as "critical" | "high" | "medium" | "low")}
            >
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

          {/* Active Status */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="active" className="cursor-pointer">
                Activate Rule
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable this rule immediately after creation
              </p>
            </div>
            <Switch
              id="active"
              checked={active}
              onCheckedChange={setActive}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || keywords.length === 0}
          >
            Create Rule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
