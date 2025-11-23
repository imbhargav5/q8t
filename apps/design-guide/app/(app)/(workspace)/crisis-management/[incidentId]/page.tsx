"use client";

import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  mockCrisisIncidents,
  mockCrisisDetectionRules,
  getSignalsForIncident,
  getSentimentDistribution,
  getSignalCountsByPlatform,
  getSentimentTrendData,
  getEmotionDistribution,
  getKeywordFrequency,
  getPlatformDistribution,
} from "@/lib/mock-data";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  Activity,
  Shield,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Target,
  BarChart3,
  MessageSquare,
  Settings,
  CheckCircle2,
  Share2,
} from "lucide-react";
import Link from "next/link";
import type { CrisisSeverity, CrisisStatus } from "@/lib/zod-schemas";
import { SocialSignalCard } from "@/components/crisis/social-signal-card";
import { formatDistanceToNow } from "date-fns";

const severityConfig: Record<
  CrisisSeverity,
  { color: string; icon: typeof AlertTriangle; label: string }
> = {
  low: { color: "bg-blue-500/10 text-blue-700 border-blue-200", icon: Activity, label: "Low" },
  medium: { color: "bg-yellow-500/10 text-yellow-700 border-yellow-200", icon: Clock, label: "Medium" },
  high: { color: "bg-orange-500/10 text-orange-700 border-orange-200", icon: AlertTriangle, label: "High" },
  critical: { color: "bg-red-500/10 text-red-700 border-red-200", icon: Shield, label: "Critical" },
};

const statusConfig: Record<CrisisStatus, { color: string; label: string }> = {
  detected: { color: "bg-red-500", label: "Detected" },
  acknowledged: { color: "bg-yellow-500", label: "Acknowledged" },
  investigating: { color: "bg-blue-500", label: "Investigating" },
  resolving: { color: "bg-purple-500", label: "Resolving" },
  resolved: { color: "bg-green-500", label: "Resolved" },
};

