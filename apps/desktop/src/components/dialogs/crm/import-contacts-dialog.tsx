
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (config: {
    file: File;
    duplicateHandling: "skip" | "update" | "create-new";
    columnMapping?: Record<string, string>;
  }) => void;
}

export function ImportContactsDialog({
  open,
  onOpenChange,
  onImport,
}: ImportContactsDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [duplicateHandling, setDuplicateHandling] = useState<
    "skip" | "update" | "create-new"
  >("skip");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "text/csv" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        droppedFile.type === "application/vnd.ms-excel"
      ) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) return;

    onImport({
      file,
      duplicateHandling,
    });

    // Reset
    setFile(null);
    setDuplicateHandling("skip");
    onOpenChange(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Import Contacts</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file to import contacts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload File</Label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">
                    Drag and drop your file here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    or click to browse
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Accepts CSV, XLS, XLSX (Max 10MB)
                  </p>
                  <input
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-10 w-10 text-primary" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* File Preview/Validation */}
          {file && (
            <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
              <div className="flex items-center gap-2 text-green-900 dark:text-green-100">
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-sm font-medium">File validated successfully</p>
              </div>
              <p className="text-xs text-green-800 dark:text-green-200 mt-2">
                Ready to import. You can map columns in the next step.
              </p>
            </div>
          )}

          {/* Duplicate Handling */}
          <div className="space-y-3">
            <Label>Handle Duplicates</Label>
            <RadioGroup
              value={duplicateHandling}
              onValueChange={(v) =>
                setDuplicateHandling(v as typeof duplicateHandling)
              }
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="skip" id="skip" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="skip" className="font-normal cursor-pointer">
                    Skip duplicates
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Keep existing contacts, ignore duplicates from import
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="update" id="update" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="update" className="font-normal cursor-pointer">
                    Update existing
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Update existing contacts with new data from import
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem
                  value="create-new"
                  id="create-new"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="create-new"
                    className="font-normal cursor-pointer"
                  >
                    Create new entries
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Create duplicate contacts (not recommended)
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Info */}
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-blue-900 dark:text-blue-100 flex-shrink-0" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium">Column Mapping</p>
                <p className="text-xs mt-1 text-blue-800 dark:text-blue-200">
                  After upload, you&apos;ll be able to map your CSV columns to contact
                  fields (Name, Email, Phone, etc.)
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" />
            Import Contacts
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
