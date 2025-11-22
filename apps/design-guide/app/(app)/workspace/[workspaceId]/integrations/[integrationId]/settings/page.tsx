"use client";

import { CloudinarySettings } from "@/components/integrations/integration-settings/cloudinary-settings";
import { GenericSettings } from "@/components/integrations/integration-settings/generic-settings";
import { SlackSettings } from "@/components/integrations/integration-settings/slack-settings";
import { XSettings } from "@/components/integrations/integration-settings/x-settings";
import { Button } from "@/components/ui/button";
import { getIntegrationById } from "@/lib/mock-data";
import type { IntegrationProvider } from "@/lib/zod-schemas";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

interface IntegrationSettingsPageProps {
  params: Promise<{
    workspaceId: string;
    integrationId: string;
  }>;
}

export default function IntegrationSettingsPage({
  params,
}: IntegrationSettingsPageProps) {
  const { workspaceId, integrationId } = use(params);
  const integration = getIntegrationById(integrationId);

  if (!integration) {
    notFound();
  }

  // Map providers to their specific settings components
  const renderSettings = () => {
    const settingsMap: Partial<
      Record<
        IntegrationProvider,
        (integration: typeof integration) => JSX.Element
      >
    > = {
      x: (int) => <XSettings integration={int} />,
      slack: (int) => <SlackSettings integration={int} />,
      cloudinary: (int) => <CloudinarySettings integration={int} />,
      // Add more specific settings components as needed
      // For now, all others will use GenericSettings
    };

    const SettingsComponent = settingsMap[integration.provider];

    if (SettingsComponent) {
      return SettingsComponent(integration);
    }

    // Default to generic settings for all other providers
    return <GenericSettings integration={integration} />;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/workspace/${workspaceId}/integrations/${integrationId}`}
          >
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">
              {integration.provider_name} Settings
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your {integration.provider_name} integration settings
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6">{renderSettings()}</div>
      </div>
    </div>
  );
}
