"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Integration } from "@/lib/zod-schemas";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { IntegrationStatusBadge } from "./integration-status-badge";

interface IntegrationCardProps {
  integration: Integration;
  workspaceId: string;
}

export function IntegrationCard({
  integration,
  workspaceId,
}: IntegrationCardProps) {
  const statusIcons = {
    connected: <CheckCircle2 className="h-4 w-4 text-primary" />,
    error: <AlertCircle className="h-4 w-4 text-destructive" />,
    pending: <Clock className="h-4 w-4 text-muted-foreground" />,
    disconnected: null,
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={integration.provider_icon}
              alt={integration.provider_name}
            />
            <AvatarFallback>
              {integration.provider_name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm truncate">
                {integration.provider_name}
              </h3>
              {statusIcons[integration.status]}
            </div>
            <p className="text-sm text-muted-foreground truncate mb-2">
              {integration.account_name}
            </p>
            <IntegrationStatusBadge status={integration.status} />
          </div>
        </div>
        {integration.last_sync_at && (
          <p className="text-xs text-muted-foreground mt-3">
            Last synced{" "}
            {formatDistanceToNow(new Date(integration.last_sync_at), {
              addSuffix: true,
            })}
          </p>
        )}
        {integration.error_message && (
          <p className="text-xs text-destructive mt-2">
            {integration.error_message}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Link
          href={`/workspace/${workspaceId}/integrations/${integration.id}`}
          className="w-full"
        >
          <Button
            variant={integration.status === "error" ? "destructive" : "outline"}
            className="w-full"
            size="sm"
          >
            {integration.status === "error" ? "Reconnect" : "Configure"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
