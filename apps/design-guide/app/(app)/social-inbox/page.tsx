"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ConversationList } from "@/components/social-inbox/conversation-list";
import { ConversationDetail } from "@/components/social-inbox/conversation-detail";
import { InboxListSidebar } from "@/components/social-inbox/sidebars/inbox-list-sidebar";
import { ConversationSidebar } from "@/components/social-inbox/sidebars/conversation-sidebar";
import { RightSidebarContainer } from "@/components/layout/right-sidebar-container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockConversations } from "@/lib/mock-data";
import type { ConversationWithRelations } from "@/lib/zod-schemas";

export default function SocialInboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithRelations | null>(null);
  const [conversations] = useState(mockConversations);

  return (
    <div className="flex h-full">
      {/* Conversation List - Left Panel */}
      <div className="w-80 border-r bg-background flex flex-col">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversation?.id}
          onSelect={setSelectedConversation}
        />
      </div>

      {/* Conversation Detail - Center Panel */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ConversationDetail conversation={selectedConversation} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-4">
              <p className="text-lg">Select a conversation to view messages</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Context Aware */}
      <RightSidebarContainer>
        {selectedConversation ? (
          <ConversationSidebar conversation={selectedConversation} />
        ) : (
          <InboxListSidebar conversations={conversations} />
        )}
      </RightSidebarContainer>
    </div>
  );
}
