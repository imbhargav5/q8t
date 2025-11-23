"use client";

import * as React from "react";
import {
  Bell,
  Check,
  CheckCheck,
  MessageSquare,
  Heart,
  Share2,
  AlertCircle,
  Settings,
  Filter,
  Search,
  X,
  TrendingUp,
  Shield,
  UserPlus,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Empty } from "@/components/ui/empty";
import {
  mockNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllAsRead,
} from "@/lib/mock-data/notifications";
import type { Notification } from "@/lib/zod-schemas/notification.schema";

const getNotificationIcon = (type: Notification["type"]) => {
  const iconClass = "h-4 w-4";
  switch (type) {
    case "mention":
    case "comment":
      return <MessageSquare className={iconClass} />;
    case "message":
      return <MessageSquare className={iconClass} />;
    case "like":
    case "share":
      return <Heart className={iconClass} />;
    case "alert":
      return <TrendingUp className={iconClass} />;
    case "post_published":
    case "post_scheduled":
    case "campaign_started":
    case "campaign_completed":
      return <Calendar className={iconClass} />;
    case "post_failed":
      return <AlertCircle className={iconClass} />;
    case "system":
      return <Bell className={iconClass} />;
    case "security":
      return <Shield className={iconClass} />;
    case "team_invitation":
      return <UserPlus className={iconClass} />;
    default:
      return <Bell className={iconClass} />;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "post_failed":
    case "security":
      return "destructive";
    case "alert":
      return "default";
    default:
      return "secondary";
  }
};

export default function NotificationsPage() {
  const [selectedNotifications, setSelectedNotifications] = React.useState<string[]>([]);
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [activeTab, setActiveTab] = React.useState("all");

  const unreadCount = notifications.filter((n) => n.read_at === null).length;

  const filterNotifications = (filter: string) => {
    switch (filter) {
      case "unread":
        return notifications.filter((n) => n.read_at === null);
      case "mentions":
        return notifications.filter(
          (n) => n.type === "mention" || n.type === "comment"
        );
      case "messages":
        return notifications.filter((n) => n.type === "message");
      case "engagement":
        return notifications.filter(
          (n) => n.type === "like" || n.type === "share" || n.type === "comment"
        );
      case "system":
        return notifications.filter(
          (n) => n.type === "system" || n.type === "alert" || n.type === "security"
        );
      default:
        return notifications;
    }
  };

  const filteredNotifications = filterNotifications(activeTab);

  const handleMarkAllRead = () => {
    markAllAsRead();
    setNotifications([...notifications]);
  };

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications([...notifications]);
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const toggleNotificationSelection = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              Stay updated with your latest activity
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search notifications..." className="pl-8" />
          </div>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="unread">Unread First</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedNotifications.length > 0 && (
            <>
              <Badge variant="secondary">{selectedNotifications.length} selected</Badge>
              <Button variant="outline" size="sm">
                <Check className="mr-2 h-4 w-4" />
                Mark read
              </Button>
              <Button variant="outline" size="sm">
                <X className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          )}
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
              All
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="mentions"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Mentions
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="engagement"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Engagement
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              System
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            {filteredNotifications.length === 0 ? (
              <Empty
                icon={Bell}
                title="No notifications"
                description="You're all caught up! Check back later for updates."
              />
            ) : (
              <div className="space-y-2">
                {filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`group relative transition-colors ${
                      !notification.read_at
                        ? "border-l-4 border-l-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <CardContent className="flex items-start gap-4 p-4">
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() =>
                          toggleNotificationSelection(notification.id)
                        }
                        className="mt-1"
                      />
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        notification.actor_avatar ? "" : "bg-muted"
                      }`}>
                        {notification.actor_avatar ? (
                          <Avatar>
                            <AvatarImage src={notification.actor_avatar} />
                            <AvatarFallback>
                              {notification.actor_name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          getNotificationIcon(notification.type)
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium leading-snug">
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.body}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getNotificationColor(notification.type)}>
                              {notification.type.replace("_", " ")}
                            </Badge>
                            {notification.platform && (
                              <Badge variant="outline">
                                {notification.platform}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read_at && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                            {notification.action_url && (
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
