"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { mockRSSFeeds, mockRSSFeedItems } from "@/lib/mock-data";
import { Rss, Save, ArrowLeft, Play, Pause, Trash2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function RSSFeedDetailPage() {
  const params = useParams();
  const feedId = params.id as string;

  const feed = mockRSSFeeds.find(f => f.id === feedId);
  const feedItems = mockRSSFeedItems.filter(item => item.feedId === feedId);

  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    name: feed?.name || "",
    feedUrl: feed?.feedUrl || "",
    description: feed?.description || "",
    autoPublish: feed?.autoPublish || false,
    targetPlatforms: feed?.targetPlatforms.join(", ") || "",
    postTemplate: feed?.postTemplate || "",
    checkIntervalMinutes: feed?.checkIntervalMinutes || 60,
    keywordFilters: feed?.keywordFilters?.join(", ") || "",
    excludeKeywords: feed?.excludeKeywords?.join(", ") || "",
    maxPostsPerDay: feed?.maxPostsPerDay || "",
    isActive: feed?.isActive || false,
  });

  if (!feed) {
    return (
      <div className="container mx-auto p-6">
        <p>RSS Feed not found</p>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Saving feed:", formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href={`automations/rss-feeds`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to RSS Feeds
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Rss className="h-8 w-8" />
            {feed.name}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant={feed.isActive ? "default" : "secondary"}>
              {feed.isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge variant="outline" className={
              feed.healthStatus === "healthy" ? "border-green-600 text-green-600" : "border-red-600 text-red-600"
            }>
              {feed.healthStatus}
            </Badge>
            {feed.autoPublish && (
              <Badge className="bg-green-600">Auto-Publish</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Check Now
          </Button>
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Settings</CardTitle>
              <CardDescription>Configure the RSS feed details and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Feed Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedUrl">Feed URL</Label>
                <Input
                  id="feedUrl"
                  type="url"
                  value={formData.feedUrl}
                  onChange={(e) => setFormData({ ...formData, feedUrl: e.target.value })}
                  disabled={!isEditing}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={!isEditing}
                  rows={2}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Active</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable or disable this RSS feed
                  </div>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoPublish">Auto-Publish</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatically publish new items to social media
                  </div>
                </div>
                <Switch
                  id="autoPublish"
                  checked={formData.autoPublish}
                  onCheckedChange={(checked) => setFormData({ ...formData, autoPublish: checked })}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Publishing Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
              <CardDescription>Configure where and how content is published</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetPlatforms">Target Platforms</Label>
                <Input
                  id="targetPlatforms"
                  value={formData.targetPlatforms}
                  onChange={(e) => setFormData({ ...formData, targetPlatforms: e.target.value })}
                  disabled={!isEditing}
                  placeholder="twitter, linkedin, facebook"
                />
                <div className="text-xs text-muted-foreground">Comma-separated list of platforms</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postTemplate">Post Template</Label>
                <Textarea
                  id="postTemplate"
                  value={formData.postTemplate}
                  onChange={(e) => setFormData({ ...formData, postTemplate: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="font-mono text-sm"
                />
                <div className="text-xs text-muted-foreground">
                  Available variables: {"{title}"}, {"{description}"}, {"{link}"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkInterval">Check Interval (minutes)</Label>
                  <Input
                    id="checkInterval"
                    type="number"
                    value={formData.checkIntervalMinutes}
                    onChange={(e) => setFormData({ ...formData, checkIntervalMinutes: parseInt(e.target.value) })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPostsPerDay">Max Posts Per Day</Label>
                  <Input
                    id="maxPostsPerDay"
                    type="number"
                    value={formData.maxPostsPerDay}
                    onChange={(e) => setFormData({ ...formData, maxPostsPerDay: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Unlimited"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Content Filters</CardTitle>
              <CardDescription>Filter which RSS items to publish</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywordFilters">Include Keywords</Label>
                <Input
                  id="keywordFilters"
                  value={formData.keywordFilters}
                  onChange={(e) => setFormData({ ...formData, keywordFilters: e.target.value })}
                  disabled={!isEditing}
                  placeholder="product, announcement, guide"
                />
                <div className="text-xs text-muted-foreground">Only publish items containing these keywords (comma-separated)</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excludeKeywords">Exclude Keywords</Label>
                <Input
                  id="excludeKeywords"
                  value={formData.excludeKeywords}
                  onChange={(e) => setFormData({ ...formData, excludeKeywords: e.target.value })}
                  disabled={!isEditing}
                  placeholder="competitor, lawsuit"
                />
                <div className="text-xs text-muted-foreground">Never publish items containing these keywords (comma-separated)</div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Items */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Items</CardTitle>
              <CardDescription>Items discovered from this RSS feed</CardDescription>
            </CardHeader>
            <CardContent>
              {feedItems.length > 0 ? (
                <div className="space-y-3">
                  {feedItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold">{item.title}</h4>
                        <Badge variant={item.wasPublished ? "default" : "outline"}>
                          {item.wasPublished ? "Published" : "Pending"}
                        </Badge>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Discovered: {new Date(item.discoveredAt).toLocaleString()}</span>
                        {item.publishedToPlatforms.length > 0 && (
                          <span>Platforms: {item.publishedToPlatforms.join(", ")}</span>
                        )}
                      </div>
                      {item.matchedFilters && item.matchedFilters.length > 0 && (
                        <div className="flex gap-1">
                          {item.matchedFilters.map((filter) => (
                            <Badge key={filter} variant="secondary" className="text-xs">{filter}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No items discovered yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Feed Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Last Checked</div>
                <div className="font-semibold">
                  {feed.lastCheckedAt ? new Date(feed.lastCheckedAt).toLocaleString() : "Never"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Published</div>
                <div className="font-semibold">
                  {feed.lastPublishedAt ? new Date(feed.lastPublishedAt).toLocaleString() : "Never"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Created By</div>
                <div className="font-semibold">{feed.createdBy}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Created At</div>
                <div className="font-semibold">{new Date(feed.createdAt).toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Check for New Items
              </Button>
              <Button variant="outline" className="w-full justify-start">
                {feed.isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Feed
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate Feed
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Feed
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
