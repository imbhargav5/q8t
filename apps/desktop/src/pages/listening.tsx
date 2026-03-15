import { useState } from "react";
import { ListenerQueryList } from "@/components/listening/query-list";
import { ListenerMentionList } from "@/components/listening/mention-list";
import { ListenerMentionDetail } from "@/components/listening/mention-detail";
import { ListenerDashboard } from "@/components/listening/dashboard";
import { RightSidebarContainer } from "@/components/layout/right-sidebar-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, LayoutDashboard, List } from "lucide-react";
import {
  mockListeningQueries,
  mockListeningMentions,
  mockListeningAnalytics,
  type ListeningQuery,
  type ListeningMention,
} from "@/lib/mock-data";

export function ListeningPage() {
  const [selectedQuery, setSelectedQuery] = useState<ListeningQuery | null>(mockListeningQueries[0]);
  const [selectedMention, setSelectedMention] = useState<ListeningMention | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Filter mentions by selected query
  const filteredMentions = selectedQuery
    ? mockListeningMentions.filter((m) => m.queryId === selectedQuery.id)
    : mockListeningMentions;

  // Get analytics for selected query
  const queryAnalytics = selectedQuery
    ? mockListeningAnalytics.filter((a) => a.queryId === selectedQuery.id)
    : mockListeningAnalytics;

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Query List */}
      <div className="w-80 border-r bg-background flex flex-col">
        <div className="border-b p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Listening Queries</h2>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Monitor conversations across social media platforms
          </p>
        </div>
        <ListenerQueryList
          queries={mockListeningQueries}
          selectedId={selectedQuery?.id}
          onSelect={setSelectedQuery}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="border-b px-4">
            <TabsList className="h-12">
              <TabsTrigger value="dashboard" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="mentions" className="gap-2">
                <List className="h-4 w-4" />
                Mentions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="flex-1 m-0 p-0">
            {selectedQuery ? (
              <ListenerDashboard
                query={selectedQuery}
                analytics={queryAnalytics}
                recentMentions={filteredMentions.slice(0, 10)}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-4">
                  <p className="text-lg">Select a query to view analytics</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="mentions" className="flex-1 m-0 p-0 flex">
            <div className="flex-1 flex">
              {/* Mention List */}
              <div className="w-96 border-r flex flex-col">
                {selectedQuery ? (
                  <>
                    <div className="border-b p-4">
                      <h3 className="font-semibold">{selectedQuery.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {filteredMentions.length} mentions
                      </p>
                    </div>
                    <ListenerMentionList
                      mentions={filteredMentions}
                      selectedId={selectedMention?.id}
                      onSelect={setSelectedMention}
                    />
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground p-4 text-center">
                    <p>Select a query to view mentions</p>
                  </div>
                )}
              </div>

              {/* Mention Detail */}
              <div className="flex-1">
                {selectedMention ? (
                  <ListenerMentionDetail mention={selectedMention} />
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <div className="text-center space-y-4">
                      <p className="text-lg">Select a mention to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Sidebar - Context Aware */}
      <RightSidebarContainer>
        {selectedQuery && (
          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Query Info</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="ml-2 capitalize">{selectedQuery.queryType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-2">
                    {selectedQuery.isActive ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-gray-500">Inactive</span>
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Mentions:</span>
                  <span className="ml-2 font-medium">{selectedQuery.totalMentions.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last 24h:</span>
                  <span className="ml-2 font-medium">{selectedQuery.mentionCount24h.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last 7d:</span>
                  <span className="ml-2 font-medium">{selectedQuery.mentionCount7d.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {selectedQuery.keywords.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuery.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedQuery.hashtags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Hashtags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuery.hashtags.map((hashtag) => (
                    <span
                      key={hashtag}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                    >
                      #{hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedQuery.platforms && selectedQuery.platforms.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuery.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs capitalize"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedQuery.alertsEnabled && (
              <div>
                <h3 className="font-semibold mb-3">Alerts</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <span className="text-muted-foreground">Enabled</span>
                  </div>
                  {selectedQuery.alertThresholdVolume && (
                    <div>
                      <span className="text-muted-foreground">Volume threshold:</span>
                      <span className="ml-2">{selectedQuery.alertThresholdVolume}/hour</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </RightSidebarContainer>
    </div>
  );
}
