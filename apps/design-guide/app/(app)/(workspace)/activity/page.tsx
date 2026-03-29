"use client";

import * as React from "react";
import {
  History,
  Search,
  Download,
  Filter,
  Calendar,
  User,
  Settings,
  FileText,
  Upload,
  Key,
  Shield,
  UserPlus,
  Bot,
  Link2,
} from "lucide-react";
import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockActivityLog } from "@/lib/mock-data/activity-log";
import type { ActivityLog } from "@/lib/zod-schemas/activity-log.schema";

const getActivityIcon = (action: string) => {
  const iconClass = "h-4 w-4";
  if (action.includes("post")) return <FileText className={iconClass} />;
  if (action.includes("member") || action.includes("invited")) return <UserPlus className={iconClass} />;
  if (action.includes("settings")) return <Settings className={iconClass} />;
  if (action.includes("uploaded")) return <Upload className={iconClass} />;
  if (action.includes("automation")) return <Bot className={iconClass} />;
  if (action.includes("api")) return <Key className={iconClass} />;
  if (action.includes("password") || action.includes("security")) return <Shield className={iconClass} />;
  if (action.includes("connected")) return <Link2 className={iconClass} />;
  return <History className={iconClass} />;
};

const getActionColor = (action: string) => {
  if (action.includes("deleted") || action.includes("removed")) return "destructive";
  if (action.includes("security") || action.includes("password")) return "default";
  if (action.includes("published") || action.includes("created")) return "default";
  return "secondary";
};

const formatActionLabel = (action: string) => {
  return action
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const groupActivitiesByDate = (activities: ActivityLog[]) => {
  const groups: Record<string, ActivityLog[]> = {};

  activities.forEach((activity) => {
    const date = parseISO(activity.created_at);
    let label: string;

    if (isToday(date)) {
      label = "Today";
    } else if (isYesterday(date)) {
      label = "Yesterday";
    } else {
      label = format(date, "MMMM d, yyyy");
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(activity);
  });

  return groups;
};

export default function ActivityPage() {
  const [activeTab, setActiveTab] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filterActivities = (filter: string) => {
    let filtered = mockActivityLog;

    // Filter by tab
    switch (filter) {
      case "users":
        filtered = filtered.filter((a) => a.actor_id !== null && a.actor_name !== "System");
        break;
      case "system":
        filtered = filtered.filter((a) => a.actor_name === "System");
        break;
      case "api":
        filtered = filtered.filter((a) => a.action.includes("api"));
        break;
      case "security":
        filtered = filtered.filter(
          (a) =>
            a.action.includes("password") ||
            a.action.includes("security") ||
            a.entity_type === "security"
        );
        break;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.details.toLowerCase().includes(query) ||
          a.actor_name.toLowerCase().includes(query) ||
          (a.entity_name?.toLowerCase().includes(query) ?? false)
      );
    }

    return filtered;
  };

  const filteredActivities = filterActivities(activeTab);
  const groupedActivities = groupActivitiesByDate(filteredActivities);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <History className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Activity Log</h1>
            <p className="text-sm text-muted-foreground">
              Track all workspace activity and changes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activity..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {filteredActivities.length} events
          </Badge>
        </div>
      </div>

      {/* Tabs & Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b px-6">
          <TabsList className="h-auto rounded-none border-0 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              All Activity
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              User Actions
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              System Events
            </TabsTrigger>
            <TabsTrigger
              value="api"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              API Calls
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Security
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            {Object.entries(groupedActivities).map(([date, activities]) => (
              <div key={date} className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-sm font-semibold">{date}</h3>
                  <Separator className="flex-1" />
                </div>

                <div className="relative space-y-4 pl-6">
                  {/* Timeline line */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

                  {activities.map((activity, index) => (
                    <div key={activity.id} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-6 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted">
                        {getActivityIcon(activity.action)}
                      </div>

                      <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <Avatar className="h-8 w-8">
                                {activity.actor_avatar ? (
                                  <AvatarImage src={activity.actor_avatar} />
                                ) : null}
                                <AvatarFallback className="text-xs">
                                  {activity.actor_name === "System"
                                    ? "SYS"
                                    : activity.actor_name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {activity.actor_name}
                                  </span>
                                  <Badge variant={getActionColor(activity.action)}>
                                    {formatActionLabel(activity.action)}
                                  </Badge>
                                  {activity.entity_type && (
                                    <Badge variant="outline">
                                      {activity.entity_type}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {activity.details}
                                </p>
                                {activity.entity_name && (
                                  <p className="text-sm font-medium">
                                    {activity.entity_name}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>
                                    {formatDistanceToNow(parseISO(activity.created_at), {
                                      addSuffix: true,
                                    })}
                                  </span>
                                  {activity.ip_address && (
                                    <span>IP: {activity.ip_address}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {format(parseISO(activity.created_at), "h:mm a")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
