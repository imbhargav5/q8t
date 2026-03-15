import { Routes, Route } from "react-router"
import { AppLayout } from "@/components/layout/app-layout"
import { DashboardPage } from "@/pages/dashboard"
import { SocialInboxPage } from "@/pages/social-inbox"
import { ContentCalendarPage } from "@/pages/content-calendar"
import { FeedsPage } from "@/pages/feeds"
import { FeedDetailPage } from "@/pages/feed-detail"
import { CRMPage } from "@/pages/crm"
import { ListeningPage } from "@/pages/listening"
import { AnalyticsPage } from "@/pages/analytics"
import { AutomationsPage } from "@/pages/automations"
import { ComposePage } from "@/pages/compose"
import { CrisisManagementPage } from "@/pages/crisis-management"
import { IntegrationsPage } from "@/pages/integrations"
import { IntegrationDetailPage } from "@/pages/integration-detail"
import { WorkspaceSettingsPage } from "@/pages/workspace-settings"
import { UserSettingsPage } from "@/pages/user-settings"
import { ScreenCapturePage } from "@/pages/screen-capture"

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="social-inbox" element={<SocialInboxPage />} />
        <Route path="content-calendar" element={<ContentCalendarPage />} />
        <Route path="feeds" element={<FeedsPage />} />
        <Route path="feeds/:feedId" element={<FeedDetailPage />} />
        <Route path="crm" element={<CRMPage />} />
        <Route path="listening" element={<ListeningPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="automations" element={<AutomationsPage />} />
        <Route path="compose" element={<ComposePage />} />
        <Route path="crisis-management" element={<CrisisManagementPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="integrations/:integrationId" element={<IntegrationDetailPage />} />
        <Route path="settings" element={<WorkspaceSettingsPage />} />
        <Route path="user/settings" element={<UserSettingsPage />} />
        <Route path="screen-capture" element={<ScreenCapturePage />} />
      </Route>
    </Routes>
  )
}
