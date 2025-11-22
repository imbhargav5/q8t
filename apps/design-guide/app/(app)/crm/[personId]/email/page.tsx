"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RightSidebarContainer } from "@/components/layout/right-sidebar-container";
import {
  ArrowLeft,
  Search,
  Star,
  Archive,
  Trash2,
  Mail,
  MailOpen,
  Paperclip,
  Send,
  RefreshCw,
  MoreVertical,
  Inbox,
  Tag,
  Clock,
} from "lucide-react";
import { mockPeople } from "@/lib/mock-data";
import { formatDistanceToNow, format } from "date-fns";
import type { Person } from "@/lib/zod-schemas";

// Mock email data
interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  hasAttachment: boolean;
  labels: string[];
}

const mockEmails: Email[] = [
  {
    id: "1",
    from: "sarah@example.com",
    subject: "Re: Project Update",
    preview: "Thanks for the update! I've reviewed the documents and have a few questions...",
    body: "Thanks for the update! I've reviewed the documents and have a few questions about the timeline. Can we schedule a call this week?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    starred: true,
    hasAttachment: true,
    labels: ["work", "important"],
  },
  {
    id: "2",
    from: "sarah@example.com",
    subject: "Follow-up on meeting",
    preview: "It was great catching up yesterday. Here are my notes from our discussion...",
    body: "It was great catching up yesterday. Here are my notes from our discussion about the Q4 roadmap.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    starred: false,
    hasAttachment: false,
    labels: ["work"],
  },
  {
    id: "3",
    from: "sarah@example.com",
    subject: "Welcome aboard!",
    preview: "Welcome to the team! We're excited to have you join us...",
    body: "Welcome to the team! We're excited to have you join us. Let me know if you need anything.",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    starred: false,
    hasAttachment: false,
    labels: [],
  },
];

export default function EmailInboxPage() {
  const params = useParams();
  const router = useRouter();
  const personId = params.personId as string;
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(mockEmails[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Find the person
  const person = mockPeople.find((p) => p.id === personId);

  if (!person) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Person not found</p>
          <Button onClick={() => router.push("/crm")} className="mt-4">
            Back to CRM
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Email List */}
      <div className="w-96 border-r bg-background flex flex-col">
        {/* Header */}
        <div className="border-b p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/crm")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                Email - {person.full_name || person.email}
              </h2>
            </div>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Button
            className="w-full"
            onClick={() => router.push(`/crm/${personId}/email/new`)}
          >
            <Send className="h-4 w-4 mr-2" />
            Compose Email
          </Button>
        </div>

        {/* Email List */}
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {mockEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`p-4 cursor-pointer hover:bg-secondary transition-colors ${
                  selectedEmail?.id === email.id ? "bg-secondary" : ""
                } ${!email.read ? "bg-blue-50/50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={person.avatar_url || undefined} />
                    <AvatarFallback>
                      {person.full_name?.substring(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`flex-1 truncate ${!email.read ? "font-semibold" : ""}`}>
                        {person.full_name || email.from}
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(email.timestamp), { addSuffix: true })}
                      </div>
                    </div>

                    <div className={`text-sm mb-1 ${!email.read ? "font-semibold" : ""}`}>
                      {email.subject}
                    </div>

                    <div className="text-sm text-muted-foreground truncate">
                      {email.preview}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {!email.read && (
                        <Badge variant="default" className="h-5 text-xs">
                          New
                        </Badge>
                      )}
                      {email.starred && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                      {email.hasAttachment && <Paperclip className="h-3 w-3 text-muted-foreground" />}
                      {email.labels.map((label) => (
                        <Badge key={label} variant="outline" className="h-5 text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="border-b p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{selectedEmail.subject}</h2>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar_url || undefined} />
                      <AvatarFallback>
                        {person.full_name?.substring(0, 2).toUpperCase() || "??"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{person.full_name || selectedEmail.from}</div>
                      <div className="text-sm text-muted-foreground">{selectedEmail.from}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(selectedEmail.timestamp), "PPP 'at' p")}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Star
                      className={`h-4 w-4 ${
                        selectedEmail.starred ? "text-amber-500 fill-amber-500" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {selectedEmail.labels.length > 0 && (
                <div className="flex gap-2">
                  {selectedEmail.labels.map((label) => (
                    <Badge key={label} variant="secondary">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Email Body */}
            <ScrollArea className="flex-1">
              <div className="p-6 max-w-4xl">
                <div className="prose prose-sm max-w-none">
                  <p>{selectedEmail.body}</p>
                </div>

                {selectedEmail.hasAttachment && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold mb-3">Attachments</h3>
                    <div className="border rounded-lg p-3 flex items-center gap-3">
                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Project_Update.pdf</div>
                        <div className="text-xs text-muted-foreground">2.4 MB</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Reply Footer */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button variant="outline">Forward</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-4">
              <Mail className="h-16 w-16 mx-auto opacity-50" />
              <p className="text-lg">Select an email to view</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Person Info */}
      <RightSidebarContainer>
        <div className="p-4 space-y-6">
          {/* Person Info */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={person.avatar_url || undefined} />
                <AvatarFallback>
                  {person.full_name?.substring(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{person.full_name}</div>
                {person.job_title && person.company && (
                  <div className="text-sm text-muted-foreground">
                    {person.job_title} at {person.company}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {person.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{person.email}</span>
                </div>
              )}
              {person.location && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">📍</span>
                  <span>{person.location}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Email Stats */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Email Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Emails</span>
                <Badge variant="secondary">{mockEmails.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Unread</span>
                <Badge variant="secondary">
                  {mockEmails.filter((e) => !e.read).length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Email</span>
                <span className="text-sm">
                  {formatDistanceToNow(new Date(mockEmails[0].timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Social Inbox */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Social Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span>𝕏</span>
                  <span className="font-medium">Twitter</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last tweet: 2 days ago
                </div>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span>💼</span>
                  <span className="font-medium">LinkedIn</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last post: 5 days ago
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => router.push("/crm")}
              >
                View Full CRM Profile
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Tag className="h-4 w-4 mr-2" />
                Add Tag
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
            </div>
          </div>
        </div>
      </RightSidebarContainer>
    </div>
  );
}
