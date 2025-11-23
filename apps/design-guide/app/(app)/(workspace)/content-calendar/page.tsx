"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarGrid } from "@/components/content-calendar/calendar-grid";
import { ComposeSheet } from "@/components/compose/compose-sheet";
import { PostDetailDialog } from "@/components/content-calendar/post-detail-dialog";
import { RightSidebarContainer } from "@/components/layout/right-sidebar-container";
import { CalendarOverviewSidebar } from "@/components/content-calendar/sidebars/calendar-overview-sidebar";
import { PostDetailSidebar } from "@/components/content-calendar/sidebars/post-detail-sidebar";
import { mockPosts } from "@/lib/mock-data";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import {
  Plus,
  Calendar as CalendarIcon,
  List,
  Filter,
  Download,
} from "lucide-react";

export default function ContentCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<PostWithAuthor | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerDate, setComposerDate] = useState<Date | undefined>();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [view, setView] = useState<"calendar" | "list">("calendar");

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
              posts={mockPosts}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onAddPost={handleAddPost}
              onPostClick={handlePostClick}
            />
          ) : (
            <div className="h-full overflow-auto p-4">
              <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-lg font-semibold">All Posts</h2>
                {mockPosts.map((post) => (
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
