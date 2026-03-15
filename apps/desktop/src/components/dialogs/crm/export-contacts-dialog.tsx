
import {
  ExportDialog,
  ExportFormat,
  ExportOption,
} from "../shared/export-dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface ExportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFilters?: string;
  totalContacts?: number;
}

const formats: ExportFormat[] = [
  { value: "csv", label: "CSV" },
  { value: "xlsx", label: "Excel (XLSX)" },
  { value: "vcard", label: "vCard" },
];

const includeOptions: ExportOption[] = [
  {
    id: "useFilters",
    label: "Use current filters",
    description: "Only export contacts matching current filter criteria",
    defaultChecked: true,
  },
  {
    id: "includeNotes",
    label: "Include notes",
    description: "Export contact notes and comments",
    defaultChecked: false,
  },
  {
    id: "includeActivities",
    label: "Include activities",
    description: "Export activity history and timeline",
    defaultChecked: false,
  },
];

const fieldsList = [
  { id: "basicInfo", label: "Basic Info (Name, Email, Phone)" },
  { id: "company", label: "Company & Job Title" },
  { id: "address", label: "Address" },
  { id: "socialProfiles", label: "Social Profiles" },
  { id: "tags", label: "Tags & Segments" },
  { id: "customFields", label: "Custom Fields" },
  { id: "dates", label: "Important Dates" },
  { id: "assignedTo", label: "Assigned Team Member" },
];

const segmentsList = [
  { id: "all", label: "All Contacts" },
  { id: "customers", label: "Customers" },
  { id: "leads", label: "Leads" },
  { id: "partners", label: "Partners" },
  { id: "vip", label: "VIP" },
];

export function ExportContactsDialog({
  open,
  onOpenChange,
  currentFilters = "None",
  totalContacts = 0,
}: ExportContactsDialogProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>(
    fieldsList.map((f) => f.id)
  );
  const [selectedSegments, setSelectedSegments] = useState<string[]>(["all"]);

  const toggleField = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const toggleSegment = (segmentId: string) => {
    if (segmentId === "all") {
      setSelectedSegments(["all"]);
    } else {
      const newSegments = selectedSegments.includes(segmentId)
        ? selectedSegments.filter((id) => id !== segmentId)
        : [...selectedSegments.filter((id) => id !== "all"), segmentId];
      setSelectedSegments(newSegments.length > 0 ? newSegments : ["all"]);
    }
  };

  const handleExport = (format: string, options: string[]) => {
    console.log("Exporting contacts:", {
      format,
      includeOptions: options,
      fields: selectedFields,
      segments: selectedSegments,
      filters: currentFilters,
    });
    // In a real app, this would trigger the export
  };

  const additionalFields = (
    <div className="space-y-4">
      {/* Current Filters Info */}
      <div className="space-y-2">
        <Label>Active Filters</Label>
        <div className="rounded-md border px-3 py-2 text-sm bg-muted">
          {currentFilters} • {totalContacts} contacts
        </div>
      </div>

      {/* Fields to Export */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Fields to Export</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setSelectedFields(
                selectedFields.length === fieldsList.length
                  ? []
                  : fieldsList.map((f) => f.id)
              )
            }
          >
            {selectedFields.length === fieldsList.length
              ? "Deselect All"
              : "Select All"}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {fieldsList.map((field) => (
            <div key={field.id} className="flex items-center gap-2">
              <Checkbox
                id={`field-${field.id}`}
                checked={selectedFields.includes(field.id)}
                onCheckedChange={() => toggleField(field.id)}
              />
              <Label
                htmlFor={`field-${field.id}`}
                className="font-normal cursor-pointer text-sm"
              >
                {field.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Segments */}
      <div className="space-y-2">
        <Label>Segments</Label>
        <div className="space-y-2">
          {segmentsList.map((segment) => (
            <div key={segment.id} className="flex items-center gap-2">
              <Checkbox
                id={`segment-${segment.id}`}
                checked={selectedSegments.includes(segment.id)}
                onCheckedChange={() => toggleSegment(segment.id)}
              />
              <Label
                htmlFor={`segment-${segment.id}`}
                className="font-normal cursor-pointer"
              >
                {segment.label}
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
      title="Export Contacts"
      description="Export your contacts in your preferred format"
      formats={formats}
      options={includeOptions}
      additionalFields={additionalFields}
      onExport={handleExport}
    />
  );
}

