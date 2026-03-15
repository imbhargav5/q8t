import { IntegrationList } from "@/components/integrations/integration-list";
import { ProviderList } from "@/components/integrations/provider-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getIntegrationsByCategory,
  getProvidersByCategory,
  mockIntegrations,
  providerDefinitions,
} from "@/lib/mock-data";
import {
  Briefcase,
  Image,
  MessageSquare,
  Share2,
  CheckSquare,
} from "lucide-react";
import { useState } from "react";

export function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const categoryIcons = {
    all: <Share2 className="h-4 w-4" />,
    "social-media": <Share2 className="h-4 w-4" />,
    communication: <MessageSquare className="h-4 w-4" />,
    productivity: <CheckSquare className="h-4 w-4" />,
    business: <Briefcase className="h-4 w-4" />,
    media: <Image className="h-4 w-4" />,
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <h1 className="text-2xl font-semibold">Integrations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect and manage your integrations across different platforms
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all" className="gap-2">
                {categoryIcons.all}
                All Connected
              </TabsTrigger>
              <TabsTrigger value="social-media" className="gap-2">
                {categoryIcons["social-media"]}
                Social Media
              </TabsTrigger>
              <TabsTrigger value="communication" className="gap-2">
                {categoryIcons.communication}
                Communication
              </TabsTrigger>
              <TabsTrigger value="productivity" className="gap-2">
                {categoryIcons.productivity}
                Productivity
              </TabsTrigger>
              <TabsTrigger value="business" className="gap-2">
                {categoryIcons.business}
                Business
              </TabsTrigger>
              <TabsTrigger value="media" className="gap-2">
                {categoryIcons.media}
                Media
              </TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <IntegrationList
                integrations={mockIntegrations}
              />
            </TabsContent>

            <TabsContent value="social-media" className="mt-0">
              <IntegrationList
                integrations={getIntegrationsByCategory("social-media")}
                category="social-media"
              />
            </TabsContent>

            <TabsContent value="communication" className="mt-0">
              <IntegrationList
                integrations={getIntegrationsByCategory("communication")}
                category="communication"
              />
            </TabsContent>

            <TabsContent value="productivity" className="mt-0">
              <IntegrationList
                integrations={getIntegrationsByCategory("productivity")}
                category="productivity"
              />
            </TabsContent>

            <TabsContent value="business" className="mt-0">
              <IntegrationList
                integrations={getIntegrationsByCategory("business")}
                category="business"
              />
            </TabsContent>

            <TabsContent value="media" className="mt-0">
              <IntegrationList
                integrations={getIntegrationsByCategory("media")}
                category="media"
              />
            </TabsContent>

            <TabsContent value="available" className="mt-0">
              <div className="space-y-8">
                {/* Social Media */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {categoryIcons["social-media"]}
                    <h2 className="text-lg font-semibold">Social Media</h2>
                    <span className="text-sm text-muted-foreground">
                      ({getProvidersByCategory("social-media").length})
                    </span>
                  </div>
                  <ProviderList
                    providers={getProvidersByCategory("social-media")}
                  />
                </div>

                {/* Communication */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {categoryIcons.communication}
                    <h2 className="text-lg font-semibold">Communication</h2>
                    <span className="text-sm text-muted-foreground">
                      ({getProvidersByCategory("communication").length})
                    </span>
                  </div>
                  <ProviderList
                    providers={getProvidersByCategory("communication")}
                  />
                </div>

                {/* Productivity */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {categoryIcons.productivity}
                    <h2 className="text-lg font-semibold">Productivity</h2>
                    <span className="text-sm text-muted-foreground">
                      ({getProvidersByCategory("productivity").length})
                    </span>
                  </div>
                  <ProviderList
                    providers={getProvidersByCategory("productivity")}
                  />
                </div>

                {/* Business */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {categoryIcons.business}
                    <h2 className="text-lg font-semibold">Business</h2>
                    <span className="text-sm text-muted-foreground">
                      ({getProvidersByCategory("business").length})
                    </span>
                  </div>
                  <ProviderList providers={getProvidersByCategory("business")} />
                </div>

                {/* Media */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {categoryIcons.media}
                    <h2 className="text-lg font-semibold">Media & Storage</h2>
                    <span className="text-sm text-muted-foreground">
                      ({getProvidersByCategory("media").length})
                    </span>
                  </div>
                  <ProviderList providers={getProvidersByCategory("media")} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
