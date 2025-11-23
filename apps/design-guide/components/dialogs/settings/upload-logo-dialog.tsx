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
import { Upload, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface UploadLogoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (logo: {
    file: File;
    altText: string;
    preview: string;
  }) => void;
}

export function UploadLogoDialog({
  open,
  onOpenChange,
  onUpload,
}: UploadLogoDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [altText, setAltText] = useState("");
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file || !preview) return;

    onUpload({
      file,
      altText: altText.trim(),
      preview,
    });

    // Reset
    setFile(null);
    setPreview("");
    setAltText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload Workspace Logo</DialogTitle>
          <DialogDescription>
            Upload an image to use as your workspace logo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Logo Image</Label>
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
              {!preview ? (
                <>
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">
                    Drag and drop your logo here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    or click to browse
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    PNG, JPG, or SVG (Max 2MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </>
              ) : (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Logo preview"
                    className="mx-auto max-h-48 rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFile(null);
                      setPreview("");
                    }}
                  >
                    Change Image
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Preview in different sizes */}
          {preview && (
            <div className="space-y-3">
              <Label>Preview</Label>
              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg border bg-muted">
                <div className="text-center space-y-2">
                  <img
                    src={preview}
                    alt="Small preview"
                    className="mx-auto h-8 rounded"
                  />
                  <p className="text-xs text-muted-foreground">Small (32px)</p>
                </div>
                <div className="text-center space-y-2">
                  <img
                    src={preview}
                    alt="Medium preview"
                    className="mx-auto h-12 rounded"
                  />
                  <p className="text-xs text-muted-foreground">Medium (48px)</p>
                </div>
                <div className="text-center space-y-2">
                  <img
                    src={preview}
                    alt="Large preview"
                    className="mx-auto h-16 rounded"
                  />
                  <p className="text-xs text-muted-foreground">Large (64px)</p>
                </div>
              </div>
            </div>
          )}

          {/* Alt Text */}
          <div className="space-y-2">
            <Label htmlFor="alt-text">
              Alternative Text (for accessibility)
            </Label>
            <Input
              id="alt-text"
              placeholder="e.g., Acme Corp Logo"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Describe the logo for screen readers
            </p>
          </div>

          {/* File Info */}
          {file && (
            <div className="rounded-lg bg-green-50 dark:bg-green-950 p-3">
              <div className="flex items-center gap-2 text-green-900 dark:text-green-100">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <p className="text-xs text-green-800 dark:text-green-200 mt-1">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Logo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
