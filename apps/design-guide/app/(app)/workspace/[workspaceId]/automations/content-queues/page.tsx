"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContentQueues } from "@/lib/mock-data";
import { Calendar, Plus, Play, Pause, Settings, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ContentQueuesPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const activeQueues = mockContentQueues.filter(q => q.isActive);
  const inactiveQueues = mockContentQueues.filter(q => !q.isActive);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Content Queues
          </h1>
          <p className="text-muted-foreground">
            Schedule content to be published automatically at optimal times
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/workspace/${workspaceId}/automations/content-queues/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Queue
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Queues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContentQueues.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              <Play className="h-4 w-4" />
              Active Queues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeQueues.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Posts/Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockContentQueues.reduce((sum, q) => sum + (q.postsPerDay || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Queues */}
      {activeQueues.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Queues</h2>
          <div className="grid gap-4">
            {activeQueues.map((queue) => (
              <Card key={queue.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <div
                          className="p-2 rounded"
                          style={{ backgroundColor: `${queue.color}20`, color: queue.color }}
                        >
                          <Calendar className="h-5 w-5" />
                        </div>
                        {queue.name}
                        <Badge variant="default">Active</Badge>
                        {queue.autoFillEnabled && (
                          <Badge variant="outline" className="border-blue-600 text-blue-600">
                            Auto-Fill
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{queue.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Platforms</div>
                      <div className="font-semibold">{queue.platforms.join(", ")}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Schedule Type</div>
                      <div className="font-semibold capitalize">{queue.scheduleType.replace("_", " ")}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Posts Per Day</div>
                      <div className="font-semibold">{queue.postsPerDay || "N/A"}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Timezone</div>
                      <div className="font-semibold">{queue.timezone}</div>
                    </div>
                  </div>

                  <div className="flex gap-3 text-sm">
                    {queue.shufflePosts && (
                      <Badge variant="secondary">Shuffle Posts</Badge>
                    )}
                    {queue.skipWeekends && (
                      <Badge variant="secondary">Skip Weekends</Badge>
                    )}
                    {queue.skipHolidays && (
                      <Badge variant="secondary">Skip Holidays</Badge>
                    )}
                  </div>

                  {queue.autoFillEnabled && queue.autoFillSources && queue.autoFillSources.length > 0 && (
                    <div className="text-sm">
                      <div className="text-muted-foreground mb-1">Auto-Fill Sources</div>
                      <div className="flex gap-1 flex-wrap">
                        {queue.autoFillSources.map((source) => (
                          <Badge key={source} variant="outline">{source}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Link href={`/workspace/${workspaceId}/automations/content-queues/${queue.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/workspace/${workspaceId}/automations/content-queues/${queue.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Inactive Queues */}
      {inactiveQueues.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Inactive Queues</h2>
          <div className="grid gap-4">
            {inactiveQueues.map((queue) => (
              <Card key={queue.id} className="opacity-60 hover:opacity-100 transition-opacity">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded bg-gray-100 text-gray-600">
                          <Calendar className="h-5 w-5" />
                        </div>
                        {queue.name}
                        <Badge variant="secondary">Inactive</Badge>
                      </CardTitle>
                      <CardDescription>{queue.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Link href={`/workspace/${workspaceId}/automations/content-queues/${queue.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
