"use client";

import {
  ExportDialog,
  ExportFormat,
  ExportOption,
} from "../shared/export-dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import type { Platform } from "@/lib/zod-schemas/enums.schema";

interface ExportCalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formats: ExportFormat[] = [
  { value: "csv", label: "CSV" },
  { value: "xlsx", label: "Excel (XLSX)" },
  { value: "ical", label: "iCalendar (.ics)" },
  { value: "pdf", label: "PDF Calendar" },
];

const includeOptions: ExportOption[] = [
  {
    id: "drafts",
    label: "Include Drafts",
    description: "Export draft posts",
    defaultChecked: false,
  },
  {
    id: "scheduled",
    label: "Include Scheduled",
    description: "Export scheduled posts",
    defaultChecked: true,
  },
  {
    id: "published",
    label: "Include Published",
    description: "Export published posts",
    defaultChecked: true,
  },
];

const platforms: Platform[] = ["twitter", "facebook", "instagram", "linkedin", "youtube"];

export function ExportCalendarDialog({
  open,
  onOpenChange,
}: ExportCalendarDialogProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(platforms);

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleExport = (format: string, options: string[]) => {
    console.log("Exporting calendar:", {
      format,
      dateRange,
      includeOptions: options,
      platforms: selectedPlatforms,
    });
    // In a real app, this would trigger the export
  };

  const additionalFields = (
    <div className="space-y-4">
      {/* Date Range */}
      <div className="space-y-2">
        <Label>Date Range</Label>
        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            className="rounded-md border"
          />
        </div>
        {dateRange?.from && (
          <p className="text-xs text-muted-foreground text-center">
            {format(dateRange.from, "MMM dd, yyyy")}
            {dateRange.to && ` - ${format(dateRange.to, "MMM dd, yyyy")}`}
          </p>
        )}
      </div>

      {/* Platform Filter */}
      <div className="space-y-2">
        <Label>Platforms to Include</Label>
        <div className="grid grid-cols-2 gap-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center gap-2">
              <Checkbox
                id={`export-platform-${platform}`}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={() => togglePlatform(platform)}
              />
              <Label
                htmlFor={`export-platform-${platform}`}
                className="capitalize cursor-pointer font-normal text-sm"
              >
                {platform}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ExportDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Export Calendar"
      description="Export your content calendar in your preferred format"
      formats={formats}
      options={includeOptions}
      additionalFields={additionalFields}
      onExport={handleExport}
    />
  );
}
