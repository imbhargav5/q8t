
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCheck,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Settings,
  X,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: "mention" | "message" | "alert" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "mention",
    title: "New mention on Twitter",
    message: "@johndoe mentioned you in a tweet",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "New direct message",
    message: "Sarah Johnson sent you a message on LinkedIn",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: "3",
    type: "alert",
    title: "High engagement detected",
    message: "Your post 'Product Launch' is trending with 1.2K likes",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Scheduled post published",
    message: "Your post was successfully published to Facebook",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "5",
    type: "mention",
    title: "Multiple mentions detected",
    message: "You were mentioned 5 times in the last hour",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "mention":
      return <MessageSquare className="h-4 w-4" />;
    case "message":
      return <MessageSquare className="h-4 w-4" />;
    case "alert":
      return <TrendingUp className="h-4 w-4" />;
    case "system":
      return <Bell className="h-4 w-4" />;
  }
};

export function NotificationsSheet({
  open,
  onOpenChange,
}: NotificationsSheetProps) {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    console.log("Mark all as read");
    // In real app, update notification status
  };

  const handleMarkAsRead = (id: string) => {
    console.log("Mark as read:", id);
    // In real app, update notification status
  };

  const handleDismiss = (id: string) => {
    console.log("Dismiss notification:", id);
    // In real app, remove notification
  };

  const filterNotifications = (filter: "all" | "unread" | "mentions" | "system") => {
    switch (filter) {
      case "unread":
        return mockNotifications.filter((n) => !n.read);
      case "mentions":
        return mockNotifications.filter((n) => n.type === "mention" || n.type === "message");
      case "system":
        return mockNotifications.filter((n) => n.type === "system" || n.type === "alert");
      default:
        return mockNotifications;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <SheetTitle>Notifications</SheetTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="rounded-full px-2 py-0.5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          </div>
          <SheetDescription>
            Stay updated with your latest activity
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All
              {mockNotifications.length > 0 && (
                <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0 text-xs">
                  {mockNotifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-220px)] mt-4">
            {(["all", "unread", "mentions", "system"] as const).map((filter) => (
              <TabsContent key={filter} value={filter} className="space-y-2 m-0">
                {filterNotifications(filter).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground opacity-50" />
                    <p className="mt-4 text-sm font-medium">No notifications</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You&apos;re all caught up!
                    </p>
                  </div>
                ) : (
                  filterNotifications(filter).map((notification) => (
                    <div
                      key={notification.id}
                      className={`group relative rounded-lg border p-4 transition-colors ${
                        !notification.read ? "bg-primary/5 border-primary/20" : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 rounded-full p-2 ${
                            !notification.read ? "bg-primary/10" : "bg-muted"
                          }`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium leading-snug">
                              {notification.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 -mt-1 -mr-2 h-6 w-6 p-0"
                              onClick={() => handleDismiss(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        {notification.actionUrl && (
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>

        <div className="absolute bottom-0 left-0 right-0 border-t p-4 bg-background">
          <Button variant="outline" className="w-full" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Notification Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
