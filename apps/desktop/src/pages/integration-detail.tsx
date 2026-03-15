import { useParams, useNavigate, Link } from "react-router";
import { IntegrationOverview } from "@/components/integrations/integration-overview";
import { Button } from "@/components/ui/button";
import { getIntegrationById } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";

export function IntegrationDetailPage() {
  const { integrationId } = useParams();
  const navigate = useNavigate();
  const workspaceId = "workspace-1";
  const integration = getIntegrationById(integrationId!);

  if (!integration) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Integration not found</h2>
          <p className="text-muted-foreground mb-4">
            The integration you're looking for doesn't exist.
          </p>
          <Link to="/integrations">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Integrations
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/integrations">
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
