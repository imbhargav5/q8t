"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  mockRSSFeeds,
  mockContentQueues,
  mockEvergreenContent,
  mockListeningStreams,
  mockScheduledReports,
  mockPerformanceAlerts,
  mockApprovalWorkflows,
  mockCrisisDetectionRules,
} from "@/lib/mock-data";
import {
  Rss,
  Calendar,
  Repeat,
  Ear,
  BarChart3,
  Bell,
  CheckSquare,
  Shield,
  Play,
  Pause,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const automationCategories = [
  {
    title: "Content Automation",
    description: "Automated content publishing and scheduling",
    icon: Calendar,
    items: [
      {
        name: "RSS Feeds",
        description: "Auto-publish from RSS feeds",
        icon: Rss,
        count: mockRSSFeeds.length,
        active: mockRSSFeeds.filter(f => f.isActive).length,
        color: "text-blue-600 bg-blue-50",
        href: "rss-feeds",
      },
      {
        name: "Content Queues",
        description: "Scheduled content queues",
        icon: Calendar,
        count: mockContentQueues.length,
        active: mockContentQueues.filter(q => q.isActive).length,
        color: "text-purple-600 bg-purple-50",
        href: "content-queues",
      },
      {
        name: "Evergreen Content",
        description: "Recycling evergreen posts",
        icon: Repeat,
        count: mockEvergreenContent.length,
        active: mockEvergreenContent.filter(e => e.isActive).length,
        color: "text-green-600 bg-green-50",
        href: "evergreen-content",
      },
    ],
  },
  {
    title: "Monitoring & Listening",
    description: "Social listening and brand monitoring",
    icon: Ear,
    items: [
      {
        name: "Listening Streams",
        description: "Brand and competitor monitoring",
        icon: Ear,
        count: mockListeningStreams.length,
        active: mockListeningStreams.filter(s => s.isActive).length,
        color: "text-cyan-600 bg-cyan-50",
        href: "listening-streams",
      },
      {
        name: "Crisis Detection",
        description: "Automated crisis detection",
        icon: Shield,
        count: mockCrisisDetectionRules.length,
        active: mockCrisisDetectionRules.filter(r => r.isActive).length,
        color: "text-red-600 bg-red-50",
        href: "crisis-detection",
      },
    ],
  },
  {
    title: "Analytics & Reporting",
    description: "Automated reports and performance alerts",
    icon: BarChart3,
    items: [
      {
        name: "Scheduled Reports",
        description: "Automated report generation",
        icon: BarChart3,
        count: mockScheduledReports.length,
        active: mockScheduledReports.filter(r => r.isActive).length,
        color: "text-indigo-600 bg-indigo-50",
        href: "scheduled-reports",
      },
      {
        name: "Performance Alerts",
        description: "Metric threshold alerts",
        icon: Bell,
        count: mockPerformanceAlerts.length,
        active: mockPerformanceAlerts.filter(a => a.isActive).length,
        color: "text-orange-600 bg-orange-50",
        href: "performance-alerts",
      },
    ],
  },
  {
    title: "Workflow Automation",
    description: "Approval workflows and team collaboration",
    icon: CheckSquare,
    items: [
      {
        name: "Approval Workflows",
        description: "Multi-level approvals",
        icon: CheckSquare,
        count: mockApprovalWorkflows.length,
        active: mockApprovalWorkflows.filter(w => w.isActive).length,
        color: "text-pink-600 bg-pink-50",
        href: "approval-workflows",
      },
    ],
  },
];

export default function AutomationsPage() {
  const totalAutomations = automationCategories.reduce(
    (acc, cat) => acc + cat.items.reduce((sum, item) => sum + item.count, 0),
    0
  );

  const activeAutomations = automationCategories.reduce(
    (acc, cat) => acc + cat.items.reduce((sum, item) => sum + item.active, 0),
    0
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automations</h1>
          <p className="text-muted-foreground">
            Manage all your automated workflows and processes
          </p>
        </div>
        <div className="flex gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{activeAutomations}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center mt-1">
                  <Play className="h-3 w-3" />
                  Active
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{totalAutomations}</div>
                <div className="text-sm text-muted-foreground mt-1">Total</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Automation Categories */}
      <div className="space-y-8">
        {automationCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.title} className="space-y-4">
              <div className="flex items-center gap-2">
                <CategoryIcon className="h-6 w-6" />
                <div>
                  <h2 className="text-2xl font-semibold">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Card key={item.name} className="hover:shadow-md transition-shadow group">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded ${item.color}`}>
                              <ItemIcon className="h-5 w-5" />
                            </div>
                            <span className="text-lg">{item.name}</span>
                          </div>
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Play className="h-3 w-3 text-green-600" />
                              <span className="font-semibold text-green-600">{item.active}</span>
                              <span className="text-muted-foreground">active</span>
                            </div>
                            {item.count - item.active > 0 && (
                              <div className="flex items-center gap-1 text-sm">
                                <Pause className="h-3 w-3 text-muted-foreground" />
                                <span className="font-semibold">{item.count - item.active}</span>
                                <span className="text-muted-foreground">inactive</span>
                              </div>
                            )}
                          </div>
                          <Badge variant="outline">{item.count} total</Badge>
                        </div>
                        <Link href={`/automations/${item.href}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Manage {item.name}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Automation Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{mockRSSFeeds.filter(f => f.autoPublish).length}</div>
              <div className="text-sm text-muted-foreground">Auto-Publishing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockCrisisDetectionRules.filter(r => r.autoCreateIncident).length}</div>
              <div className="text-sm text-muted-foreground">Auto-Create Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockApprovalWorkflows.filter(w => w.autoScheduleOnApproval).length}</div>
              <div className="text-sm text-muted-foreground">Auto-Schedule on Approval</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockListeningStreams.filter(s => s.autoRefresh).length}</div>
              <div className="text-sm text-muted-foreground">Auto-Refreshing Streams</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
