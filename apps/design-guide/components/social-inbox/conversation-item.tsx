"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { PlatformBadge } from "./platform-badge";
import { formatDistanceToNow } from "date-fns";
import type { ConversationWithRelations } from "@/lib/zod-schemas";

interface ConversationItemProps {
  conversation: ConversationWithRelations;
  isSelected: boolean;
}

export function ConversationItem({ conversation, isSelected }: ConversationItemProps) {
  const { person, platform, unread_count, last_message_at, is_starred, status } = conversation;

  const timeAgo = last_message_at
    ? formatDistanceToNow(new Date(last_message_at), { addSuffix: true })
    : null;

  return (
    <div className="w-full">

      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src={person.avatar_url || undefined} />
            <AvatarFallback>
              {person.full_name?.substring(0, 2).toUpperCase() || person.email?.substring(0, 2).toUpperCase() || "??"}
            </AvatarFallback>
          </Avatar>
          {/* Platform Badge Overlay */}
          <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5 shadow-sm">
            <PlatformBadge platform={platform} size="sm" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className={cn(
                "font-medium truncate text-sm",
                unread_count > 0 && "font-semibold"
              )}>
                {person.display_name || person.full_name || person.email}
              </h3>
              {person.is_vip && (
                <Badge variant="secondary" className="text-xs">
                  VIP
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {is_starred && (
                <Star className="h-4 w-4 fill-primary text-primary" />
              )}
              {timeAgo && (
                <span className={cn(
                  "text-xs",
                  unread_count > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {timeAgo.replace(" ago", "")}
                </span>
              )}
            </div>
          </div>

          {/* Last Message Preview */}
          <p className={cn(
            "text-sm truncate",
            unread_count > 0 ? "text-foreground font-medium" : "text-muted-foreground"
          )}>
            {conversation.subject || "No recent messages"}
          </p>

          {/* Status and Unread Count */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {status !== "open" && (
                <Badge variant="outline" className="text-xs h-5">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              )}
              {conversation.assigned_to_user && (
                <span className="text-xs text-muted-foreground">
                  → {conversation.assigned_to_user.full_name?.split(" ")[0]}
                </span>
              )}
            </div>

            {unread_count > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
              >
                {unread_count > 9 ? "9+" : unread_count}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
