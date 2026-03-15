
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Integration } from "@/lib/zod-schemas";
import { Hash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SlackSettingsProps {
  integration: Integration;
}

const mockChannels = [
  { id: "C001", name: "general", members: 45, private: false },
  { id: "C002", name: "support", members: 12, private: false },
  { id: "C003", name: "announcements", members: 67, private: false },
  { id: "C004", name: "dev-team", members: 8, private: true },
];

export function SlackSettings({ integration }: SlackSettingsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<{
    bot_name: string;
    default_channel: string;
    enable_notifications: boolean;
  }>(
    (integration.settings as any) || {
      bot_name: "Chatsian Bot",
      default_channel: "#general",
      enable_notifications: true,
    }
  );

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Workspace Info */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Information</CardTitle>
          <CardDescription>
            Details about your connected Slack workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Workspace Name</Label>
            <div className="rounded-lg border p-3">
              <p className="text-sm font-medium">{integration.account_name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Team ID: {integration.account_identifier}
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Accessible Channels
              </p>
              <p className="text-2xl font-bold">{mockChannels.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Members</p>
              <p className="text-2xl font-bold">
                {mockChannels.reduce((sum, ch) => sum + ch.members, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channel Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Permissions</CardTitle>
          <CardDescription>
            Channels accessible by this integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockChannels.map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{channel.members}</TableCell>
                  <TableCell>
                    <Badge variant={channel.private ? "secondary" : "outline"}>
                      {channel.private ? "Private" : "Public"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bot Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Bot Configuration</CardTitle>
          <CardDescription>
            Configure your Slack bot settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bot-name">Bot Name</Label>
            <Input
              id="bot-name"
              value={settings.bot_name}
              onChange={(e) =>
                setSettings({ ...settings, bot_name: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Display name for your bot in Slack
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="default-channel">Default Channel</Label>
            <Input
              id="default-channel"
              value={settings.default_channel}
              onChange={(e) =>
                setSettings({ ...settings, default_channel: e.target.value })
              }
              placeholder="#general"
            />
            <p className="text-xs text-muted-foreground">
              Default channel for posting messages
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configure notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-notifications">Enable Notifications</Label>
              <p className="text-xs text-muted-foreground">
                Receive notifications for important events
              </p>
            </div>
            <Switch
              id="enable-notifications"
              checked={settings.enable_notifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enable_notifications: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Webhook and API configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://hooks.slack.com/services/..."
              readOnly
            />
            <p className="text-xs text-muted-foreground">
              Use this webhook URL to send messages to Slack
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
