"use client";

import { IntegrationOverview } from "@/components/integrations/integration-overview";
import { Button } from "@/components/ui/button";
import { getIntegrationById } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

interface IntegrationDetailPageProps {
  params: Promise<{
    integrationId: string;
  }>;
}

export default function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
  const { integrationId } = use(params);
  const workspaceId = "workspace-1";
  const integration = getIntegrationById(integrationId);

  if (!integration) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href={`integrations`}>
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
            workspaceId={workspaceId}
          />
        </div>
      </div>
    </div>
  );
}
