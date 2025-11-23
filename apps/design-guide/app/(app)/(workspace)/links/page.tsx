"use client";

import * as React from "react";
import { Link2, Plus, Copy, QrCode, BarChart3, Calendar, Lock, Archive, ExternalLink, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { mockShortLinks, getTotalClicks, getTotalUniqueClicks } from "@/lib/mock-data/links";
import type { ShortLink } from "@/lib/zod-schemas/link.schema";

export default function LinksPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLink, setSelectedLink] = React.useState<ShortLink | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  const filteredLinks = React.useMemo(() => {
    return mockShortLinks.filter((link) => {
      const query = searchQuery.toLowerCase();
      return (
        link.title?.toLowerCase().includes(query) ||
        link.short_code.toLowerCase().includes(query) ||
        link.original_url.toLowerCase().includes(query) ||
        link.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  const activeLinks = filteredLinks.filter((link) => link.is_active);
  const expiredLinks = filteredLinks.filter((link) => {
    if (!link.expires_at) return false;
    return new Date(link.expires_at) < new Date();
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link2 className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Links & UTM Builder</h1>
          </div>
          <p className="text-muted-foreground">
            Create short links, build UTM parameters, and track click analytics
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Short Link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Short Link</DialogTitle>
              <DialogDescription>
                Shorten your URL and add UTM parameters for tracking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="original-url">Destination URL *</Label>
                <Input id="original-url" placeholder="https://example.com/your-page" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="short-code">Short Code</Label>
                  <Input id="short-code" placeholder="my-link" />
                  <p className="text-xs text-muted-foreground">
                    short.link/<span className="font-medium">my-link</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Campaign name" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base font-semibold">UTM Parameters</Label>
                <p className="text-sm text-muted-foreground">
                  Add UTM parameters to track campaign performance
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="utm-source">Source</Label>
                  <Input id="utm-source" placeholder="facebook" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="utm-medium">Medium</Label>
                  <Input id="utm-medium" placeholder="social" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="utm-campaign">Campaign</Label>
                  <Input id="utm-campaign" placeholder="summer_sale" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="utm-content">Content</Label>
                  <Input id="utm-content" placeholder="banner_ad" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="utm-term">Term (Optional)</Label>
                <Input id="utm-term" placeholder="running shoes" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base font-semibold">Advanced Options</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expires-at">Expiration Date</Label>
                  <Input id="expires-at" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password Protection</Label>
                  <Input id="password" type="password" placeholder="Optional" />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setCreateDialogOpen(false)}>
                  Create Short Link
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockShortLinks.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeLinks.length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalClicks().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalUniqueClicks().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((getTotalUniqueClicks() / getTotalClicks()) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Unique vs total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search links by title, code, URL, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Links List */}
      <Tabs defaultValue="all" className="flex-1">
        <TabsList>
          <TabsTrigger value="all">
            All Links
            <Badge variant="secondary" className="ml-2">
              {filteredLinks.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            <Badge variant="secondary" className="ml-2">
              {activeLinks.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="expired">
            Expired
            <Badge variant="secondary" className="ml-2">
              {expiredLinks.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredLinks.map((link) => (
            <Card key={link.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{link.title || "Untitled Link"}</h3>
                          {!link.is_active && (
                            <Badge variant="secondary">
                              <Archive className="mr-1 h-3 w-3" />
                              Inactive
                            </Badge>
                          )}
                          {link.password && (
                            <Badge variant="outline">
                              <Lock className="mr-1 h-3 w-3" />
                              Protected
                            </Badge>
                          )}
                          {link.expires_at && new Date(link.expires_at) < new Date() && (
                            <Badge variant="destructive">Expired</Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5">
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                        <code className="text-sm font-medium">{link.short_url}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(link.short_url)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLink(link)}
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        QR Code
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ExternalLink className="h-3 w-3" />
                      <span className="max-w-md truncate">{link.original_url}</span>
                    </div>

                    {(link.utm_source || link.utm_medium || link.utm_campaign) && (
                      <div className="flex flex-wrap gap-2">
                        {link.utm_source && (
                          <Badge variant="outline" className="text-xs">
                            Source: {link.utm_source}
                          </Badge>
                        )}
                        {link.utm_medium && (
                          <Badge variant="outline" className="text-xs">
                            Medium: {link.utm_medium}
                          </Badge>
                        )}
                        {link.utm_campaign && (
                          <Badge variant="outline" className="text-xs">
                            Campaign: {link.utm_campaign}
                          </Badge>
                        )}
                      </div>
                    )}

                    {link.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {link.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold">{link.clicks.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        {link.unique_clicks.toLocaleString()} unique
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {link.last_clicked_at ? formatRelativeTime(link.last_clicked_at) : "Never clicked"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredLinks.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Link2 className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No links found</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  {searchQuery
                    ? "No links match your search criteria"
                    : "Create your first short link to get started"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Short Link
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeLinks.map((link) => (
            <Card key={link.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{link.title || "Untitled Link"}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{link.short_url}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{link.clicks.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">clicks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {expiredLinks.map((link) => (
            <Card key={link.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{link.title || "Untitled Link"}</h3>
                      <Badge variant="destructive">Expired</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Expired on {formatDate(link.expires_at!)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{link.clicks.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">total clicks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* QR Code Sheet */}
      <Sheet open={!!selectedLink} onOpenChange={() => setSelectedLink(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>QR Code</SheetTitle>
            <SheetDescription>
              {selectedLink?.title || "Untitled Link"}
            </SheetDescription>
          </SheetHeader>
          {selectedLink && (
            <div className="mt-6 space-y-6">
              <div className="flex justify-center">
                <div className="rounded-lg border bg-white p-4">
                  <img
                    src={selectedLink.qr_code_url!}
                    alt="QR Code"
                    className="h-64 w-64"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Short URL</Label>
                <div className="flex gap-2">
                  <Input value={selectedLink.short_url} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(selectedLink.short_url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">QR Code Options</h4>
                <Button variant="outline" className="w-full">
                  Download PNG
                </Button>
                <Button variant="outline" className="w-full">
                  Download SVG
                </Button>
                <Button variant="outline" className="w-full">
                  Print QR Code
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
