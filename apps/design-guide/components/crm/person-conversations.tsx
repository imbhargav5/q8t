"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Person } from "@/lib/zod-schemas";
import { mockConversations } from "@/lib/mock-data";

interface PersonConversationsProps {
  person: Person;
}

export function PersonConversations({ person }: PersonConversationsProps) {
  // Filter conversations for this person
  const personConversations = mockConversations.filter(
    (c) => c.person_id === person.id
  );

  if (personConversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="text-4xl">💬</div>
          <p className="text-muted-foreground">No conversations yet</p>
          <Button>Start a conversation</Button>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-3 max-w-4xl">
        <h3 className="text-sm font-semibold mb-4">
          {personConversations.length} Conversation{personConversations.length !== 1 ? "s" : ""}
        </h3>

        {personConversations.map((conversation) => (
          <Card key={conversation.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">
                      {conversation.platform}
                    </Badge>
                    <Badge variant={
                      conversation.status === "open" ? "default" :
                      conversation.status === "resolved" ? "secondary" :
                      "outline"
                    }>
                      {conversation.status}
                    </Badge>
                    {conversation.message_count > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {conversation.message_count} messages
                      </span>
                    )}
                  </div>

                  {conversation.subject && (
                    <h4 className="font-medium mb-1">{conversation.subject}</h4>
                  )}

                  <div className="text-sm text-muted-foreground">
                    {conversation.last_message_at ? (
                      <>
                        Last message{" "}
                        {formatDistanceToNow(new Date(conversation.last_message_at), {
                          addSuffix: true,
                        })}
                      </>
                    ) : conversation.created_at ? (
                      <>
                        Created{" "}
                        {formatDistanceToNow(new Date(conversation.created_at), {
                          addSuffix: true,
                        })}
                      </>
                    ) : null}
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View in Inbox
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
