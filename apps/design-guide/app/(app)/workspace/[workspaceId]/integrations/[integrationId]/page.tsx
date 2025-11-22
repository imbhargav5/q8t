"use client";

import { IntegrationOverview } from "@/components/integrations/integration-overview";
import { Button } from "@/components/ui/button";
import { getIntegrationById } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IntegrationDetailPageProps {
  params: {
    workspaceId: string;
    integrationId: string;
  };
}

export default function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
  const integration = getIntegrationById(params.integrationId);

  if (!integration) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href={`/workspace/${params.workspaceId}/integrations`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Integration Details</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your integration settings
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6">
          <IntegrationOverview
            integration={integration}
            workspaceId={params.workspaceId}
          />
        </div>
      </div>
    </div>
  );
}
