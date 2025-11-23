"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockContentQueues, mockContentQueueItems } from "@/lib/mock-data";
import { Calendar, Save, ArrowLeft, Play, Pause, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function ContentQueueDetailPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const queueId = params.id as string;

  const queue = mockContentQueues.find(q => q.id === queueId);
  const queueItems = mockContentQueueItems.filter(item => item.queueId === queueId);

  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    name: queue?.name || "",
    description: queue?.description || "",
    color: queue?.color || "#3b82f6",
    platforms: queue?.platforms.join(", ") || "",
    scheduleType: queue?.scheduleType || "time_slots",
    timezone: queue?.timezone || "UTC",
    postsPerDay: queue?.postsPerDay || "",
    shufflePosts: queue?.shufflePosts || false,
    skipWeekends: queue?.skipWeekends || false,
    skipHolidays: queue?.skipHolidays || false,
    autoFillEnabled: queue?.autoFillEnabled || false,
    autoFillSources: queue?.autoFillSources?.join(", ") || "",
    isActive: queue?.isActive || false,
  });

  if (!queue) {
    return (
      <div className="container mx-auto p-6">
        <p>Content Queue not found</p>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Saving queue:", formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href={`/workspace/${workspaceId}/automations/content-queues`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Content Queues
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <div
              className="p-2 rounded"
              style={{ backgroundColor: `${queue.color}20`, color: queue.color }}
            >
              <Calendar className="h-6 w-6" />
            </div>
            {queue.name}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant={queue.isActive ? "default" : "secondary"}>
              {queue.isActive ? "Active" : "Inactive"}
            </Badge>
            {queue.autoFillEnabled && (
              <Badge variant="outline" className="border-blue-600 text-blue-600">Auto-Fill Enabled</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
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
              <CardDescription>Configure the queue name and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Queue Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
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

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    disabled={!isEditing}
                    className="w-20 h-10"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    disabled={!isEditing}
                    className="font-mono"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Active</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable or disable this content queue
                  </div>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Settings</CardTitle>
              <CardDescription>Configure when and how content is published</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platforms">Target Platforms</Label>
                <Input
                  id="platforms"
                  value={formData.platforms}
                  onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
                  disabled={!isEditing}
                  placeholder="twitter, linkedin, facebook"
                />
                <div className="text-xs text-muted-foreground">Comma-separated list of platforms</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleType">Schedule Type</Label>
                  <Select
                    value={formData.scheduleType}
                    onValueChange={(value) => setFormData({ ...formData, scheduleType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="scheduleType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time_slots">Time Slots</SelectItem>
                      <SelectItem value="interval">Interval</SelectItem>
                      <SelectItem value="optimal">Optimal Times</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postsPerDay">Posts Per Day</Label>
                <Input
                  id="postsPerDay"
                  type="number"
                  value={formData.postsPerDay}
                  onChange={(e) => setFormData({ ...formData, postsPerDay: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shufflePosts">Shuffle Posts</Label>
                    <div className="text-sm text-muted-foreground">
                      Randomize the order of posts
                    </div>
                  </div>
                  <Switch
                    id="shufflePosts"
                    checked={formData.shufflePosts}
                    onCheckedChange={(checked) => setFormData({ ...formData, shufflePosts: checked })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="skipWeekends">Skip Weekends</Label>
                    <div className="text-sm text-muted-foreground">
                      Don't publish on Saturdays and Sundays
                    </div>
                  </div>
                  <Switch
                    id="skipWeekends"
                    checked={formData.skipWeekends}
                    onCheckedChange={(checked) => setFormData({ ...formData, skipWeekends: checked })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="skipHolidays">Skip Holidays</Label>
                    <div className="text-sm text-muted-foreground">
                      Don't publish on major holidays
                    </div>
                  </div>
                  <Switch
                    id="skipHolidays"
                    checked={formData.skipHolidays}
                    onCheckedChange={(checked) => setFormData({ ...formData, skipHolidays: checked })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto-Fill Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Auto-Fill Settings</CardTitle>
              <CardDescription>Automatically fill the queue with content from other sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoFillEnabled">Auto-Fill Enabled</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatically add content when queue is empty
                  </div>
                </div>
                <Switch
                  id="autoFillEnabled"
                  checked={formData.autoFillEnabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, autoFillEnabled: checked })}
                  disabled={!isEditing}
                />
              </div>

              {formData.autoFillEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="autoFillSources">Auto-Fill Sources</Label>
                  <Input
                    id="autoFillSources"
                    value={formData.autoFillSources}
                    onChange={(e) => setFormData({ ...formData, autoFillSources: e.target.value })}
                    disabled={!isEditing}
                    placeholder="evergreen:id, rss:id"
                  />
                  <div className="text-xs text-muted-foreground">
                    Comma-separated list of content sources (e.g., "evergreen:evergreen-1", "rss:rss-1")
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Queue Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Queued Posts</CardTitle>
                  <CardDescription>Posts scheduled in this queue</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Post
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {queueItems.length > 0 ? (
                <div className="space-y-3">
                  {queueItems.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs">#{item.position}</Badge>
                          <h4 className="font-semibold">Post {item.postId}</h4>
                        </div>
                        <Badge variant={
                          item.status === "published" ? "default" :
                          item.status === "scheduled" ? "secondary" :
                          item.status === "failed" ? "destructive" : "outline"
                        }>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {item.scheduledFor && (
                          <span>Scheduled: {new Date(item.scheduledFor).toLocaleString()}</span>
                        )}
                        {item.publishedAt && (
                          <span>Published: {new Date(item.publishedAt).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No posts in queue</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Queue Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Posts in Queue</div>
                <div className="font-semibold">{queueItems.filter(i => i.status === "pending").length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Scheduled</div>
                <div className="font-semibold">{queueItems.filter(i => i.status === "scheduled").length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Published</div>
                <div className="font-semibold">{queueItems.filter(i => i.status === "published").length}</div>
              </div>
              <Separator />
              <div>
                <div className="text-sm text-muted-foreground">Created By</div>
                <div className="font-semibold">{queue.createdBy}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Created At</div>
                <div className="font-semibold">{new Date(queue.createdAt).toLocaleDateString()}</div>
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
                {queue.isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Queue
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate Queue
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Queue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
