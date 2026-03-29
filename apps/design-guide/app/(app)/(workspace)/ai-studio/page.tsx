"use client";

import * as React from "react";
import { Sparkles, Copy, Heart, BarChart3, RefreshCw, Wand2, Languages, Target, Hash, Smile } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { mockAIContentHistory, getBestPerformingVariant } from "@/lib/mock-data/ai-content";
import type { AIContentHistory } from "@/lib/zod-schemas/ai-content.schema";

export default function AIStudioPage() {
  const [prompt, setPrompt] = React.useState("");
  const [tone, setTone] = React.useState("professional");
  const [contentType, setContentType] = React.useState("post");
  const [variantCount, setVariantCount] = React.useState("3");
  const [includeHashtags, setIncludeHashtags] = React.useState(true);
  const [includeEmojis, setIncludeEmojis] = React.useState(true);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [selectedHistory, setSelectedHistory] = React.useState<AIContentHistory | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedHistory(mockAIContentHistory[0]);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getSentimentLabel = (score: number | null) => {
    if (score === null) return "N/A";
    if (score > 0.5) return "Very Positive";
    if (score > 0.2) return "Positive";
    if (score > -0.2) return "Neutral";
    if (score > -0.5) return "Negative";
    return "Very Negative";
  };

  const getSentimentColor = (score: number | null) => {
    if (score === null) return "bg-muted";
    if (score > 0.5) return "bg-green-500";
    if (score > 0.2) return "bg-green-400";
    if (score > -0.2) return "bg-yellow-400";
    if (score > -0.5) return "bg-orange-400";
    return "bg-red-400";
  };

  return (
    <div className="flex h-full gap-6 p-6">
      {/* Left Panel - Generator */}
      <div className="w-1/2 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-3xl font-bold">AI Studio</h1>
          </div>
          <p className="text-muted-foreground">
            Generate engaging content with AI in multiple tones and variations
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Content Generator
            </CardTitle>
            <CardDescription>
              Describe what you want to create and let AI do the rest
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt">
                What would you like to create? *
              </Label>
              <Textarea
                id="prompt"
                placeholder="E.g., Create a post about our new product launch for eco-friendly water bottles"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Be specific about your topic, target audience, and key messages
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="content-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Social Post</SelectItem>
                    <SelectItem value="caption">Caption</SelectItem>
                    <SelectItem value="tweet">Tweet</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="ad_copy">Ad Copy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="variants">Number of Variations</Label>
              <Select value={variantCount} onValueChange={setVariantCount}>
                <SelectTrigger id="variants">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 variation</SelectItem>
                  <SelectItem value="2">2 variations</SelectItem>
                  <SelectItem value="3">3 variations</SelectItem>
                  <SelectItem value="4">4 variations</SelectItem>
                  <SelectItem value="5">5 variations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-base font-semibold">Options</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hashtags"
                  checked={includeHashtags}
                  onCheckedChange={(checked) => setIncludeHashtags(checked as boolean)}
                />
                <Label htmlFor="hashtags" className="flex items-center gap-2 font-normal">
                  <Hash className="h-4 w-4" />
                  Include hashtags
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emojis"
                  checked={includeEmojis}
                  onCheckedChange={(checked) => setIncludeEmojis(checked as boolean)}
                />
                <Label htmlFor="emojis" className="flex items-center gap-2 font-normal">
                  <Smile className="h-4 w-4" />
                  Include emojis
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Additional Context (Optional)</Label>
              <Textarea
                id="context"
                placeholder="Target audience, brand voice guidelines, key points to include..."
                rows={3}
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Results & History */}
      <div className="flex-1 space-y-6">
        <Tabs defaultValue="results" className="space-y-4">
          <TabsList>
            <TabsTrigger value="results">
              Generated Results
            </TabsTrigger>
            <TabsTrigger value="history">
              History
              <Badge variant="secondary" className="ml-2">
                {mockAIContentHistory.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            {selectedHistory ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Your Prompt
                    </CardTitle>
                    <p className="text-sm">{selectedHistory.prompt}</p>
                  </CardHeader>
                </Card>

                {selectedHistory.variants.map((variant, index) => {
                  const bestVariant = getBestPerformingVariant(selectedHistory);
                  const isBest = variant.id === bestVariant.id;

                  return (
                    <Card key={variant.id} className={isBest ? "border-primary" : ""}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle>Variation {variant.variant_number}</CardTitle>
                            {isBest && (
                              <Badge variant="default" className="bg-primary">
                                <Sparkles className="mr-1 h-3 w-3" />
                                Best Performer
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(variant.content)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-lg bg-muted p-4">
                          <p className="whitespace-pre-wrap">{variant.content}</p>
                        </div>

                        {variant.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {variant.hashtags.map((hashtag) => (
                              <Badge key={hashtag} variant="secondary">
                                {hashtag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Words:</span>{" "}
                            <span className="font-medium">{variant.word_count}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Characters:</span>{" "}
                            <span className="font-medium">{variant.character_count}</span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Engagement Prediction</span>
                              <span className="font-medium">{variant.engagement_prediction}%</span>
                            </div>
                            <Progress value={variant.engagement_prediction || 0} />
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Readability Score</span>
                            <span className="font-medium">{variant.readability_score}/10</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Sentiment</span>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getSentimentColor(variant.sentiment_score)}`} />
                              <span className="font-medium">{getSentimentLabel(variant.sentiment_score)}</span>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full">
                          Use This Content
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Sparkles className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">No results yet</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Enter a prompt and click "Generate Content" to see AI-generated variations
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-4">
                {mockAIContentHistory.map((item) => {
                  const bestVariant = getBestPerformingVariant(item);

                  return (
                    <Card
                      key={item.id}
                      className="cursor-pointer transition-colors hover:bg-muted/50"
                      onClick={() => setSelectedHistory(item)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-base">{item.prompt}</CardTitle>
                              {item.is_favorite && (
                                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {item.tone}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.variants.length} variants
                              </Badge>
                              {item.used_in_post_id && (
                                <Badge variant="secondary" className="text-xs">
                                  Used
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                          {bestVariant.content}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatDate(item.created_at)}</span>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-3 w-3" />
                            <span>{bestVariant.engagement_prediction}% predicted engagement</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
