
import {
  ExportDialog,
  ExportFormat,
  ExportOption,
} from "../shared/export-dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface ExportAnalyticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDateRange?: string;
}

const formats: ExportFormat[] = [
  { value: "csv", label: "CSV" },
  { value: "xlsx", label: "Excel (XLSX)" },
  { value: "pdf", label: "PDF Report" },
];

const includeOptions: ExportOption[] = [
  {
    id: "charts",
    label: "Include Charts",
    description: "Visual representations of your data",
    defaultChecked: true,
  },
  {
    id: "tables",
    label: "Include Tables",
    description: "Detailed tabular data",
    defaultChecked: true,
  },
  {
    id: "rawData",
    label: "Include Raw Data",
    description: "Unprocessed data points for custom analysis",
    defaultChecked: false,
  },
];

const metricsList = [
  { id: "engagement", label: "Engagement Metrics" },
  { id: "reach", label: "Reach & Impressions" },
  { id: "growth", label: "Follower Growth" },
  { id: "topPosts", label: "Top Performing Posts" },
  { id: "demographics", label: "Audience Demographics" },
  { id: "sentiment", label: "Sentiment Analysis" },
];

export function ExportAnalyticsDialog({
  open,
  onOpenChange,
  currentDateRange = "Last 30 days",
}: ExportAnalyticsDialogProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(
    metricsList.map((m) => m.id)
  );

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricId)
        ? prev.filter((id) => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleExport = (format: string, options: string[]) => {
    console.log("Exporting analytics:", {
      format,
      dateRange: currentDateRange,
      includeOptions: options,
      metrics: selectedMetrics,
    });
    // In a real app, this would trigger the export
  };

  const additionalFields = (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label>Date Range</Label>
        <div className="rounded-md border px-3 py-2 text-sm bg-muted">
          {currentDateRange}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Metrics to Include</Label>
        <div className="space-y-2">
          {metricsList.map((metric) => (
            <div key={metric.id} className="flex items-center gap-2">
              <Checkbox
                id={`metric-${metric.id}`}
                checked={selectedMetrics.includes(metric.id)}
                onCheckedChange={() => toggleMetric(metric.id)}
              />
              <Label
                htmlFor={`metric-${metric.id}`}
                className="font-normal cursor-pointer"
              >
                {metric.label}
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
      title="Export Analytics"
      description="Export your analytics data in your preferred format"
      formats={formats}
      options={includeOptions}
      additionalFields={additionalFields}
      onExport={handleExport}
    />
  );
}
