import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Sparkles,
  Upload,
  Brain,
  Image as ImageIcon,
  Clock,
  Link,
  Hash,
  MessageSquare,
  Bell,
  Radio,
  Users as UsersIcon,
  BarChart3,
  FileText,
  TrendingUp,
  UserPlus,
  Users2,
  GitBranch,
  Briefcase,
  Share2,
  Rss,
  Puzzle,
  Zap,
  Shield,
  Github,
  ArrowRight,
  CheckCircle2,
  Star,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container py-24 md:py-32">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
            <Badge variant="outline" className="gap-2">
              <Github className="size-4" />
              Open Source Social Media Platform
            </Badge>

            <h1 className="text-balance text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              Social Media Management,{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>

            <p className="max-w-3xl text-pretty text-lg text-muted-foreground md:text-xl">
              A modern, open-source platform with comprehensive features for content creation,
              publishing, and customer engagement. Manage all your social media from one powerful
              dashboard.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg">
                <Star />
                Star on GitHub
                <ArrowRight />
              </Button>
              <Button size="lg" variant="outline">
                <Code />
                View Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Free & Open Source
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Self-Hosted
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Modern Tech Stack
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="container py-24">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <Badge variant="secondary">Comprehensive Features</Badge>
          <h2 className="text-balance text-4xl font-bold md:text-5xl">
            Everything You Need to Succeed
          </h2>
          <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
            From content creation to analytics, team collaboration to customer engagement - all in
            one platform.
          </p>
        </div>

        <Tabs defaultValue="publishing" className="mx-auto max-w-6xl">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="publishing">Publishing</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Publishing Tab */}
          <TabsContent value="publishing" className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Share2 className="size-10 text-primary" />
                  <CardTitle>Multi-Platform Publishing</CardTitle>
                  <CardDescription>
                    Publish content to multiple social media platforms simultaneously with one
                    click.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Calendar className="size-10 text-primary" />
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>
                    Visual calendar for planning and scheduling posts across all platforms.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Upload className="size-10 text-primary" />
                  <CardTitle>Bulk Scheduling</CardTitle>
                  <CardDescription>
                    Schedule multiple posts at once with CSV import support for efficient workflow.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Brain className="size-10 text-primary" />
                  <CardTitle>AI Content Creator</CardTitle>
                  <CardDescription>
                    AI-powered content generation and optimization for maximum engagement.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <ImageIcon className="size-10 text-primary" />
                  <CardTitle>Media Library</CardTitle>
                  <CardDescription>
                    Centralized asset management for images, videos, and other media files.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="size-10 text-primary" />
                  <CardTitle>Post Timing Analytics</CardTitle>
                  <CardDescription>
                    Analyze and recommend optimal times to post content for best results.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Link className="size-10 text-primary" />
                  <CardTitle>URL Shortening</CardTitle>
                  <CardDescription>
                    Automatic link shortening with click tracking and analytics.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Hash className="size-10 text-primary" />
                  <CardTitle>Hashtag Suggestions</CardTitle>
                  <CardDescription>
                    AI-powered hashtag recommendations for better reach and discoverability.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <MessageSquare className="size-10 text-primary" />
                  <CardTitle>Social Inbox</CardTitle>
                  <CardDescription>
                    Unified inbox for managing messages across multiple social media platforms in
                    one place.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Centralized message management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Quick replies and templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Message filtering and sorting
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Bell className="size-10 text-primary" />
                  <CardTitle>Social Mention Tracking</CardTitle>
                  <CardDescription>
                    Monitor and track brand mentions across all social platforms in real-time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Real-time mention alerts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Sentiment analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Engagement tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Radio className="size-10 text-primary" />
                  <CardTitle>Social Listening</CardTitle>
                  <CardDescription>
                    Track keywords, hashtags, and brand conversations in real-time across
                    platforms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Keyword monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Trend detection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Competitive intelligence
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <UsersIcon className="size-10 text-primary" />
                  <CardTitle>Built-in CRM</CardTitle>
                  <CardDescription>
                    Customer relationship management designed specifically for social media support.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Customer profiles
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Interaction history
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Automated workflows
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <BarChart3 className="size-10 text-primary" />
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Comprehensive analytics for posts, engagement, and audience growth.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Real-time analytics dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Engagement rate tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Audience demographics
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="size-10 text-primary" />
                  <CardTitle>Custom Reports</CardTitle>
                  <CardDescription>
                    Create and schedule custom reports with key metrics that matter to you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Customizable templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Automated delivery
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Export to PDF/CSV
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="size-10 text-primary" />
                  <CardTitle>Competitor Analysis</CardTitle>
                  <CardDescription>
                    Track and compare competitor social media performance against yours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Benchmark analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Content strategy insights
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Market positioning
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <UserPlus className="size-10 text-primary" />
                  <CardTitle>Influencer Identification</CardTitle>
                  <CardDescription>
                    Discover and analyze potential influencer partnerships for your brand.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Influencer discovery
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Audience overlap analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Performance tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Users2 className="size-10 text-primary" />
                  <CardTitle>Team Collaboration</CardTitle>
                  <CardDescription>
                    Multi-user access with role-based permissions for seamless team workflow.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Role-based access control
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Activity logs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Team comments
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <GitBranch className="size-10 text-primary" />
                  <CardTitle>Approval Workflows</CardTitle>
                  <CardDescription>
                    Content approval process for team and client reviews before publishing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Multi-level approvals
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Review notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Version history
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Briefcase className="size-10 text-primary" />
                  <CardTitle>Workspaces</CardTitle>
                  <CardDescription>
                    Organize multiple brands and clients in separate workspaces.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Isolated environments
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Custom branding
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      Workspace switching
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Zap className="size-10 text-primary" />
                  <CardTitle>Platform Integrations</CardTitle>
                  <CardDescription>
                    Connect with major social networks including Facebook, Instagram, Twitter/X,
                    LinkedIn, TikTok, YouTube, Pinterest, and more.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Rss className="size-10 text-primary" />
                  <CardTitle>RSS Feed Integration</CardTitle>
                  <CardDescription>
                    Auto-publish content from RSS feeds to your social media channels automatically.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Puzzle className="size-10 text-primary" />
                  <CardTitle>Third-Party Apps</CardTitle>
                  <CardDescription>
                    Integration with popular tools and services to extend functionality.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Tech Stack Section */}
      <section className="border-y bg-secondary/30 py-24">
        <div className="container">
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <Badge variant="secondary">Modern Technology</Badge>
            <h2 className="text-balance text-4xl font-bold md:text-5xl">Built with Modern Tools</h2>
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
              Leveraging the latest and greatest web technologies for optimal performance and
              developer experience.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="size-5" />
                  Next.js
                </CardTitle>
                <CardDescription>React framework for production-ready applications</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="size-5" />
                  TypeScript
                </CardTitle>
                <CardDescription>Type-safe development for reliable code</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5" />
                  Tailwind CSS
                </CardTitle>
                <CardDescription>Utility-first CSS framework for rapid UI development</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="size-5" />
                  Shadcn UI
                </CardTitle>
                <CardDescription>Re-usable component library with accessibility</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="size-5" />
                  Zod
                </CardTitle>
                <CardDescription>Schema validation and type inference</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="size-5" />
                  Open Source
                </CardTitle>
                <CardDescription>Free and open for the community</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Design Preview Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="space-y-4">
            <Badge variant="secondary">Current Development</Badge>
            <h2 className="text-balance text-4xl font-bold md:text-5xl">
              Design & Preview Application
            </h2>
            <p className="text-pretty text-lg text-muted-foreground">
              This is currently a design and preview application focused on building out the user
              interface and experience before implementing backend functionality.
            </p>
          </div>

          <Card className="text-left">
            <CardHeader>
              <CardTitle>Mock Data Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <p className="font-medium">Hard-coded Mock Data</p>
                  <p className="text-sm text-muted-foreground">
                    All data is mock/fake data organized in a dedicated mock-data folder
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <p className="font-medium">Zod Schema Validation</p>
                  <p className="text-sm text-muted-foreground">
                    Zod schemas define structure and validation for all data models
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <p className="font-medium">TypeScript Type Safety</p>
                  <p className="text-sm text-muted-foreground">
                    TypeScript types are derived from Zod schemas for complete type safety
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <p className="font-medium">UI/UX Focus</p>
                  <p className="text-sm text-muted-foreground">
                    Complete UI/UX implementation before adding backend functionality
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="bg-accent">
          <CardContent className="py-16 text-center">
            <div className="mx-auto max-w-2xl space-y-8">
              <div className="space-y-4">
                <h2 className="text-balance text-4xl font-bold md:text-5xl">
                  Ready to Transform Your Social Media?
                </h2>
                <p className="text-pretty text-lg text-muted-foreground">
                  Join the open-source community building the future of social media management.
                  Free, self-hosted, and built with modern technologies.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg">
                  <Github />
                  View on GitHub
                  <ArrowRight />
                </Button>
                <Button size="lg" variant="outline">
                  <Star />
                  Star the Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/30 py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="flex items-center gap-2 text-xl font-bold">
                <Sparkles className="size-5 text-primary" />
                Social Media Platform
              </div>
              <p className="text-sm text-muted-foreground">
                Open Source • Modern • Self-Hosted
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                Documentation
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                GitHub
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Contributing
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                License
              </a>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Social Media Platform. Open source under MIT License.
          </div>
        </div>
      </footer>
    </div>
  );
}
