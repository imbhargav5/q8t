"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  StickyNote,
  Tag,
  Star,
  Ban,
  Users,
  TrendingUp,
  Clock,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Person } from "@/lib/zod-schemas";

interface PersonSidebarProps {
  person: Person;
}

export function PersonSidebar({ person }: PersonSidebarProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <StickyNote className="h-4 w-4 mr-2" />
            Add Note
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Tag className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Star className="h-4 w-4 mr-2" />
            {person.is_vip ? "Remove VIP" : "Mark as VIP"}
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Ban className="h-4 w-4 mr-2" />
            Block Contact
          </Button>
        </div>
      </div>

      <Separator />

      {/* Quick Stats */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Engagement Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Response Rate</span>
            <Badge variant="secondary">95%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg Response Time</span>
            <Badge variant="secondary">15 min</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Engagement Score</span>
            <Badge variant="secondary">92/100</Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Recent Activity */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-3 text-sm">
          {person.last_contact_at && (
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Last Contact</div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(person.last_contact_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          )}
          {person.created_at && (
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Added</div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(person.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Related Contacts */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Related Contacts</h3>
        <div className="text-sm text-muted-foreground">
          {person.company ? (
            <>
              <Button variant="link" size="sm" className="p-0 h-auto">
                View contacts from {person.company}
              </Button>
            </>
          ) : (
            "No related contacts"
          )}
        </div>
      </div>
    </div>
  );
}
