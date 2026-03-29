"use client";

import * as React from "react";
import { Clock, TrendingUp, Calendar, Info, Sun, Moon, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockAudienceActivity, mockPlatformActivity, dayNames, dayNamesFull } from "@/lib/mock-data/insights";
import type { BestTimeData } from "@/lib/zod-schemas/insights.schema";

export default function InsightsPage() {
  const [selectedPlatform, setSelectedPlatform] = React.useState("all");

  const activityData =
    selectedPlatform === "all" ? mockAudienceActivity : mockPlatformActivity[selectedPlatform];

  const getHeatmapColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    if (score >= 20) return "bg-orange-500";
    return "bg-gray-300";
  };

  const getHeatmapData = (day: number, hour: number): BestTimeData | undefined => {
    return activityData.activity_heatmap.find(
      (d) => d.day_of_week === day && d.hour === hour
    );
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const getTimeOfDayIcon = (hour: number) => {
    if (hour >= 5 && hour < 12) return <Sunrise className="h-4 w-4" />;
    if (hour >= 12 && hour < 17) return <Sun className="h-4 w-4" />;
    if (hour >= 17 && hour < 21) return <Sunset className="h-4 w-4" />;
    return <Moon className="h-4 w-4" />;
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Best Times to Post</h1>
          </div>
          <p className="text-muted-foreground">
            Discover when your audience is most active and engaged
          </p>
        </div>
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.data_points.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Posts analyzed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.peak_days.length}</div>
            <p className="text-xs text-muted-foreground">{activityData.peak_days.join(", ")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.peak_hours.length}</div>
            <p className="text-xs text-muted-foreground">
              {formatHour(activityData.peak_hours[0])}-{formatHour(activityData.peak_hours[activityData.peak_hours.length - 1])}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dayNames[activityData.best_times[0].day_of_week]} {formatHour(activityData.best_times[0].hour)}
            </div>
            <p className="text-xs text-muted-foreground">{activityData.best_times[0].score}% engagement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="heatmap" className="flex-1">
        <TabsList>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="recommendations">
            Top Recommendations
            <Badge variant="secondary" className="ml-2">
              {activityData.best_times.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Audience Activity Heatmap</CardTitle>
                  <CardDescription>
                    Engagement scores by day and hour (darker = better performance)
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Hover over cells for details</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <div className="min-w-[900px]">
                  {/* Heatmap */}
                  <div className="space-y-1">
                    {/* Header - Hours */}
                    <div className="flex">
                      <div className="w-16" /> {/* Spacer for day labels */}
                      <div className="flex flex-1 gap-1">
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <div
                            key={hour}
                            className="flex flex-1 items-center justify-center text-[10px] text-muted-foreground"
                          >
                            {hour}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Heatmap Grid */}
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                      <div key={day} className="flex items-center gap-1">
                        <div className="w-16 text-xs font-medium">{dayNames[day]}</div>
                        <div className="flex flex-1 gap-1">
                          {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                            const data = getHeatmapData(day, hour);
                            if (!data) return null;

                            return (
                              <TooltipProvider key={hour}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      className={`flex aspect-square flex-1 cursor-pointer items-center justify-center rounded transition-transform hover:scale-110 ${getHeatmapColor(
                                        data.engagement_score
                                      )}`}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <div className="space-y-1">
                                      <div className="font-semibold">
                                        {dayNamesFull[day]}, {formatHour(hour)}
                                      </div>
                                      <div className="text-xs space-y-0.5">
                                        <div>Engagement Score: {data.engagement_score.toFixed(1)}%</div>
                                        <div>Avg Impressions: {data.avg_impressions.toLocaleString()}</div>
                                        <div>Posts: {data.post_count}</div>
                                        <div>Engagement Rate: {data.avg_engagement_rate.toFixed(1)}%</div>
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {/* Legend */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                      <span className="text-muted-foreground">Lower</span>
                      <div className="flex gap-1">
                        <div className="h-4 w-8 rounded bg-gray-300" />
                        <div className="h-4 w-8 rounded bg-orange-500" />
                        <div className="h-4 w-8 rounded bg-yellow-500" />
                        <div className="h-4 w-8 rounded bg-green-500" />
                        <div className="h-4 w-8 rounded bg-green-600" />
                      </div>
                      <span className="text-muted-foreground">Higher Engagement</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Recommended Times</CardTitle>
              <CardDescription>
                Based on historical performance and audience activity patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityData.best_times.map((time, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getTimeOfDayIcon(time.hour)}
                        <h3 className="font-semibold">
                          {dayNamesFull[time.day_of_week]}s at {formatHour(time.hour)}
                        </h3>
                      </div>
                      <Badge variant="default" className="bg-primary">
                        {time.score}% Score
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{time.reason}</p>
                  </div>
                  <Button>Schedule Post</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights & Patterns</CardTitle>
              <CardDescription>Key takeaways from your audience activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Best Days</h4>
                    <p className="text-sm text-muted-foreground">
                      Your audience is most active on {activityData.peak_days.join(", ")}. Consider
                      scheduling important content on these days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Peak Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Engagement peaks between {formatHour(activityData.peak_hours[0])} and{" "}
                      {formatHour(activityData.peak_hours[activityData.peak_hours.length - 1])}.
                      Schedule posts during these windows for maximum visibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Optimal Strategy</h4>
                    <p className="text-sm text-muted-foreground">
                      Post 2-3 times per day during peak hours for consistent engagement. Avoid
                      late nights (12 AM - 6 AM) when your audience is less active.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                    <Info className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Data Reliability</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on {activityData.data_points.toLocaleString()} posts over the last 90 days.
                      Last updated: {new Date(activityData.last_analyzed_at).toLocaleDateString()}.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
