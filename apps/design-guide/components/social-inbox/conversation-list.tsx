"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { ConversationItem } from "./conversation-item";
import type { ConversationWithRelations } from "@/lib/zod-schemas";
import { Listbox, ListboxGroup, ListboxItem } from "@/components/ui/listbox";

interface ConversationListProps {
  conversations: ConversationWithRelations[];
  selectedId?: string;
  onSelect: (conversation: ConversationWithRelations) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesName = conv.person.full_name?.toLowerCase().includes(searchLower);
      const matchesEmail = conv.person.email?.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesEmail) return false;
    }

    // Status filter
    if (filter === "unread" && conv.unread_count === 0) return false;
    if (filter === "starred" && !conv.is_starred) return false;
    if (filter === "open" && conv.status !== "open") return false;
    if (filter === "pending" && conv.status !== "pending") return false;

    return true;
  });

  // Sort by most recent
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    const aTime = new Date(a.last_message_at || a.created_at).getTime();
    const bTime = new Date(b.last_message_at || b.created_at).getTime();
    return bTime - aTime;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
            <TabsTrigger value="starred" className="text-xs">Starred</TabsTrigger>
            <TabsTrigger value="open" className="text-xs">Open</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        {sortedConversations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No conversations found</p>
          </div>
        ) : (
          <Listbox orientation="vertical">
            <ListboxGroup>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {sortedConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <ListboxItem value={conversation.id}>
                      <ConversationItem
                        conversation={conversation}
                        isSelected={conversation.id === selectedId}
                        onClick={() => onSelect(conversation)}
                      />
                    </ListboxItem>
                  </motion.div>
                ))}
              </motion.div>
            </ListboxGroup>
          </Listbox>
        )}
      </ScrollArea>
    </div>
  );
}
