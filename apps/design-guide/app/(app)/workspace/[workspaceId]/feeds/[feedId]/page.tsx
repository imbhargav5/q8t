"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { getFeedById, mockPosts } from "@/lib/mock-data";
import { ArrowLeft, Plus, RefreshCw, Edit3, MoreVertical } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/feeds/post-card";
import { StreamColumn } from "@/components/feeds/stream-column";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PostWithAuthor, StreamConfig } from "@/lib/zod-schemas";

interface FeedViewPageProps {
  params: Promise<{
    workspaceId: string;
    feedId: string;
  }>;
}

// Helper function to filter posts based on stream configuration
function getPostsForStream(
  stream: StreamConfig,
  workspaceId: string,
  allPosts: PostWithAuthor[]
): PostWithAuthor[] {
  let filtered = allPosts.filter((post) => post.workspace_id === workspaceId);

  // Filter by stream type
  switch (stream.stream_type) {
    case "home":
      // All posts
      break;
    case "mentions":
      // Posts with mentions (for simplicity, filter by posts that have mentions array)
      filtered = filtered.filter((post) => post.mentions && post.mentions.length > 0);
      break;
    case "scheduled":
      filtered = filtered.filter((post) => post.status === "scheduled");
      break;
    case "published":
      filtered = filtered.filter((post) => post.status === "published");
      break;
    case "drafts":
      filtered = filtered.filter((post) => post.status === "draft");
      break;
    case "failed":
      filtered = filtered.filter((post) => post.status === "failed");
      break;
    case "high_engagement":
      filtered = filtered.filter(
        (post) =>
          post.status === "published" &&
          post.engagement &&
          (post.engagement.likes + post.engagement.comments + post.engagement.shares) >=
            stream.filters.min_engagement
      );
      break;
    case "low_engagement":
      filtered = filtered.filter(
        (post) =>
          post.status === "published" &&
          post.engagement &&
          (post.engagement.likes + post.engagement.comments + post.engagement.shares) < 100
      );
      break;
    case "platform_specific":
      if (stream.platform_filters.length > 0) {
        filtered = filtered.filter((post) =>
          post.platforms.some((platform) => stream.platform_filters.includes(platform))
        );
      }
      break;
  }

  // Apply platform filters if specified
  if (stream.platform_filters.length > 0 && stream.stream_type !== "platform_specific") {
    filtered = filtered.filter((post) =>
      post.platforms.some((platform) => stream.platform_filters.includes(platform))
    );
  }

  // Apply time range filter
  const now = Date.now();
  const timeRanges: Record<string, number> = {
    "24h": 86400000,
    "7d": 604800000,
    "30d": 2592000000,
    all: Infinity,
  };
  const timeLimit = now - timeRanges[stream.time_range];

  filtered = filtered.filter((post) => {
    const postDate = post.published_at || post.scheduled_for || post.created_at;
    return postDate && new Date(postDate).getTime() >= timeLimit;
  });

  // Apply content type filters
  if (stream.filters.content_types.length > 0) {
    filtered = filtered.filter((post) => stream.filters.content_types.includes(post.type));
  }

  // Apply media filter
  if (stream.filters.show_media_only) {
    filtered = filtered.filter((post) => post.media && post.media.length > 0);
  }

  // Sort posts
  filtered.sort((a, b) => {
    if (stream.sort_order === "newest") {
      const dateA = new Date(a.published_at || a.scheduled_for || a.created_at).getTime();
      const dateB = new Date(b.published_at || b.scheduled_for || b.created_at).getTime();
      return dateB - dateA;
    } else if (stream.sort_order === "oldest") {
      const dateA = new Date(a.published_at || a.scheduled_for || a.created_at).getTime();
      const dateB = new Date(b.published_at || b.scheduled_for || b.created_at).getTime();
      return dateA - dateB;
    } else if (stream.sort_order === "most_engaged") {
      const engagementA = a.engagement
        ? a.engagement.likes + a.engagement.comments + a.engagement.shares
        : 0;
      const engagementB = b.engagement
        ? b.engagement.likes + b.engagement.comments + b.engagement.shares
        : 0;
      return engagementB - engagementA;
    }
    return 0;
  });

  return filtered;
}

export default function FeedViewPage({ params }: FeedViewPageProps) {
  const { workspaceId, feedId } = use(params);
  const feed = getFeedById(feedId);

  if (!feed) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Feed not found</h2>
          <p className="text-muted-foreground mb-4">
            The feed you're looking for doesn't exist.
          </p>
          <Link href={`/workspace/${workspaceId}/feeds`}>
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feeds
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Sort streams by order
  const sortedStreams = [...feed.streams].sort((a, b) => a.order - b.order);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={`/workspace/${workspaceId}/feeds`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xl">{feed.icon || "📊"}</span>
                <h1 className="text-xl font-semibold">{feed.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Stream
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh All
              </Button>
              <Button size="sm">
                <Edit3 className="h-4 w-4 mr-2" />
                Compose
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Rename Feed</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate Feed</DropdownMenuItem>
                  <DropdownMenuItem>Feed Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Delete Feed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Streams Container - Horizontal Scroll */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-4 p-4">
          {sortedStreams.map((stream) => {
            const posts = getPostsForStream(stream, workspaceId, mockPosts);
            return (
              <StreamColumn
                key={stream.id}
                stream={stream}
                posts={posts}
                workspaceId={workspaceId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
