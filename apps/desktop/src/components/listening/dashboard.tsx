
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Users,
  BarChart3,
  Heart,
  Repeat2,
  MessageCircle,
  Eye,
  BadgeCheck,
  Star,
} from "lucide-react";
import type { ListeningQuery, ListeningAnalytics, ListeningMention } from "@/lib/mock-data";
import { format } from "date-fns";

interface ListenerDashboardProps {
  query: ListeningQuery;
  analytics: ListeningAnalytics[];
  recentMentions: ListeningMention[];
}

export function ListenerDashboard({ query, analytics, recentMentions }: ListenerDashboardProps) {
  // Calculate summary metrics
  const totalMentions = analytics.reduce((sum, a) => sum + a.mentionCount, 0);
  const totalEngagement = analytics.reduce((sum, a) => sum + a.totalEngagement, 0);
  const uniqueAuthors = analytics.reduce((sum, a) => sum + a.uniqueAuthors, 0);
  const avgSentiment =
    analytics.reduce((sum, a) => sum + (a.avgSentimentScore || 0), 0) / analytics.length;

  // Calculate sentiment distribution
  const totalPositive = analytics.reduce((sum, a) => sum + a.positiveCount, 0);
  const totalNeutral = analytics.reduce((sum, a) => sum + a.neutralCount, 0);
  const totalNegative = analytics.reduce((sum, a) => sum + a.negativeCount, 0);
  const sentimentTotal = totalPositive + totalNeutral + totalNegative;

  // Get platform breakdown from latest analytics
  const latestAnalytics = analytics[analytics.length - 1];
  const platformBreakdown = latestAnalytics?.platformBreakdown || {};

  // Calculate trends
  const recent24h = analytics.slice(-1)[0];
  const previous24h = analytics.slice(-2, -1)[0];
  const mentionTrend = recent24h && previous24h
    ? ((recent24h.mentionCount - previous24h.mentionCount) / previous24h.mentionCount) * 100
    : 0;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {query.icon && <span className="text-3xl">{query.icon}</span>}
            <div>
              <h1 className="text-2xl font-bold">{query.name}</h1>
              <p className="text-muted-foreground">{query.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={query.isActive ? "default" : "secondary"}>
              {query.isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {query.queryType}
            </Badge>
            {query.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Mentions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{formatNumber(totalMentions)}</div>
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              {mentionTrend !== 0 && (
                <div className="flex items-center gap-1 mt-2 text-sm">
                  {mentionTrend > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">+{mentionTrend.toFixed(1)}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">{mentionTrend.toFixed(1)}%</span>
                    </>
                  )}
                  <span className="text-muted-foreground">vs yesterday</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unique Authors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{formatNumber(uniqueAuthors)}</div>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">Last 7 days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{formatNumber(totalEngagement)}</div>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Avg {formatNumber(Math.floor(totalEngagement / totalMentions))} per mention
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {avgSentiment > 0 ? "+" : ""}
                  {avgSentiment.toFixed(2)}
                </div>
                <div
                  className={`h-5 w-5 rounded-full ${
                    avgSentiment > 0.3
                      ? "bg-green-500"
                      : avgSentiment < -0.3
                        ? "bg-red-500"
                        : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {avgSentiment > 0.3
                  ? "Mostly positive"
                  : avgSentiment < -0.3
                    ? "Mostly negative"
                    : "Neutral"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Mention Volume</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {analytics.map((data, index) => {
                  const maxMentions = Math.max(...analytics.map((a) => a.mentionCount));
                  const height = (data.mentionCount / maxMentions) * 100;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex-1 flex items-end">
                        <div
                          className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                          style={{ height: `${height}%` }}
                          title={`${data.mentionCount} mentions`}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(data.bucketStart, "EEE")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-green-500 rounded" />
                      <span>Positive</span>
                    </div>
                    <span className="font-medium">
                      {sentimentTotal > 0
                        ? ((totalPositive / sentimentTotal) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${sentimentTotal > 0 ? (totalPositive / sentimentTotal) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {formatNumber(totalPositive)} mentions
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-gray-400 rounded" />
                      <span>Neutral</span>
                    </div>
                    <span className="font-medium">
                      {sentimentTotal > 0
                        ? ((totalNeutral / sentimentTotal) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-400"
                      style={{
                        width: `${sentimentTotal > 0 ? (totalNeutral / sentimentTotal) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {formatNumber(totalNeutral)} mentions
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-red-500 rounded" />
                      <span>Negative</span>
                    </div>
                    <span className="font-medium">
                      {sentimentTotal > 0
                        ? ((totalNegative / sentimentTotal) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{
                        width: `${sentimentTotal > 0 ? (totalNegative / sentimentTotal) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {formatNumber(totalNegative)} mentions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Distribution</CardTitle>
              <CardDescription>Where conversations are happening</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(platformBreakdown)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([platform, count]) => {
                    const total = Object.values(platformBreakdown).reduce(
                      (sum: number, val) => sum + (val as number),
                      0
                    );
                    const percentage = ((count as number) / total) * 100;

                    return (
                      <div key={platform} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="capitalize">{platform}</span>
                          <span className="font-medium">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Top Keywords */}
          <Card>
            <CardHeader>
              <CardTitle>Top Keywords</CardTitle>
              <CardDescription>Most mentioned terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {latestAnalytics?.topKeywords.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.keyword}</span>
                    <Badge variant="outline">{item.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent High-Impact Mentions */}
        <Card>
          <CardHeader>
            <CardTitle>High-Impact Mentions</CardTitle>
            <CardDescription>Recent mentions with high engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMentions
                .filter((m) => m.isViral || m.isInfluencer || m.priority === "critical")
                .slice(0, 5)
                .map((mention) => (
                  <div key={mention.id} className="flex gap-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage
                        src={mention.authorAvatarUrl}
                        alt={mention.authorDisplayName}
                      />
                      <AvatarFallback>{mention.authorDisplayName[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {mention.authorDisplayName}
                        </span>
                        {mention.authorVerified && (
                          <BadgeCheck className="h-4 w-4 text-blue-500" />
                        )}
                        {mention.isStarred && (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-auto" />
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {mention.contentPreview}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5" />
                          <span>{formatNumber(mention.likesCount)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Repeat2 className="h-3.5 w-3.5" />
                          <span>{formatNumber(mention.sharesCount)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>{formatNumber(mention.commentsCount)}</span>
                        </div>
                        <Badge
                          variant={
                            mention.sentiment === "positive"
                              ? "default"
                              : mention.sentiment === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs capitalize"
                        >
                          {mention.sentiment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}
