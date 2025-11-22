"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { Integration } from "@/lib/zod-schemas";
import { useState } from "react";
import { toast } from "sonner";

interface CloudinarySettingsProps {
  integration: Integration;
}

export function CloudinarySettings({ integration }: CloudinarySettingsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState(
    integration.settings || {
      cloud_name: "chatsian-prod",
      default_folder: "social-media",
      upload_preset: "ml_default",
      auto_optimize: true,
      default_quality: "auto",
    }
  );

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  const storagePercent = integration.stats?.storage_used && integration.stats?.storage_limit
    ? (integration.stats.storage_used / integration.stats.storage_limit) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Cloud Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Cloud Configuration</CardTitle>
          <CardDescription>
            Your Cloudinary cloud details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cloud-name">Cloud Name</Label>
            <Input
              id="cloud-name"
              value={settings.cloud_name}
              readOnly
              disabled
            />
            <p className="text-xs text-muted-foreground">
              This cannot be changed
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="upload-preset">Upload Preset</Label>
            <Select
              value={settings.upload_preset}
              onValueChange={(value) =>
                setSettings({ ...settings, upload_preset: value })
              }
            >
              <SelectTrigger id="upload-preset">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ml_default">ML Default</SelectItem>
                <SelectItem value="unsigned">Unsigned</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Default preset for uploads
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Storage Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Storage & Usage</CardTitle>
          <CardDescription>
            Monitor your storage usage and limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Storage Used</span>
              <span className="text-muted-foreground">
                {((integration.stats?.storage_used || 0) / 1024).toFixed(2)} GB / {((integration.stats?.storage_limit || 0) / 1024).toFixed(2)} GB
              </span>
            </div>
            <Progress value={storagePercent} />
            <p className="text-xs text-muted-foreground">
              {(100 - storagePercent).toFixed(1)}% storage remaining
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="default-folder">Default Upload Folder</Label>
            <Input
              id="default-folder"
              value={settings.default_folder}
              onChange={(e) =>
                setSettings({ ...settings, default_folder: e.target.value })
              }
              placeholder="social-media"
            />
            <p className="text-xs text-muted-foreground">
              Folder path for new uploads
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Media Optimization */}
      <Card>
        <CardHeader>
          <CardTitle>Media Optimization</CardTitle>
          <CardDescription>
            Configure automatic optimization settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-optimize">Auto-Optimize Images</Label>
              <p className="text-xs text-muted-foreground">
                Automatically optimize images on upload
              </p>
            </div>
            <Switch
              id="auto-optimize"
              checked={settings.auto_optimize}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, auto_optimize: checked })
              }
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="default-quality">Default Quality</Label>
            <Select
              value={settings.default_quality}
              onValueChange={(value) =>
                setSettings({ ...settings, default_quality: value })
              }
            >
              <SelectTrigger id="default-quality">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="high">High (80%)</SelectItem>
                <SelectItem value="medium">Medium (60%)</SelectItem>
                <SelectItem value="low">Low (40%)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Default quality for image optimization
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-format">Auto-Format Conversion</Label>
              <p className="text-xs text-muted-foreground">
                Convert images to optimal format (WebP, AVIF)
              </p>
            </div>
            <Switch id="auto-format" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Transformations */}
      <Card>
        <CardHeader>
          <CardTitle>Default Transformations</CardTitle>
          <CardDescription>
            Pre-configured transformation presets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Thumbnail Preset</span>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              w_300,h_300,c_fill,g_auto
            </p>
          </div>
          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Social Media Preset</span>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              w_1200,h_630,c_fill,g_auto,q_auto
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
