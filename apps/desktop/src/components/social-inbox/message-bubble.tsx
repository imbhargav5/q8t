
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Repeat2, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import type { MessageWithEngagement, Person } from "@/lib/zod-schemas";

interface MessageBubbleProps {
  message: MessageWithEngagement;
  person: Person;
}

export function MessageBubble({ message, person }: MessageBubbleProps) {
  const isFromContact = message.is_from_contact;
  const timestamp = format(new Date(message.platform_created_at), "MMM d, h:mm a");

  return (
    <div className={cn("flex gap-3", !isFromContact && "flex-row-reverse")}>
      {/* Avatar */}
      {isFromContact && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={person.avatar_url || undefined} />
          <AvatarFallback className="text-xs">
            {person.full_name?.substring(0, 2).toUpperCase() || "??"}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div className={cn("flex flex-col gap-1 max-w-[70%]", !isFromContact && "items-end")}>
        {/* Message Type Badge */}
        {message.message_type !== "dm" && (
          <Badge variant="outline" className="text-xs w-fit">
            {message.message_type.replace("_", " ")}
          </Badge>
        )}

        {/* Message Bubble */}
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            isFromContact
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content_preview}
          </p>

          {/* Engagement Metrics (for public messages) */}
          {message.engagement && (
            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-current/10 text-xs opacity-70">
              {message.engagement.like_count! > 0 && (
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <span>{message.engagement.like_count}</span>
                </div>
              )}
              {message.engagement.retweet_count! > 0 && (
                <div className="flex items-center gap-1">
                  <Repeat2 className="h-3 w-3" />
                  <span>{message.engagement.retweet_count}</span>
                </div>
              )}
              {message.engagement.reply_count! > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{message.engagement.reply_count}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground px-1">{timestamp}</span>
      </div>

      {/* Avatar for outgoing messages */}
      {!isFromContact && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
          <AvatarFallback className="text-xs">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
