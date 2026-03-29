"use client";

import * as React from "react";
import { Hash, Plus, Copy, Trash2, TrendingUp, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  mockHashtagSets,
  mockHashtagAnalytics,
  mockTrendingHashtags,
} from "@/lib/mock-data/hashtags";

export default function HashtagsPage() {
  const [selectedSet, setSelectedSet] = React.useState<string | null>(null);

  const copyHashtagSet = (hashtags: string[]) => {
    navigator.clipboard.writeText(hashtags.join(" "));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Hash className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Hashtag Manager</h1>
            <p className="text-sm text-muted-foreground">
              Organize and track hashtag performance
            </p>
          </div>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Set
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sets" className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-6">
          <TabsList className="h-auto rounded-none border-0 bg-transparent p-0">
            <TabsTrigger
              value="sets"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              My Sets
              <Badge variant="secondary" className="ml-2">
                {mockHashtagSets.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="discover"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Discover
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            {/* My Sets Tab */}
            <TabsContent value="sets" className="m-0 space-y-4">
              {mockHashtagSets.map((set) => (
                <Card key={set.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{set.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {set.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{set.category}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyHashtagSet(set.hashtags)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {set.hashtags.map((hashtag) => (
                        <Badge key={hashtag} variant="secondary" className="font-mono">
                          {hashtag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Used {set.usage_count} times</span>
                      {set.last_used_at && (
                        <span>• Last used {new Date(set.last_used_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="m-0 space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockHashtagAnalytics.reduce((sum, a) => sum + a.impressions, 0).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Across all hashtags
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockHashtagAnalytics.reduce((sum, a) => sum + a.reach, 0).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Unique users reached
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Engagements</CardTitle>
                    <Hash className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockHashtagAnalytics.reduce((sum, a) => sum + a.engagements, 0).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total engagements
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Average CTR
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockHashtagAnalytics.slice(0, 5).map((analytics) => (
                      <div key={analytics.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="font-mono">
                              {analytics.hashtag}
                            </Badge>
                            <Badge variant="outline">{analytics.platform}</Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{analytics.impressions.toLocaleString()} impressions</span>
                            <span>•</span>
                            <span>{analytics.engagements.toLocaleString()} engagements</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {((analytics.engagements / analytics.impressions) * 100).toFixed(1)}%
                          </div>
                          <p className="text-xs text-muted-foreground">engagement rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discover Tab */}
            <TabsContent value="discover" className="m-0">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search trending hashtags..." className="pl-8" />
                </div>
              </div>

              <div className="space-y-4">
                {mockTrendingHashtags.map((trending) => (
                  <Card key={trending.hashtag}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="font-mono text-base px-3 py-1">
                              {trending.hashtag}
                            </Badge>
                            <Badge variant="outline">{trending.category}</Badge>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium text-green-500">
                              +{trending.growth_rate}%
                            </span>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Trending Score</span>
                              <span className="font-medium">{trending.trending_score}/100</span>
                            </div>
                            <Progress value={trending.trending_score} className="h-2" />
                          </div>
                          <div className="mt-3 text-sm text-muted-foreground">
                            {trending.volume.toLocaleString()} posts • Growing {trending.growth_rate}%
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground">Related:</span>
                            {trending.related_hashtags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="font-mono">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add to Set
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
