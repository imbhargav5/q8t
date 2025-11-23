"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRSSFeeds } from "@/lib/mock-data";
import { Rss, Plus, Play, Pause, Settings, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function RSSFeedsPage() {
  const activeFeeds = mockRSSFeeds.filter(f => f.isActive);
  const inactiveFeeds = mockRSSFeeds.filter(f => !f.isActive);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Rss className="h-8 w-8" />
            RSS Feeds
          </h1>
          <p className="text-muted-foreground">
            Automatically publish content from RSS feeds to your social accounts
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/automations/rss-feeds/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New RSS Feed
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Feeds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRSSFeeds.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              <Play className="h-4 w-4" />
              Active Feeds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeFeeds.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Auto-Publishing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRSSFeeds.filter(f => f.autoPublish).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Feeds */}
      {activeFeeds.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Feeds</h2>
          <div className="grid gap-4">
            {activeFeeds.map((feed) => (
              <Card key={feed.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded bg-blue-50 text-blue-600">
                          <Rss className="h-5 w-5" />
                        </div>
                        {feed.name}
                        {feed.autoPublish && (
                          <Badge variant="default" className="bg-green-600">Auto-Publish</Badge>
                        )}
                        <Badge variant="outline" className={
                          feed.healthStatus === "healthy" ? "border-green-600 text-green-600" : "border-red-600 text-red-600"
                        }>
                          {feed.healthStatus}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{feed.description}</CardDescription>
                      <div className="text-sm text-muted-foreground pt-1">
                        <span className="font-mono text-xs">{feed.feedUrl}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Platforms</div>
                      <div className="font-semibold">{feed.targetPlatforms.join(", ")}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Check Interval</div>
                      <div className="font-semibold">{feed.checkIntervalMinutes} mins</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Last Checked</div>
                      <div className="font-semibold">
                        {feed.lastCheckedAt ? new Date(feed.lastCheckedAt).toLocaleString() : "Never"}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Max Posts/Day</div>
                      <div className="font-semibold">{feed.maxPostsPerDay || "Unlimited"}</div>
                    </div>
                  </div>

                  {feed.keywordFilters && feed.keywordFilters.length > 0 && (
                    <div className="text-sm">
                      <div className="text-muted-foreground mb-1">Keyword Filters</div>
                      <div className="flex gap-1 flex-wrap">
                        {feed.keywordFilters.map((keyword) => (
                          <Badge key={keyword} variant="secondary">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {feed.excludeKeywords && feed.excludeKeywords.length > 0 && (
                    <div className="text-sm">
                      <div className="text-muted-foreground mb-1">Exclude Keywords</div>
                      <div className="flex gap-1 flex-wrap">
                        {feed.excludeKeywords.map((keyword) => (
                          <Badge key={keyword} variant="destructive">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Link href={`/automations/rss-feeds/${feed.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/automations/rss-feeds/${feed.id}/edit`}>
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

      {/* Inactive Feeds */}
      {inactiveFeeds.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Inactive Feeds</h2>
          <div className="grid gap-4">
            {inactiveFeeds.map((feed) => (
              <Card key={feed.id} className="opacity-60 hover:opacity-100 transition-opacity">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded bg-gray-100 text-gray-600">
                          <Rss className="h-5 w-5" />
                        </div>
                        {feed.name}
                        <Badge variant="secondary">Inactive</Badge>
                      </CardTitle>
                      <CardDescription>{feed.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Link href={`/automations/rss-feeds/${feed.id}/edit`}>
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
