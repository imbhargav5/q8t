import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarGrid } from "@/components/content-calendar/calendar-grid";
import { ComposeSheet } from "@/components/compose/compose-sheet";
import { PostDetailDialog } from "@/components/content-calendar/post-detail-dialog";
import { RightSidebarContainer } from "@/components/layout/right-sidebar-container";
import { CalendarOverviewSidebar } from "@/components/content-calendar/sidebars/calendar-overview-sidebar";
import { PostDetailSidebar } from "@/components/content-calendar/sidebars/post-detail-sidebar";
import { mockPosts } from "@/lib/mock-data";
import * as postsApi from "@/lib/api/posts";
import type { Post } from "@/lib/api/types";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import {
  Plus,
  Calendar as CalendarIcon,
  List,
  Filter,
  Download,
} from "lucide-react";

/** Convert a backend Post to the PostWithAuthor shape the calendar components expect */
function adaptPost(post: Post): PostWithAuthor {
  return {
    id: post.id,
    workspace_id: "local",
    author_id: "local",
    content: post.content,
    content_type: post.content_type,
    status: post.status,
    scheduled_for: post.scheduled_for ?? undefined,
    published_at: post.published_at ?? undefined,
    platforms: ["x"],
    tags: post.tags ? JSON.parse(post.tags) : [],
    media: [],
    poll: null,
    link_preview: null,
    hashtags: post.hashtags ? JSON.parse(post.hashtags) : [],
    mentions: post.mentions ? JSON.parse(post.mentions) : [],
    first_comment: null,
    location: null,
    visibility: "public",
    approval_status: "approved",
    approved_by: null,
    approved_at: null,
    engagement: null,
    platform_post_ids: {},
    platform_errors: {},
    metadata: post.metadata ? JSON.parse(post.metadata) : {},
    author: {
      id: "local",
      full_name: "You",
      email: "",
      avatar_url: "",
      role: "owner",
    },
    created_at: post.created_at,
    updated_at: post.updated_at,
  } as unknown as PostWithAuthor;
}

export function ContentCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<PostWithAuthor | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerDate, setComposerDate] = useState<Date | undefined>();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [posts, setPosts] = useState<PostWithAuthor[]>(mockPosts);

  // Load real posts from backend, fall back to mock data
  useEffect(() => {
    postsApi
      .listPosts({ limit: 100 })
      .then((dbPosts) => {
        if (dbPosts.length > 0) {
          setPosts(dbPosts.map(adaptPost));
        }
      })
      .catch(() => {
        // Backend not available, keep mock data
      });
  }, [isComposerOpen]); // Refetch when composer closes

  const handleAddPost = (date: Date) => {
    setComposerDate(date);
    setIsComposerOpen(true);
  };

  const handlePostClick = (post: PostWithAuthor) => {
    setSelectedPost(post);
    setIsDetailDialogOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailDialogOpen(false);
    // Keep selectedPost for sidebar
  };

  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Content Calendar</h1>
              <p className="text-sm text-muted-foreground">
                Plan, schedule, and manage your social media posts
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => handleAddPost(new Date())}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>

          {/* View switcher */}
          <div className="mt-4">
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList>
                <TabsTrigger value="calendar">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Calendar View
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="h-4 w-4 mr-2" />
                  List View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {view === "calendar" ? (
            <CalendarGrid
              posts={posts}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onAddPost={handleAddPost}
              onPostClick={handlePostClick}
            />
          ) : (
            <div className="h-full overflow-auto p-4">
              <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-lg font-semibold">All Posts</h2>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handlePostClick(post)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {post.author.full_name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.scheduled_for &&
                            new Date(post.scheduled_for).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-2">
                        {post.platforms.slice(0, 3).map((platform) => (
                          <span
                            key={platform}
                            className="text-xs px-2 py-1 bg-secondary rounded"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebarContainer>
        {selectedPost ? (
          <PostDetailSidebar post={selectedPost} />
        ) : (
          <CalendarOverviewSidebar
            posts={mockPosts}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        )}
      </RightSidebarContainer>

      {/* Dialogs */}
      <ComposeSheet
        open={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        defaultDate={composerDate}
      />

      <PostDetailDialog
        post={selectedPost}
        open={isDetailDialogOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
