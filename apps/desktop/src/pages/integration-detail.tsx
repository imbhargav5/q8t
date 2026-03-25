import { useParams, Link } from "react-router"
import { Button } from "@/components/ui/button"
import { XSettings } from "@/components/integrations/integration-settings/x-settings"
import { ArrowLeft } from "lucide-react"

const PLATFORM_NAMES: Record<string, string> = {
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  threads: "Threads",
}

export function IntegrationDetailPage() {
  const { integrationId } = useParams()
  const platform = integrationId ?? "x"
  const platformName = PLATFORM_NAMES[platform] ?? platform

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
            <h1 className="text-2xl font-semibold">{platformName}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your {platformName} account connection
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-6">
          {platform === "x" ? (
            <XSettings />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">{platformName} integration</p>
              <p className="text-sm mt-2">Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
