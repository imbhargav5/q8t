"use client";

import * as React from "react";
import {
  FileText,
  Search,
  Plus,
  Copy,
  Edit,
  Trash2,
  Sparkles,
  Grid3x3,
  List,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { mockTemplates, getTemplatesByCategory, getPublicTemplates } from "@/lib/mock-data/templates";
import type { ContentTemplate } from "@/lib/zod-schemas/template.schema";

const categoryLabels: Record<ContentTemplate["category"], string> = {
  promotional: "Promotional",
  educational: "Educational",
  engagement: "Engagement",
  seasonal: "Seasonal",
  announcement: "Announcement",
  question: "Question",
  quote: "Quote",
  behind_the_scenes: "Behind the Scenes",
  user_generated: "User Generated",
  other: "Other",
};

const categoryColors: Record<ContentTemplate["category"], string> = {
  promotional: "bg-blue-500",
  educational: "bg-green-500",
  engagement: "bg-purple-500",
  seasonal: "bg-orange-500",
  announcement: "bg-red-500",
  question: "bg-yellow-500",
  quote: "bg-pink-500",
  behind_the_scenes: "bg-indigo-500",
  user_generated: "bg-cyan-500",
  other: "bg-gray-500",
};

export default function TemplatesPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedTemplate, setSelectedTemplate] = React.useState<ContentTemplate | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("my-templates");

  const filterTemplates = (tab: string) => {
    let filtered = mockTemplates;

    if (tab === "public") {
      filtered = getPublicTemplates();
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query) ||
          t.content.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredTemplates = filterTemplates(activeTab);

  const getCategoryTemplates = (category: ContentTemplate["category"]) => {
    return filteredTemplates.filter((t) => t.category === category);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Templates</h1>
            <p className="text-sm text-muted-foreground">
              Save time with reusable content templates
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Generate
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Used</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="most-used">Most Used</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{filteredTemplates.length} templates</Badge>
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

      {/* Tabs & Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-6">
          <TabsList className="h-auto rounded-none border-0 bg-transparent p-0">
            <TabsTrigger
              value="my-templates"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              My Templates
              <Badge variant="secondary" className="ml-2">
                {mockTemplates.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="public"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Public Library
              <Badge variant="secondary" className="ml-2">
                {getPublicTemplates().length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              By Category
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            <TabsContent value="my-templates" className="m-0">
              {filteredTemplates.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FileText />
                    </EmptyMedia>
                    <EmptyTitle>No templates found</EmptyTitle>
                    <EmptyDescription>Create your first template to get started</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="group cursor-pointer transition-shadow hover:shadow-md"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <CardHeader className="p-0">
                        {template.thumbnail_url ? (
                          <AspectRatio ratio={16 / 9}>
                            <img
                              src={template.thumbnail_url}
                              alt={template.name}
                              className="h-full w-full rounded-t-lg object-cover"
                            />
                          </AspectRatio>
                        ) : (
                          <div className="flex h-32 items-center justify-center rounded-t-lg bg-muted">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium line-clamp-1">{template.name}</h3>
                          <div
                            className={`h-2 w-2 rounded-full ${categoryColors[template.category]}`}
                            title={categoryLabels[template.category]}
                          />
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {template.description || "No description"}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {categoryLabels[template.category]}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Used {template.usage_count}x
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Copy className="mr-2 h-3 w-3" />
                          Use
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          {template.thumbnail_url ? (
                            <img
                              src={template.thumbnail_url}
                              alt={template.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{template.name}</h3>
                            <Badge variant="secondary">{categoryLabels[template.category]}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {template.description}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Used {template.usage_count} times</span>
                            {template.last_used_at && (
                              <>
                                <span>•</span>
                                <span>
                                  Last used{" "}
                                  {formatDistanceToNow(new Date(template.last_used_at), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Copy className="mr-2 h-4 w-4" />
                            Use
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="public" className="m-0">
              {/* Same layout as my-templates but filtered */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="group transition-shadow hover:shadow-md">
                    <CardHeader className="p-0">
                      {template.thumbnail_url ? (
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={template.thumbnail_url}
                            alt={template.name}
                            className="h-full w-full rounded-t-lg object-cover"
                          />
                        </AspectRatio>
                      ) : (
                        <div className="flex h-32 items-center justify-center rounded-t-lg bg-muted">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {categoryLabels[template.category]}
                      </Badge>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button size="sm" className="w-full">
                        <Copy className="mr-2 h-3 w-3" />
                        Copy to My Templates
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="m-0 space-y-8">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const category = key as ContentTemplate["category"];
                const categoryTemplates = getCategoryTemplates(category);

                if (categoryTemplates.length === 0) return null;

                return (
                  <div key={category}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${categoryColors[category]}`} />
                      <h3 className="text-lg font-semibold">{label}</h3>
                      <Badge variant="secondary">{categoryTemplates.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {categoryTemplates.map((template) => (
                        <Card
                          key={template.id}
                          className="cursor-pointer transition-shadow hover:shadow-md"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <CardContent className="p-4">
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {template.description}
                            </p>
                            <div className="mt-3">
                              <Button variant="outline" size="sm" className="w-full">
                                <Copy className="mr-2 h-3 w-3" />
                                Use Template
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>

      {/* Template Preview Sheet */}
      {selectedTemplate && (
        <Sheet open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>{selectedTemplate.name}</SheetTitle>
              <SheetDescription>{selectedTemplate.description}</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium">Preview</h4>
                <div className="rounded-lg border bg-muted p-4">
                  <p className="whitespace-pre-wrap text-sm">{selectedTemplate.content}</p>
                </div>
              </div>
              {selectedTemplate.variables.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium">Variables</h4>
                  <div className="space-y-2">
                    {selectedTemplate.variables.map((variable) => (
                      <div key={variable.name} className="flex items-center gap-2">
                        <Badge variant="outline">{`{{${variable.name}}}`}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {variable.placeholder}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedTemplate.hashtags.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium">Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.hashtags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
