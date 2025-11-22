"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonOverview } from "./person-overview";
import { PersonConversations } from "./person-conversations";
import { PersonTimeline } from "./person-timeline";
import { PersonNotes } from "./person-notes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  Phone,
  MessageSquare,
  MoreVertical,
  Star,
  ShieldCheck,
  Edit,
  Trash,
  UserPlus,
  Ban,
} from "lucide-react";
import type { Person } from "@/lib/zod-schemas";

interface PersonDetailProps {
  person: Person;
}

export function PersonDetail({ person }: PersonDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={person.avatar_url || undefined} />
            <AvatarFallback className="text-lg">
              {person.full_name?.substring(0, 2).toUpperCase() || "??"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">
                {person.full_name || person.email || "Unknown"}
              </h2>
              {person.is_vip && (
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              )}
              {person.is_verified && (
                <ShieldCheck className="h-5 w-5 text-blue-500" />
              )}
            </div>

            {person.job_title && person.company && (
              <p className="text-muted-foreground">
                {person.job_title} at {person.company}
              </p>
            )}

            {person.location && (
              <p className="text-sm text-muted-foreground mt-1">
                📍 {person.location}
              </p>
            )}

            {person.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {person.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Contact
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign to...
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  {person.is_vip ? "Remove VIP" : "Mark as VIP"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Ban className="mr-2 h-4 w-4" />
                  Block Contact
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Contact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 px-6">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="conversations"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Conversations
            <Badge variant="secondary" className="ml-2">
              {person.total_conversations}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Timeline
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 m-0">
          <PersonOverview person={person} />
        </TabsContent>

        <TabsContent value="conversations" className="flex-1 m-0">
          <PersonConversations person={person} />
        </TabsContent>

        <TabsContent value="timeline" className="flex-1 m-0">
          <PersonTimeline person={person} />
        </TabsContent>

        <TabsContent value="notes" className="flex-1 m-0">
          <PersonNotes person={person} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
