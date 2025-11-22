"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Integration, IntegrationCategory } from "@/lib/zod-schemas";
import { AlertCircle } from "lucide-react";
import { IntegrationCard } from "./integration-card";

interface IntegrationListProps {
  integrations: Integration[];
  workspaceId: string;
  category?: IntegrationCategory;
}

export function IntegrationList({
  integrations,
  workspaceId,
  category,
}: IntegrationListProps) {
  if (integrations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">No integrations found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            {category
              ? `You haven't connected any ${category.replace("-", " ")} integrations yet.`
              : "You haven't connected any integrations yet. Connect your first integration to get started."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          workspaceId={workspaceId}
        />
      ))}
    </div>
  );
}
