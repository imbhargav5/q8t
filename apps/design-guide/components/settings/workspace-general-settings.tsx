"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockWorkspace } from "@/lib/mock-data";
import { Building2, Save, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WorkspaceGeneralSettingsProps {
  workspaceId: string;
}

export function WorkspaceGeneralSettings({ workspaceId }: WorkspaceGeneralSettingsProps) {
  const [workspace, setWorkspace] = useState(mockWorkspace);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Workspace Identity */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Identity</CardTitle>
          <CardDescription>
            Update your workspace name and logo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input
              id="workspace-name"
              value={workspace.name}
              onChange={(e) => setWorkspace({ ...workspace, name: e.target.value })}
              placeholder="Enter workspace name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workspace-slug">Workspace URL</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">chatsian.app/</span>
              <Input
                id="workspace-slug"
                value={workspace.slug}
                onChange={(e) => setWorkspace({ ...workspace, slug: e.target.value })}
                placeholder="workspace-slug"
                className="max-w-xs"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This is your workspace's unique URL identifier
            </p>
          </div>

          <div className="space-y-2">
            <Label>Workspace Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                {workspace.logo_url ? (
                  <img src={workspace.logo_url} alt="Workspace logo" className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <Building2 className="h-8 w-8 text-muted-foreground/50" />
                )}
              </div>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended size: 256x256px. Max file size: 2MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>
            Customize your workspace colors and appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="primary-color"
                  type="color"
                  value={workspace.branding.primary_color}
                  onChange={(e) => setWorkspace({
                    ...workspace,
                    branding: { ...workspace.branding, primary_color: e.target.value }
                  })}
                  className="h-10 w-16 rounded border cursor-pointer"
                />
                <Input
                  value={workspace.branding.primary_color}
                  onChange={(e) => setWorkspace({
                    ...workspace,
                    branding: { ...workspace.branding, primary_color: e.target.value }
                  })}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="secondary-color"
                  type="color"
                  value={workspace.branding.secondary_color}
                  onChange={(e) => setWorkspace({
                    ...workspace,
                    branding: { ...workspace.branding, secondary_color: e.target.value }
                  })}
                  className="h-10 w-16 rounded border cursor-pointer"
                />
                <Input
                  value={workspace.branding.secondary_color}
                  onChange={(e) => setWorkspace({
                    ...workspace,
                    branding: { ...workspace.branding, secondary_color: e.target.value }
                  })}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div
              className="h-8 w-8 rounded border"
              style={{ backgroundColor: workspace.branding.primary_color }}
            />
            <div
              className="h-8 w-8 rounded border"
              style={{ backgroundColor: workspace.branding.secondary_color }}
            />
            <span className="text-sm text-muted-foreground">Color preview</span>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Preferences</CardTitle>
          <CardDescription>
            Set your workspace timezone and locale settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={workspace.settings.timezone}
                onValueChange={(value) => setWorkspace({
                  ...workspace,
                  settings: { ...workspace.settings, timezone: value }
                })}
              >
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={workspace.settings.language}
                onValueChange={(value) => setWorkspace({
                  ...workspace,
                  settings: { ...workspace.settings, language: value }
                })}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select
                value={workspace.settings.date_format}
                onValueChange={(value) => setWorkspace({
                  ...workspace,
                  settings: { ...workspace.settings, date_format: value }
                })}
              >
                <SelectTrigger id="date-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-format">Time Format</Label>
              <Select
                value={workspace.settings.time_format}
                onValueChange={(value: "12h" | "24h") => setWorkspace({
                  ...workspace,
                  settings: { ...workspace.settings, time_format: value }
                })}
              >
                <SelectTrigger id="time-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                  <SelectItem value="24h">24-hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