export default function IncidentDetailPage({
  params,
}: {
  params: Promise<{ incidentId: string }>;
}) {
  const { incidentId } = use(params);
  const incident = mockCrisisIncidents.find((i) => i.id === incidentId);

  if (!incident) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Incident Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The incident you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/crisis-management">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Crisis Management
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const SeverityIcon = severityConfig[incident.severity].icon;
  const signals = getSignalsForIncident(incidentId);
  const sentimentDist = getSentimentDistribution(incidentId);
  const platformCounts = getSignalCountsByPlatform(incidentId);
  const detectionRule = mockCrisisDetectionRules.find(
    (r) => r.id === incident.detectionRuleId
  );

  const totalSentiment = sentimentDist.positive + sentimentDist.neutral + sentimentDist.negative;
  const sentimentPercentages = {
    positive: totalSentiment > 0 ? ((sentimentDist.positive / totalSentiment) * 100).toFixed(0) : 0,
    neutral: totalSentiment > 0 ? ((sentimentDist.neutral / totalSentiment) * 100).toFixed(0) : 0,
    negative: totalSentiment > 0 ? ((sentimentDist.negative / totalSentiment) * 100).toFixed(0) : 0,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/crisis-management">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Crisis Management
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div
              className={`p-3 rounded-lg ${severityConfig[incident.severity].color}`}
            >
              <SeverityIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={severityConfig[incident.severity].color}>
                  {severityConfig[incident.severity].label.toUpperCase()}
                </Badge>
                <Badge className={statusConfig[incident.status].color}>
                  {statusConfig[incident.status].label}
                </Badge>
                {incident.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary">
                    {platform}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold mb-2">{incident.title}</h1>
              {incident.description && (
                <p className="text-muted-foreground">{incident.description}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {incident.status === "detected" && (
              <Button>Acknowledge</Button>
            )}
            {incident.status === "acknowledged" && (
              <Button>Start Investigation</Button>
            )}
            {incident.status === "investigating" && (
              <Button>Mark as Resolving</Button>
            )}
            {incident.status === "resolving" && (
              <Button>Resolve</Button>
            )}
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Actions
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Detected</CardDescription>
              <CardTitle className="text-2xl">
                {formatDistanceToNow(new Date(incident.detectedAt), { addSuffix: true })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {new Date(incident.detectedAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Estimated Reach</CardDescription>
              <CardTitle className="text-2xl">
                {incident.estimatedReach?.toLocaleString() || "N/A"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-orange-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +320% increase
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sentiment Score</CardDescription>
              <CardTitle className="text-2xl">
                {incident.averageSentimentScore?.toFixed(2) || "N/A"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -85% from baseline
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Messages</CardDescription>
              <CardTitle className="text-2xl">
                {incident.totalMessageCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {incident.negativeMessageCount} negative
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="signals">
            Social Signals ({signals.length})
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="actions">Actions & Notes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Detection Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Detection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Detection Type</p>
                  <p className="text-sm text-muted-foreground">
                    {incident.detectionType.replace("_", " ").toUpperCase()}
                  </p>
                </div>
                {detectionRule && (
                  <div>
                    <p className="text-sm font-medium mb-1">Detection Rule</p>
                    <p className="text-sm text-muted-foreground">{detectionRule.name}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium mb-1">Triggered At</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(incident.detectedAt).toLocaleString()}
                  </p>
                </div>
                {incident.detectionConfig && (
                  <div>
                    <p className="text-sm font-medium mb-1">Threshold Config</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {Object.entries(incident.detectionConfig).map(([key, value]) => (
                        <p key={key}>
                          {key}: {JSON.stringify(value)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        Negative
                      </span>
                      <span className="font-medium">{sentimentPercentages.negative}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${sentimentPercentages.negative}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        Neutral
                      </span>
                      <span className="font-medium">{sentimentPercentages.neutral}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${sentimentPercentages.neutral}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        Positive
                      </span>
                      <span className="font-medium">{sentimentPercentages.positive}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${sentimentPercentages.positive}%` }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center space-y-1">
                    <p className="text-2xl font-bold">{totalSentiment}</p>
                    <p className="text-sm text-muted-foreground">Total Messages Analyzed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(platformCounts)
                    .sort(([, a], [, b]) => b - a)
                    .map(([platform, count]) => {
                      const percentage = ((count / signals.length) * 100).toFixed(0);
                      return (
                        <div key={platform} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="capitalize">{platform}</span>
                            <span className="font-medium">
                              {count} ({percentage}%)
                            </span>
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
          </div>

          {/* Impact Notes */}
          {incident.impactNotes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{incident.impactNotes}</p>
              </CardContent>
            </Card>
          )}

          {/* Recent Signals Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Social Signals</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href={`#signals`}>View All ({signals.length})</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {signals.slice(0, 4).map((signal) => (
                <SocialSignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Social Signals Tab */}
        <TabsContent value="signals" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">All Social Signals</h2>
              <p className="text-sm text-muted-foreground">
                {signals.length} signals from {Object.keys(platformCounts).length} platforms
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {signals.map((signal) => (
              <SocialSignalCard key={signal.id} signal={signal} />
            ))}
          </div>

          {signals.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No social signals found for this incident</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Advanced Analytics
              </CardTitle>
              <CardDescription>
                Detailed analytics and trends for this incident
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analytics charts and visualizations coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incident.statusUpdates.map((update, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      {idx < incident.statusUpdates.length - 1 && (
                        <div className="h-full w-px bg-border my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium">
                        {update.from} → {update.to}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(update.timestamp).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">by {update.user_id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Actions & Notes Tab */}
        <TabsContent value="actions" className="space-y-6">
          {/* Resolution Actions */}
          {incident.resolutionActions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resolution Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {incident.resolutionActions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{action.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(action.timestamp).toLocaleString()} • by {action.user_id}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resolution Notes */}
          {incident.resolutionNotes && (
            <Card>
              <CardHeader>
                <CardTitle>Resolution Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{incident.resolutionNotes}</p>
                {incident.resolvedAt && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Resolved: {new Date(incident.resolvedAt).toLocaleString()}
                    {incident.resolvedBy && ` by ${incident.resolvedBy}`}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
