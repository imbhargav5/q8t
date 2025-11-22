"use client";

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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { Integration } from "@/lib/zod-schemas";
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GenericSettingsProps {
  integration: Integration;
}

export function GenericSettings({ integration }: GenericSettingsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
            Manage your {integration.provider_name} authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Connection Status</Label>
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
                Refresh
              </Button>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Account Information</Label>
            <div className="rounded-lg border p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account</span>
                <span className="font-medium">{integration.account_name}</span>
              </div>
              {integration.account_identifier && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ID</span>
                  <span className="font-mono text-xs">
                    {integration.account_identifier}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      {integration.permissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>
              Scopes granted to this integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {integration.permissions.map((permission) => (
                <Badge key={permission} variant="secondary">
                  {permission.replace(/_/g, " ").replace(/\./g, " ")}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
          <CardDescription>
            Configure your {integration.provider_name} integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-sync">Auto-Sync</Label>
              <p className="text-xs text-muted-foreground">
                Automatically sync data with {integration.provider_name}
              </p>
            </div>
            <Switch id="auto-sync" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications</Label>
              <p className="text-xs text-muted-foreground">
                Receive notifications for updates
              </p>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      {integration.stats && (
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>Current usage and limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {integration.stats.api_calls_today !== undefined &&
              integration.stats.api_calls_limit !== undefined && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">API Calls Today</span>
                    <span className="text-muted-foreground">
                      {integration.stats.api_calls_today.toLocaleString()} /{" "}
                      {integration.stats.api_calls_limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={
                      (integration.stats.api_calls_today /
                        integration.stats.api_calls_limit) *
                      100
                    }
                  />
                </div>
              )}
            {integration.stats.storage_used !== undefined &&
              integration.stats.storage_limit !== undefined && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Storage Used</span>
                    <span className="text-muted-foreground">
                      {(integration.stats.storage_used / 1024).toFixed(2)} GB /{" "}
                      {(integration.stats.storage_limit / 1024).toFixed(2)} GB
                    </span>
                  </div>
                  <Progress
                    value={
                      (integration.stats.storage_used /
                        integration.stats.storage_limit) *
                      100
                    }
                  />
                </div>
              )}
            {integration.stats.items_synced !== undefined && (
              <div className="space-y-1">
                <span className="text-sm font-medium">Items Synced</span>
                <p className="text-2xl font-bold">
                  {integration.stats.items_synced.toLocaleString()}
                </p>
              </div>
            )}
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
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder={`https://your-domain.com/webhooks/${integration.provider}`}
            />
            <p className="text-xs text-muted-foreground">
              Endpoint to receive webhook events
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
