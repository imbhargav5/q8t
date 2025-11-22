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
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface XSettingsProps {
  integration: Integration;
}

export function XSettings({ integration }: XSettingsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [settings, setSettings] = useState<{
    default_visibility: string;
    auto_retweet_mentions: boolean;
    enable_webhooks: boolean;
  }>(
    (integration.settings as any) || {
      default_visibility: "public",
      auto_retweet_mentions: false,
      enable_webhooks: false,
    }
  );

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  const handleRefreshToken = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Token refreshed successfully");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Manage your X (Twitter) authentication credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Token Status</Label>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">
                  {integration.status === "connected"
                    ? "Active"
                    : integration.status === "error"
                      ? "Expired"
                      : "Pending"}
                </p>
                {integration.token_expires_at && (
                  <p className="text-xs text-muted-foreground">
                    Expires on{" "}
                    {format(new Date(integration.token_expires_at), "PPP")}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshToken}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh Token
              </Button>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Account Information</Label>
            <div className="rounded-lg border p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Username</span>
                <span className="font-medium">{integration.account_name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account ID</span>
                <span className="font-mono text-xs">
                  {integration.account_identifier}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>
            Scopes granted to this integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {integration.permissions.map((permission) => (
              <div
                key={permission}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {permission.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {permission === "read_tweets" &&
                      "Read your tweets and timeline"}
                    {permission === "write_tweets" &&
                      "Post tweets on your behalf"}
                    {permission === "manage_dms" &&
                      "Send and receive direct messages"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posting Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Posting Preferences</CardTitle>
          <CardDescription>
            Configure default settings for posting to X
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-visibility">Default Visibility</Label>
            <Select
              value={settings.default_visibility}
              onValueChange={(value) =>
                setSettings({ ...settings, default_visibility: value })
              }
            >
              <SelectTrigger id="default-visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Default visibility for new tweets
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-retweet">Auto-retweet Mentions</Label>
              <p className="text-xs text-muted-foreground">
                Automatically retweet when mentioned
              </p>
            </div>
            <Switch
              id="auto-retweet"
              checked={settings.auto_retweet_mentions}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, auto_retweet_mentions: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Rate Limits */}
      {integration.stats && (
        <Card>
          <CardHeader>
            <CardTitle>API Rate Limits</CardTitle>
            <CardDescription>Current API usage and limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Daily API Calls</span>
                <span className="text-muted-foreground">
                  {integration.stats.api_calls_today?.toLocaleString() || 0} /{" "}
                  {integration.stats.api_calls_limit?.toLocaleString() || 0}
                </span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${((integration.stats.api_calls_today || 0) / (integration.stats.api_calls_limit || 1)) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Rate limit resets daily at midnight UTC
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advanced */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Advanced configuration options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="webhooks">Enable Webhooks</Label>
              <p className="text-xs text-muted-foreground">
                Receive real-time updates via webhooks
              </p>
            </div>
            <Switch
              id="webhooks"
              checked={settings.enable_webhooks}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enable_webhooks: checked })
              }
            />
          </div>
          {settings.enable_webhooks && (
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-domain.com/webhooks/x"
                type="url"
              />
              <p className="text-xs text-muted-foreground">
                Endpoint to receive webhook events
              </p>
            </div>
          )}
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
