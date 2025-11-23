"use client";

import * as React from "react";
import {
  Grid3x3,
  List,
  Upload,
  Search,
  Filter,
  FolderPlus,
  SortAsc,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import {
  mockMediaLibraryItems,
  mockMediaFolders,
  mockMediaTags,
} from "@/lib/mock-data/content-library";

export default function ContentLibraryPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = React.useState<string | null>(null);

  const filteredItems = currentFolder
    ? mockMediaLibraryItems.filter((item) => item.folder_id === currentFolder)
    : mockMediaLibraryItems;

  const currentFolderData = currentFolder
    ? mockMediaFolders.find((f) => f.id === currentFolder)
    : null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round(bytes / Math.pow(k, i) * 10) / 10} ${sizes[i]}`;
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Content Library</h1>
            <Breadcrumb className="mt-1">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    onClick={() => setCurrentFolder(null)}
                  >
                    All Media
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentFolderData && (
                  <>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage>{currentFolderData.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files..." className="pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">File Size</SelectItem>
              <SelectItem value="usage">Most Used</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedItems.length > 0 && (
            <Badge variant="secondary">
              {selectedItems.length} selected
            </Badge>
          )}
          <div className="flex items-center rounded-md border">
            <Toggle
              pressed={viewMode === "grid"}
              onPressedChange={() => setViewMode("grid")}
              className="h-8 w-8"
              aria-label="Grid view"
            >
              <Grid3x3 className="h-4 w-4" />
            </Toggle>
            <Separator orientation="vertical" className="h-8" />
            <Toggle
              pressed={viewMode === "list"}
              onPressedChange={() => setViewMode("list")}
              className="h-8 w-8"
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r p-4">
          <Tabs defaultValue="folders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="folders">Folders</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
            </TabsList>
            <TabsContent value="folders" className="mt-4 space-y-2">
              <Button
                variant={currentFolder === null ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setCurrentFolder(null)}
              >
                All Media
                <Badge variant="secondary" className="ml-auto">
                  {mockMediaLibraryItems.length}
                </Badge>
              </Button>
              {mockMediaFolders
                .filter((f) => f.parent_folder_id === null)
                .map((folder) => (
                  <Button
                    key={folder.id}
                    variant={currentFolder === folder.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setCurrentFolder(folder.id)}
                  >
                    <div
                      className="mr-2 h-3 w-3 rounded-sm"
                      style={{ backgroundColor: folder.color || "#94a3b8" }}
                    />
                    {folder.name}
                    <Badge variant="secondary" className="ml-auto">
                      {
                        mockMediaLibraryItems.filter(
                          (item) => item.folder_id === folder.id
                        ).length
                      }
                    </Badge>
                  </Button>
                ))}
            </TabsContent>
            <TabsContent value="tags" className="mt-4 space-y-2">
              {mockMediaTags.map((tag) => (
                <Button
                  key={tag.id}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Badge
                    variant="secondary"
                    style={{ backgroundColor: tag.color }}
                    className="mr-2"
                  >
                    {tag.name}
                  </Badge>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {
                      mockMediaLibraryItems.filter((item) =>
                        item.tags.includes(tag.id)
                      ).length
                    }
                  </span>
                </Button>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Grid/List View */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="absolute left-2 top-2 z-10">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                        className="bg-background/80 backdrop-blur-sm"
                      />
                    </div>
                    <AspectRatio ratio={16 / 9}>
                      {item.type === "video" ? (
                        <video
                          src={item.url}
                          className="h-full w-full object-cover"
                          muted
                          loop
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.alt_text || item.filename}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </AspectRatio>
                    <div className="p-3">
                      <p className="truncate text-sm font-medium">
                        {item.filename}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatFileSize(item.size_bytes)}</span>
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      {item.usage_count > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Used {item.usage_count} times
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:bg-muted/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                    />
                    <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.thumbnail_url || item.url}
                        alt={item.alt_text || item.filename}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.filename}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description || "No description"}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{item.type}</Badge>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatFileSize(item.size_bytes)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
