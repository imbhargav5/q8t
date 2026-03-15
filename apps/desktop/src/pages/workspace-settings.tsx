import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Settings, Users, CreditCard, Building2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkspaceGeneralSettings } from "@/components/settings/workspace-general-settings";
import { WorkspaceMembersSettings } from "@/components/settings/workspace-members-settings";
import { WorkspacePlanSettings } from "@/components/settings/workspace-plan-settings";

export function WorkspaceSettingsPage() {
  const workspaceId = "workspace-1";
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromUrl || "general");

  useEffect(() => {
    if (tabFromUrl && ["general", "members", "plan"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-background">
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Workspace Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your workspace configuration and preferences
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>General</span>
                </TabsTrigger>
                <TabsTrigger value="members" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Members</span>
                </TabsTrigger>
                <TabsTrigger value="plan" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Plan</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <WorkspaceGeneralSettings workspaceId={workspaceId} />
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                <WorkspaceMembersSettings workspaceId={workspaceId} />
              </TabsContent>

              <TabsContent value="plan" className="space-y-4">
                <WorkspacePlanSettings workspaceId={workspaceId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
