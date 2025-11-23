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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import type { SocialPlatform } from "@/lib/zod-schemas/enums.schema";
import type { PostStatus } from "@/lib/zod-schemas/post.schema";

interface CalendarFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: {
    platforms: SocialPlatform[];
    statuses: PostStatus[];
    assignedTo: string[];
    tags: string[];
    contentType: string[];
  }) => void;
  currentFilters?: {
    platforms?: SocialPlatform[];
    statuses?: PostStatus[];
    assignedTo?: string[];
    tags?: string[];
    contentType?: string[];
  };
}

const platforms: SocialPlatform[] = ["twitter", "facebook", "instagram", "linkedin", "youtube"];

const statuses: PostStatus[] = ["draft", "scheduled", "published", "failed"];

const teamMembers = [
  { id: "user-1", name: "Sarah Johnson" },
  { id: "user-2", name: "Mike Chen" },
  { id: "user-3", name: "Emily Rodriguez" },
  { id: "user-4", name: "David Kim" },
];

const availableTags = [
  "product-launch",
  "announcement",
  "blog-post",
  "promotional",
  "educational",
  "seasonal",
  "user-generated",
  "behind-the-scenes",
];

const contentTypes = [
  { value: "text", label: "Text Only" },
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "link", label: "Link" },
  { value: "carousel", label: "Carousel" },
];

export function CalendarFiltersDialog({
  open,
  onOpenChange,
  onApplyFilters,
  currentFilters = {},
}: CalendarFiltersDialogProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(
    currentFilters.platforms || []
  );
  const [selectedStatuses, setSelectedStatuses] = useState<PostStatus[]>(
    currentFilters.statuses || []
  );
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    currentFilters.assignedTo || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    currentFilters.tags || []
  );
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(
    currentFilters.contentType || []
  );

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleStatus = (status: PostStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleContentType = (type: string) => {
    setSelectedContentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClearAll = () => {
    setSelectedPlatforms([]);
    setSelectedStatuses([]);
    setSelectedMembers([]);
    setSelectedTags([]);
    setSelectedContentTypes([]);
  };

  const handleApply = () => {
    onApplyFilters({
      platforms: selectedPlatforms,
      statuses: selectedStatuses,
      assignedTo: selectedMembers,
      tags: selectedTags,
      contentType: selectedContentTypes,
    });
    onOpenChange(false);
  };

  const activeFilterCount =
    selectedPlatforms.length +
    selectedStatuses.length +
    selectedMembers.length +
    selectedTags.length +
    selectedContentTypes.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <DialogTitle>Filter Calendar</DialogTitle>
              {activeFilterCount > 0 && (
                <Badge variant="secondary">{activeFilterCount} active</Badge>
              )}
            </div>
          </div>
          <DialogDescription>
            Customize which posts appear on your calendar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Platforms */}
          <div className="space-y-3">
            <Label>Platforms</Label>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center gap-2">
                  <Checkbox
                    id={`filter-platform-${platform}`}
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => togglePlatform(platform)}
                  />
                  <Label
                    htmlFor={`filter-platform-${platform}`}
                    className="capitalize cursor-pointer font-normal"
                  >
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <Label>Status</Label>
            <div className="grid grid-cols-2 gap-3">
              {statuses.map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <Checkbox
                    id={`filter-status-${status}`}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => toggleStatus(status)}
                  />
                  <Label
                    htmlFor={`filter-status-${status}`}
                    className="capitalize cursor-pointer font-normal"
                  >
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned To */}
          <div className="space-y-3">
            <Label>Assigned To</Label>
            <div className="grid grid-cols-2 gap-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`filter-member-${member.id}`}
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={() => toggleMember(member.id)}
                  />
                  <Label
                    htmlFor={`filter-member-${member.id}`}
                    className="cursor-pointer font-normal"
                  >
                    {member.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Content Type */}
          <div className="space-y-3">
            <Label>Content Type</Label>
            <div className="grid grid-cols-3 gap-3">
              {contentTypes.map((type) => (
                <div key={type.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`filter-type-${type.value}`}
                    checked={selectedContentTypes.includes(type.value)}
                    onCheckedChange={() => toggleContentType(type.value)}
                  />
                  <Label
                    htmlFor={`filter-type-${type.value}`}
                    className="cursor-pointer font-normal"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={handleClearAll}>
            Clear All
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
            {activeFilterCount > 0 && ` (${activeFilterCount})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
