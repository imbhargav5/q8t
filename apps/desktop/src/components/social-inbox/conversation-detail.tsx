
import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlatformBadge } from "./platform-badge";
import { StatusBadge } from "./status-badge";
import { MessageBubble } from "./message-bubble";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Star,
  Archive,
  UserPlus,
  Send,
  Paperclip,
  Smile,
} from "lucide-react";
import type { ConversationWithRelations } from "@/lib/zod-schemas";
import { getMessagesByConversation } from "@/lib/mock-data";

interface ConversationDetailProps {
  conversation: ConversationWithRelations;
}

export function ConversationDetail({ conversation }: ConversationDetailProps) {
  const [message, setMessage] = useState("");
  const messages = getMessagesByConversation(conversation.id);
  const { person, platform, status, is_starred, assigned_to_user } = conversation;

  const handleSend = () => {
    if (!message.trim()) return;
    // In a real app, send the message
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={person.avatar_url || undefined} />
              <AvatarFallback>
                {person.full_name?.substring(0, 2).toUpperCase() || "??"}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">
                  {person.display_name || person.full_name || person.email}
                </h2>
                <PlatformBadge platform={platform} size="sm" />
              </div>
              <p className="text-sm text-muted-foreground">
                {person.location || "No location"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status={status} />

            {assigned_to_user && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <UserPlus className="h-4 w-4" />
                <span>{assigned_to_user.full_name}</span>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={is_starred ? "text-primary" : ""}
            >
              <Star className={is_starred ? "fill-current" : ""} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign to...
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Mark as spam
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-4"
        >
          {messages.length > 0 ? (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <MessageBubble message={msg} person={person} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet</p>
            </div>
          )}
        </motion.div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="min-h-[60px] resize-none pr-20"
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSend} size="icon" className="h-[60px] w-[60px]">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
