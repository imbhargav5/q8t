import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  BarChart3,
  Activity,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Download,
} from "lucide-react";
import {
  mockAnalyticsOverviewMetrics,
  mockPlatformPerformance,
  mockTopPosts,
  mockActivityTimeline,
  mockQuickInsights,
} from "@/lib/mock-data/analytics/overview";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { useState } from "react";
import { DateRangeDialog } from "@/components/dialogs/analytics/date-range-dialog";
import { ExportAnalyticsDialog } from "@/components/dialogs/analytics/export-analytics-dialog";
import type { DateRange } from "react-day-picker";

export function AnalyticsPage() {
  const metrics = mockAnalyticsOverviewMetrics;
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [dateRangeLabel, setDateRangeLabel] = useState("Last 30 days");

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const TrendIndicator = ({ value }: { value: number }) => {
    const isPositive = value > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const color = isPositive ? "text-green-600" : "text-red-600";

    return (
      <div className={`flex items-center gap-1 text-sm ${color}`}>
        <Icon className="h-4 w-4" />
        <span>{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track your social media performance across all platforms
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setDateRangeOpen(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              {dateRangeLabel}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setExportOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <DateRangeDialog
        open={dateRangeOpen}
        onOpenChange={setDateRangeOpen}
        currentRange={dateRange}
        onApply={(range, compareToPrevious) => {
          setDateRange(range);
          if (range?.from && range?.to) {
            const days = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
            setDateRangeLabel(`Last ${days} days`);
          }
          console.log("Apply date range:", range, "Compare:", compareToPrevious);
        }}
      />
      <ExportAnalyticsDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        currentDateRange={dateRangeLabel}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(metrics.totalEngagement)}</div>
                <TrendIndicator value={metrics.engagementTrend} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(metrics.totalReach)}</div>
                <TrendIndicator value={metrics.reachTrend} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Follower Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{formatNumber(metrics.followerGrowth)}</div>
                <TrendIndicator value={metrics.followerGrowthTrend} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.engagementRate}%</div>
                <TrendIndicator value={metrics.engagementRateTrend} />
              </CardContent>
            </Card>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Posts Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.postsPublished}</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatTime(metrics.avgResponseTime)}</div>
                <p className="text-xs text-muted-foreground mt-1">Team performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CSAT Score</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.csatScore}/5</div>
                <p className="text-xs text-muted-foreground mt-1">Customer satisfaction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.socialPerformanceScore}/100</div>
                <p className="text-xs text-muted-foreground mt-1">Overall social score</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Quick Insights
              </CardTitle>
              <CardDescription>AI-powered recommendations and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockQuickInsights.map((insight) => {
                  const Icon =
                    insight.category === "working"
                      ? CheckCircle2
                      : insight.category === "attention"
                        ? AlertTriangle
                        : Lightbulb;
                  const color =
                    insight.category === "working"
                      ? "text-green-600 bg-green-50"
                      : insight.category === "attention"
                        ? "text-orange-600 bg-orange-50"
                        : "text-blue-600 bg-blue-50";

                  return (
                    <div
                      key={insight.id}
                      className="flex items-start gap-3 p-3 rounded-lg border"
                    >
                      <div className={`p-2 rounded-lg ${color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{insight.message}</p>
                        {insight.actionable && (
                          <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                            {insight.actionLabel} →
                          </Button>
                        )}
                      </div>
                      <Badge variant="outline">{insight.impact}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>How each platform is performing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPlatformPerformance.map((platform) => (
                    <div key={platform.platform} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {platform.name[0]}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{platform.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatNumber(platform.followerCount)} followers
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {platform.engagementRate}%
                          </div>
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <ArrowUpRight className="h-3 w-3" />
                            {platform.growthPercentage}%
                          </div>
                        </div>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${Math.min(platform.engagementRate * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Posts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Top Posts</CardTitle>
                    <CardDescription>Best performing content this month</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/analytics/performance/posts/top-posts">
                      View All →
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopPosts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                    >
                      {post.thumbnail && (
                        <img
                          src={post.thumbnail}
                          alt=""
                          className="w-16 h-16 rounded object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{formatNumber(post.engagement)} engagement</span>
                          <span>{post.engagementRate}% rate</span>
                          <Badge variant="outline" className="text-xs">
                            {post.platform}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityTimeline.map((item, index) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.severity === "success"
                            ? "bg-green-100 text-green-600"
                            : item.severity === "warning"
                              ? "bg-orange-100 text-orange-600"
                              : item.severity === "error"
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {item.type === "milestone" && <Star className="h-4 w-4" />}
                        {item.type === "achievement" && <CheckCircle2 className="h-4 w-4" />}
                        {item.type === "alert" && <AlertTriangle className="h-4 w-4" />}
                        {item.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                      </div>
                      {index < mockActivityTimeline.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="font-medium text-sm">{item.title}</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {item.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/analytics/performance">
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Performance</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Detailed analytics
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/analytics/audience">
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Audience</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Demographics & segments
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/analytics/competitors">
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Competitors</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Competitive analysis
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/analytics/reports">
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Download className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Reports</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Custom reports
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
