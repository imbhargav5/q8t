"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEvergreenContent } from "@/lib/mock-data";
import { Repeat, Plus, Play, Pause, Settings, Trash2, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EvergreenContentPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const activeContent = mockEvergreenContent.filter(c => c.isActive);
  const inactiveContent = mockEvergreenContent.filter(c => !c.isActive);

  const totalEngagement = mockEvergreenContent.reduce((sum, c) => sum + c.totalEngagement, 0);
  const avgEngagement = mockEvergreenContent.length > 0
    ? (totalEngagement / mockEvergreenContent.length).toFixed(0)
    : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Repeat className="h-8 w-8" />
            Evergreen Content
          </h1>
          <p className="text-muted-foreground">
            Automatically recycle your best-performing content
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/workspace/${workspaceId}/automations/evergreen-content/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Evergreen Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEvergreenContent.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              <Play className="h-4 w-4" />
              Active Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeContent.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEngagement.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEngagement}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Content */}
      {activeContent.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Evergreen Content</h2>
          <div className="grid gap-4">
            {activeContent.map((content) => (
              <Card key={content.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded bg-green-50 text-green-600">
                          <Repeat className="h-5 w-5" />
                        </div>
                        {content.title}
                        <Badge variant="default">Active</Badge>
                        {content.avgEngagementRate && content.avgEngagementRate > 0.04 && (
                          <Badge variant="outline" className="border-green-600 text-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            High Engagement
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{content.content}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Platforms</div>
                      <div className="font-semibold">{content.platforms.join(", ")}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Recycle Interval</div>
                      <div className="font-semibold">{content.recycleIntervalDays} days</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Times Posted</div>
                      <div className="font-semibold">
                        {content.timesPosted}
                        {content.maxReposts && ` / ${content.maxReposts}`}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Next Post</div>
                      <div className="font-semibold">
                        {content.nextPostAt ? new Date(content.nextPostAt).toLocaleDateString() : "Not scheduled"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded">
                    <div className="text-center">
                      <div className="text-xl font-bold">{content.totalEngagement.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">
                        {content.avgEngagementRate ? (content.avgEngagementRate * 100).toFixed(1) : "0"}%
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Engagement Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">
                        {content.timesPosted > 0 ? Math.round(content.totalEngagement / content.timesPosted) : 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg per Post</div>
                    </div>
                  </div>

                  {content.tags && content.tags.length > 0 && (
                    <div className="text-sm">
                      <div className="text-muted-foreground mb-1">Tags</div>
                      <div className="flex gap-1 flex-wrap">
                        {content.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Link href={`/workspace/${workspaceId}/automations/evergreen-content/${content.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/workspace/${workspaceId}/automations/evergreen-content/${content.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      <Repeat className="h-3 w-3 mr-1" />
                      Post Now
                    </Button>
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

      {/* Inactive Content */}
      {inactiveContent.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Inactive Content</h2>
          <div className="grid gap-4">
            {inactiveContent.map((content) => (
              <Card key={content.id} className="opacity-60 hover:opacity-100 transition-opacity">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded bg-gray-100 text-gray-600">
                          <Repeat className="h-5 w-5" />
                        </div>
                        {content.title}
                        <Badge variant="secondary">Inactive</Badge>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{content.content}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Link href={`/workspace/${workspaceId}/automations/evergreen-content/${content.id}/edit`}>
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
