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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { ReactNode, useState } from "react";

export interface ExportFormat {
  value: string;
  label: string;
}

export interface ExportOption {
  id: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
}

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  formats: ExportFormat[];
  options?: ExportOption[];
  additionalFields?: ReactNode;
  onExport: (format: string, selectedOptions: string[]) => void;
}

export function ExportDialog({
  open,
  onOpenChange,
  title,
  description = "Choose your export format and options",
  formats,
  options = [],
  additionalFields,
  onExport,
}: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>(
    formats[0]?.value || ""
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    options.filter((opt) => opt.defaultChecked).map((opt) => opt.id)
  );

  const handleExport = () => {
    onExport(selectedFormat, selectedOptions);
    onOpenChange(false);
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label htmlFor="export-format">Export Format</Label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger id="export-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Fields */}
          {additionalFields && <div>{additionalFields}</div>}

          {/* Options Checkboxes */}
          {options.length > 0 && (
            <div className="space-y-3">
              <Label>Export Options</Label>
              <div className="space-y-3">
                {options.map((option) => (
                  <div key={option.id} className="flex items-start gap-3">
                    <Checkbox
                      id={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onCheckedChange={() => toggleOption(option.id)}
                    />
                    <div className="space-y-0.5">
                      <Label
                        htmlFor={option.id}
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      {option.description && (
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
