
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Integration } from "@/lib/zod-schemas";
import { format, formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  Calendar,
  Clock,
  Link2,
  RefreshCw,
  Settings,
  Unlink,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { IntegrationStatusBadge } from "./integration-status-badge";

interface IntegrationOverviewProps {
  integration: Integration;
  workspaceId: string;
}

export function IntegrationOverview({
  integration,
  workspaceId,
}: IntegrationOverviewProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Connection refreshed successfully");
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsDisconnecting(true);
    setTimeout(() => {
      setIsDisconnecting(false);
      toast.success("Integration disconnected");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={integration.provider_icon}
                  alt={integration.provider_name}
                />
                <AvatarFallback>
                  {integration.provider_name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {integration.provider_name}
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  {integration.account_name}
                </CardDescription>
                <div className="mt-3">
                  <IntegrationStatusBadge status={integration.status} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Link
                to={`/integrations/${integration.id}/settings`}
              >
                <Button size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Error Message Card */}
      {integration.error_message && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Connection Error</h4>
                <p className="text-sm text-muted-foreground">
                  {integration.error_message}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                Reconnect
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connection Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Information</CardTitle>
          <CardDescription>
            Details about your integration connection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Connected On
              </div>
              <p className="text-sm font-medium">
                {integration.connected_at
                  ? format(new Date(integration.connected_at), "PPP")
                  : "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last Sync
              </div>
              <p className="text-sm font-medium">
                {integration.last_sync_at
                  ? formatDistanceToNow(new Date(integration.last_sync_at), {
                      addSuffix: true,
                    })
                  : "Never"}
              </p>
            </div>
          </div>
          {integration.token_expires_at && (
            <>
              <Separator />
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link2 className="h-4 w-4" />
                  Token Expiry
                </div>
                <p className="text-sm font-medium">
                  {format(new Date(integration.token_expires_at), "PPP")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires{" "}
                  {formatDistanceToNow(new Date(integration.token_expires_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Permissions Card */}
      {integration.permissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Granted Permissions</CardTitle>
            <CardDescription>
              Permissions granted to this integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {integration.permissions.map((permission) => (
                <Badge key={permission} variant="secondary">
                  {permission.replace(/_/g, " ")}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Stats Card */}
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

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions for this integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm mb-1">
                Disconnect Integration
              </h4>
              <p className="text-sm text-muted-foreground">
                Remove this integration and revoke access
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleDisconnect}
              disabled={isDisconnecting}
            >
              <Unlink className="h-4 w-4 mr-2" />
              {isDisconnecting ? "Disconnecting..." : "Disconnect"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
