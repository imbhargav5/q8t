"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { RightSidebarContainer } from "@/components/layout/right-sidebar-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Sparkles,
  RefreshCw,
  Copy,
  Mail,
  Tag,
  Clock,
  TrendingUp,
  Wand2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { mockPeople } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import type { Person } from "@/lib/zod-schemas";

export default function ComposeEmailPage() {
  const params = useParams();
  const router = useRouter();
  const personId = params.personId as string;

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [aiTone, setAiTone] = useState("professional");
  const [aiLength, setAiLength] = useState("medium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(true);

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

  // Set default recipient
  if (!to && person.email) {
    setTo(person.email);
  }

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `Hi ${person.full_name || "there"},

I hope this email finds you well. I wanted to reach out regarding our recent conversation about the upcoming project.

I've reviewed the materials you shared and have some thoughts I'd like to discuss. Would you be available for a quick call this week to go over the details?

Looking forward to hearing from you.

Best regards`;
      setBody(generatedContent);
      setIsGenerating(false);
    }, 1500);
  };

  const handleAiImprove = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setBody((prev) => prev + "\n\n[AI-improved version would appear here]");
      setIsGenerating(false);
    }, 1000);
  };

  const handleSend = () => {
    console.log("Sending email:", { to, subject, body, personId });
    router.push(`/crm/${personId}/email`);
  };

  return (
    <div className="flex h-screen">
      {/* Main Compose Area */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/crm/${personId}/email`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">Compose Email</h2>
            <div className="flex-1" />
            <Button variant="outline" onClick={() => router.push(`/crm/${personId}/email`)}>
              Discard
            </Button>
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

        {/* Email Form */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* To Field */}
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={person.avatar_url || undefined} />
                  <AvatarFallback>
                    {person.full_name?.substring(0, 2).toUpperCase() || "??"}
                  </AvatarFallback>
                </Avatar>
                <Input
                  id="to"
                  type="email"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="flex-1"
                />
              </div>
              {person.full_name && (
                <p className="text-sm text-muted-foreground">
                  Sending to {person.full_name}
                  {person.job_title && person.company && ` (${person.job_title} at ${person.company})`}
                </p>
              )}
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>

            {/* AI Panel */}
            <Card className="border-dashed border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">AI Email Assistant</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAiPanel(!showAiPanel)}
                  >
                    {showAiPanel ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardDescription>
                  Generate or improve your email with AI assistance
                </CardDescription>
              </CardHeader>

              {showAiPanel && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tone</Label>
                      <Select value={aiTone} onValueChange={setAiTone}>
                        <SelectTrigger id="tone">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="length">Length</Label>
                      <Select value={aiLength} onValueChange={setAiLength}>
                        <SelectTrigger id="length">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleAiGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Email
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleAiImprove}
                      disabled={isGenerating || !body}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Improve Draft
                    </Button>
                  </div>

                  {/* AI Suggestions */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Quick Prompts</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSubject("Following up on our conversation");
                          handleAiGenerate();
                        }}
                      >
                        Follow-up
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSubject("Introduction and next steps");
                          handleAiGenerate();
                        }}
                      >
                        Introduction
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSubject("Thank you");
                          handleAiGenerate();
                        }}
                      >
                        Thank You
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSubject("Meeting request");
                          handleAiGenerate();
                        }}
                      >
                        Meeting Request
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Body Field */}
            <div className="space-y-2">
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Type your message here..."
                rows={16}
                className="font-mono text-sm"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{body.length} characters</span>
                <span>{body.split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <Label>Attachments</Label>
              <Button variant="outline" className="w-full">
                <Paperclip className="h-4 w-4 mr-2" />
                Attach Files
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Context & Info */}
      <RightSidebarContainer>
        <div className="p-4 space-y-6">
          {/* Person Info */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Recipient Information</h3>
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
                  <span className="truncate">{person.email}</span>
                </div>
              )}
              {person.location && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">📍</span>
                  <span>{person.location}</span>
                </div>
              )}
              {person.timezone && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{person.timezone}</span>
                </div>
              )}
            </div>

            {person.tags.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {person.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Engagement Stats */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Engagement Insights</h3>
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm">Response Rate</span>
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-xs text-muted-foreground">
                  Usually responds within 2 hours
                </div>
              </div>

              <div className="p-3 bg-secondary rounded-lg">
                <div className="text-sm font-medium mb-1">Best Time to Email</div>
                <div className="text-xs text-muted-foreground">
                  Weekdays, 9am - 5pm {person.timezone || "their timezone"}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Social Activity */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Recent Social Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span>𝕏</span>
                  <span className="font-medium">Twitter</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">2 days ago</div>
                <div className="text-xs">
                  "Excited to announce our new product launch! 🚀"
                </div>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span>💼</span>
                  <span className="font-medium">LinkedIn</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">5 days ago</div>
                <div className="text-xs">
                  "Great article about industry trends..."
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Previous Conversations */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Recent Email Thread</h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-secondary rounded-lg">
                <div className="font-medium mb-1">Re: Project Update</div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(Date.now() - 2 * 60 * 60 * 1000), { addSuffix: true })}
                </div>
              </div>
              <div className="p-2 bg-secondary rounded-lg">
                <div className="font-medium mb-1">Follow-up on meeting</div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(Date.now() - 24 * 60 * 60 * 1000), { addSuffix: true })}
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
                View CRM Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => router.push(`/crm/${personId}/email`)}
              >
                View Email History
              </Button>
            </div>
          </div>
        </div>
      </RightSidebarContainer>
    </div>
  );
}
