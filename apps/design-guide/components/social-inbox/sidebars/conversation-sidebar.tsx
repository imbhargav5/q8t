"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlatformBadge } from "../platform-badge";
import {
  User,
  Globe,
  Zap,
  FileText,
  BarChart3,
  Tag,
  Image as ImageIcon,
  Link as LinkIcon,
  Calendar,
  Mail,
  MapPin,
  Briefcase,
  Plus,
  ExternalLink,
} from "lucide-react";
import type { ConversationWithRelations } from "@/lib/zod-schemas";
import { mockSocialIdentities, getNotesByConversation, getMediaByConversation } from "@/lib/mock-data";
import { format } from "date-fns";

interface ConversationSidebarProps {
  conversation: ConversationWithRelations;
}

export function ConversationSidebar({ conversation }: ConversationSidebarProps) {
  const { person } = conversation;
  const personIdentities = mockSocialIdentities.filter((id) => id.person_id === person.id);
  const notes = getNotesByConversation(conversation.id);
  const media = getMediaByConversation(conversation.id);

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Avatar className="h-20 w-20">
              <AvatarImage src={person.avatar_url || undefined} />
              <AvatarFallback className="text-lg">
                {person.full_name?.substring(0, 2).toUpperCase() || "??"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{person.display_name || person.full_name}</h3>
              {person.job_title && (
                <p className="text-sm text-muted-foreground">{person.job_title}</p>
              )}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {person.is_vip && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30">
                  VIP
                </Badge>
              )}
              {person.is_verified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30">
                  Verified
                </Badge>
              )}
              {person.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            {person.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{person.email}</span>
              </div>
            )}
            {person.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{person.location}</span>
              </div>
            )}
            {person.company && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{person.company}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Social Identities */}
      {personIdentities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Social Identities ({personIdentities.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {personIdentities.map((identity) => (
              <div key={identity.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <PlatformBadge platform={identity.platform} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      @{identity.platform_username || "Unknown"}
                    </p>
                    {identity.follower_count !== null && (
                      <p className="text-xs text-muted-foreground">
                        {identity.follower_count.toLocaleString()} followers
                      </p>
                    )}
                  </div>
                </div>
                {identity.profile_url && (
                  <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" asChild>
                    <a href={identity.profile_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Assign to...
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Tag className="mr-2 h-4 w-4" />
            Add Tags
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </CardContent>
      </Card>

      {/* Conversation Notes */}
      {notes.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes ({notes.length})
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {notes.slice(0, 3).map((note) => (
              <div key={note.id} className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={note.is_pinned ? "bg-amber-100 dark:bg-amber-900/30" : ""}
                  >
                    {note.note_type}
                  </Badge>
                  {note.is_pinned && <span className="text-xs text-amber-600">Pinned</span>}
                </div>
                <p className="text-muted-foreground line-clamp-2">{note.content}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{note.author_name}</span>
                  <span>•</span>
                  <span>{format(new Date(note.created_at), "MMM d")}</span>
                </div>
              </div>
            ))}
            {notes.length > 3 && (
              <Button variant="link" size="sm" className="w-full">
                View all notes →
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Engagement Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Messages</span>
            <span className="text-sm font-medium">{person.total_messages}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Conversations</span>
            <span className="text-sm font-medium">{person.total_conversations}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">First Contact</span>
            <span className="text-sm font-medium">
              {person.first_contact_at
                ? format(new Date(person.first_contact_at), "MMM d, yyyy")
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Activity</span>
            <span className="text-sm font-medium">
              {person.last_contact_at
                ? format(new Date(person.last_contact_at), "MMM d, yyyy")
                : "N/A"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Media Gallery */}
      {media.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Media ({media.length})
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {media.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="aspect-square rounded-lg bg-muted overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {item.thumbnail_url && (
                    <img
                      src={item.thumbnail_url}
                      alt={item.alt_text || "Media"}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5" />
              <div className="flex-1">
                <p className="text-foreground">Conversation created</p>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(conversation.created_at), "MMM d, h:mm a")}
                </span>
              </div>
            </div>
            {conversation.assigned_at && (
              <>
                <Separator />
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-foreground">Assigned to {conversation.assigned_to_user?.full_name}</p>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(conversation.assigned_at), "MMM d, h:mm a")}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
