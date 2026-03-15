
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, Clock, TrendingUp } from "lucide-react";
import { mockTeamMembers } from "@/lib/mock-data";
import type { ConversationWithRelations } from "@/lib/zod-schemas";
import { Listbox, ListboxGroup, ListboxItem } from "@/components/ui/listbox";

interface InboxListSidebarProps {
  conversations: ConversationWithRelations[];
}

export function InboxListSidebar({ conversations }: InboxListSidebarProps) {
  const totalConversations = conversations.length;
  const unreadCount = conversations.filter((c) => c.unread_count > 0).length;
  const openCount = conversations.filter((c) => c.status === "open").length;
  const avgResponseTime = "15m"; // Mock data

  return (
    <div className="space-y-6">
      {/* Quick Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Quick Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <Badge variant="secondary">{totalConversations}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Unread</span>
            <Badge variant="destructive">{unreadCount}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Open</span>
            <Badge>{openCount}</Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg Response</span>
            <span className="text-sm font-medium">{avgResponseTime}</span>
          </div>
        </CardContent>
      </Card>

      {/* Team Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Listbox orientation="vertical">
            <ListboxGroup className="space-y-3">
              {mockTeamMembers.slice(0, 4).map((member) => (
                <ListboxItem key={member.id} value={member.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar_url || undefined} />
                        <AvatarFallback className="text-xs">
                          {member.full_name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <span className="text-sm">{member.full_name?.split(" ")[0]}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {member.conversation_load}
                  </Badge>
                </ListboxItem>
              ))}
            </ListboxGroup>
          </Listbox>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Listbox orientation="vertical">
            <ListboxGroup>
              <ListboxItem value="activity-1" className="flex items-start gap-2 p-2 rounded-md hover:bg-accent">
                <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-foreground">Sarah resolved 3 conversations</p>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </ListboxItem>
              <Separator className="my-2" />
              <ListboxItem value="activity-2" className="flex items-start gap-2 p-2 rounded-md hover:bg-accent">
                <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-foreground">New message from Twitter</p>
                  <span className="text-xs text-muted-foreground">5 hours ago</span>
                </div>
              </ListboxItem>
              <Separator className="my-2" />
              <ListboxItem value="activity-3" className="flex items-start gap-2 p-2 rounded-md hover:bg-accent">
                <Users className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-foreground">Mike assigned to Emma</p>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
              </ListboxItem>
            </ListboxGroup>
          </Listbox>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-2">
        <Button className="w-full" variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Bulk Actions
        </Button>
      </div>
    </div>
  );
}
