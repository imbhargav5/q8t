"use client";

import { use } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeedsByWorkspace } from "@/lib/mock-data";
import { Plus, MoreVertical, Clock, LayoutGrid } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

interface FeedsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default function FeedsPage({ params }: FeedsPageProps) {
  const { workspaceId } = use(params);
  const feeds = getFeedsByWorkspace(workspaceId);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Feeds</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your social media feed layouts
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Feed
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feeds.map((feed) => (
              <Card key={feed.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{feed.icon || "📊"}</span>
                      <div>
                        <CardTitle className="text-lg">{feed.name}</CardTitle>
                        {feed.is_default && (
                          <Badge variant="secondary" className="mt-1">
                            Default
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {feed.description && (
                    <CardDescription className="mt-2">
                      {feed.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium">{feed.streams.length}</span>
                      <span>streams</span>
                    </div>
                    {feed.last_viewed_at && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          Viewed{" "}
                          {formatDistanceToNow(new Date(feed.last_viewed_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/workspace/${workspaceId}/feeds/${feed.id}`}
                    className="w-full"
                  >
                    <Button className="w-full" variant="outline">
                      Open Feed
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {feeds.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <LayoutGrid className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No feeds yet</h3>
                <p className="text-sm">
                  Create your first feed to start monitoring your social media
                  activity
                </p>
              </div>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Feed
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
