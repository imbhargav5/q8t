import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PostCard } from "./post-card";
import type { StreamConfig, PostWithAuthor } from "@/lib/zod-schemas";
import {
  MoreVertical,
  RefreshCw,
  Settings2,
  Home,
  AtSign,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Grid3x3,
  Hash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StreamColumnProps {
  stream: StreamConfig;
  posts: PostWithAuthor[];
  workspaceId: string;
}

const streamIcons: Record<string, React.ElementType> = {
  home: Home,
  mentions: AtSign,
  scheduled: Clock,
  published: CheckCircle2,
  drafts: FileText,
  failed: AlertCircle,
  high_engagement: TrendingUp,
  low_engagement: TrendingDown,
  platform_specific: Grid3x3,
  hashtag_search: Hash,
};

const streamLabels: Record<string, string> = {
  home: "Home Timeline",
  mentions: "Mentions",
  scheduled: "Scheduled",
  published: "Published",
  drafts: "Drafts",
  failed: "Failed",
  high_engagement: "High Engagement",
  low_engagement: "Low Engagement",
  platform_specific: "Platform Feed",
  hashtag_search: "Hashtag Search",
};

export function StreamColumn({ stream, posts, workspaceId }: StreamColumnProps) {
  const StreamIcon = streamIcons[stream.stream_type];
  const streamLabel = stream.label || streamLabels[stream.stream_type];

  return (
    <div className="flex flex-col w-[380px] flex-shrink-0 h-full border-r last:border-r-0 bg-muted/20">
      {/* Column Header */}
      <div className="flex-shrink-0 border-b bg-background p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            {StreamIcon && <StreamIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />}
            <h3 className="font-semibold text-sm truncate">{streamLabel}</h3>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <RefreshCw className="h-3 w-3" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings2 className="h-4 w-4 mr-2" />
                  Stream Settings
                </DropdownMenuItem>
                <DropdownMenuItem>Refresh</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Move Left</DropdownMenuItem>
                <DropdownMenuItem>Move Right</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Remove Stream
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filters/Info */}
        <div className="flex flex-wrap gap-1">
          {stream.platform_filters.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {stream.platform_filters.join(", ")}
            </Badge>
          )}
          {stream.time_range !== "all" && (
            <Badge variant="outline" className="text-xs">
              {stream.time_range}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {posts.length} posts
          </Badge>
        </div>
      </div>

      {/* Column Content - Scrollable */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No posts found</p>
              <p className="text-xs mt-1">
                Adjust your filters or check back later
              </p>
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
