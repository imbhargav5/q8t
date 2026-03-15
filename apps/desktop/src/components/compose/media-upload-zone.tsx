
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Image as ImageIcon,
  Video,
  Upload,
  X,
  FileImage,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PostMedia } from "@/lib/zod-schemas";
import { toast } from "sonner";

interface MediaUploadZoneProps {
  media: PostMedia[];
  onMediaChange: (media: PostMedia[]) => void;
  maxFiles?: number;
}

export function MediaUploadZone({
  media,
  onMediaChange,
  maxFiles = 10,
}: MediaUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    },
    [media]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      handleFiles(files);
    },
    [media]
  );

  const handleFiles = (files: File[]) => {
    if (media.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Create mock media objects (in real app, would upload to server)
    const newMedia: PostMedia[] = files.map((file) => ({
      id: crypto.randomUUID(),
      type: file.type.startsWith("video/") ? "video" : ("image" as any),
      url: URL.createObjectURL(file),
      thumbnail_url: URL.createObjectURL(file),
      alt_text: null,
      width: null,
      height: null,
      duration_seconds: file.type.startsWith("video/") ? 30 : null,
    }));

    onMediaChange([...media, ...newMedia]);
    toast.success(`${files.length} file(s) added`);
  };

  const removeMedia = (id: string) => {
    onMediaChange(media.filter((m) => m.id !== id));
  };

  const updateAltText = (id: string, altText: string) => {
    onMediaChange(
      media.map((m) => (m.id === id ? { ...m, alt_text: altText } : m))
    );
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-3 rounded-full bg-muted">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Drag and drop media files here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse (Max {maxFiles} files)
            </p>
          </div>
          <div className="flex gap-2">
            <label htmlFor="image-upload">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Image
                </span>
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>

            <label htmlFor="video-upload">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>
                  <Video className="h-4 w-4 mr-2" />
                  Add Video
                </span>
              </Button>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button type="button" variant="ghost" size="sm" disabled>
              <ImageIcon className="h-4 w-4 mr-2" />
              Canva
            </Button>
            <Button type="button" variant="ghost" size="sm" disabled>
              <FileImage className="h-4 w-4 mr-2" />
              Google Drive
            </Button>
            <Button type="button" variant="ghost" size="sm" disabled>
              <Upload className="h-4 w-4 mr-2" />
              Dropbox
            </Button>
          </div>
        </div>
      </div>

      {/* Media Preview Grid */}
      {media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="relative overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.alt_text || ""}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Remove button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => removeMedia(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Alt text input */}
                <div className="p-2">
                  <Input
                    placeholder="Alt text (optional)"
                    value={item.alt_text || ""}
                    onChange={(e) => updateAltText(item.id, e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
