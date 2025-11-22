import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Calendar,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Globe,
  Shield,
  Sparkles,
  MessageSquare,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Multi-Platform Social Media Management
          </Badge>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Manage All Your Social Media
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}
              in One Place
            </span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Chatsian is your unified social media command center. Post, schedule, and manage
            content across 14+ platforms with a single, powerful interface.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to master your social media presence
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Zap className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Multi-Platform Publishing</CardTitle>
              <CardDescription>
                Post text, images, and videos across all your social accounts simultaneously with a
                unified interface.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Smart Scheduling</CardTitle>
              <CardDescription>
                Schedule posts in advance and optimize posting times for maximum engagement across
                different platforms.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>14+ Platforms Supported</CardTitle>
              <CardDescription>
                Connect all your social accounts including Instagram, Twitter, LinkedIn, Facebook,
                TikTok, YouTube, and more.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Unified Content Model</CardTitle>
              <CardDescription>
                Create content once and publish everywhere. Our smart system adapts your content
                for each platform automatically.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Media Library</CardTitle>
              <CardDescription>
                Organize and reuse your images and videos with our built-in media asset management
                system.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Enterprise-grade security with OAuth authentication and encrypted token storage for
                all your accounts.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Support for Every Content Type</h2>
          <p className="text-lg text-muted-foreground">
            Share your message in any format across all platforms
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2">
            <CardHeader>
              <MessageSquare className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Text Posts</CardTitle>
              <CardDescription>
                Share updates, announcements, and engage with your audience through compelling text
                content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Platform-specific character limits
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Hashtag and mention support
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Thread creation capabilities
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <Instagram className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Image Posts</CardTitle>
              <CardDescription>
                Share stunning visuals with your audience. Perfect for Instagram, Pinterest, and
                visual platforms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Multiple image support
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Alt text for accessibility
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Automatic format optimization
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <Youtube className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Video Posts</CardTitle>
              <CardDescription>
                Engage your audience with video content on TikTok, YouTube, Instagram Reels, and
                more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Platform-specific duration limits
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Thumbnail generation
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Format compatibility checks
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">14+ Platforms, One Dashboard</h2>
          <p className="text-lg text-muted-foreground">
            Connect and manage all your social media accounts
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {[
              { name: "WhatsApp", emoji: "💬" },
              { name: "Threads", emoji: "🧵" },
              { name: "X/Twitter", emoji: "𝕏" },
              { name: "Facebook", emoji: "📘" },
              { name: "Instagram", emoji: "📸" },
              { name: "LinkedIn", emoji: "💼" },
              { name: "Pinterest", emoji: "📌" },
              { name: "Reddit", emoji: "🤖" },
              { name: "Slack", emoji: "💬" },
              { name: "Discord", emoji: "🎮" },
              { name: "TikTok", emoji: "🎵" },
              { name: "YouTube", emoji: "▶️" },
              { name: "Bluesky", emoji: "☁️" },
              { name: "GMB", emoji: "🗺️" },
            ].map((platform) => (
              <div
                key={platform.name}
                className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{platform.emoji}</span>
                <span className="text-center text-xs font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Get started in three simple steps
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="relative text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="mb-2 text-xl font-semibold">Connect Your Accounts</h3>
            <p className="text-muted-foreground">
              Securely link all your social media accounts through OAuth authentication.
            </p>
          </div>

          <div className="relative text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              2
            </div>
            <h3 className="mb-2 text-xl font-semibold">Create Your Content</h3>
            <p className="text-muted-foreground">
              Write your post once and select which platforms to publish to. Add media, hashtags,
              and platform-specific options.
            </p>
          </div>

          <div className="relative text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              3
            </div>
            <h3 className="mb-2 text-xl font-semibold">Publish Everywhere</h3>
            <p className="text-muted-foreground">
              Hit publish to post immediately or schedule for later. Track publication status across
              all platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Built for Scale & Performance</h2>
          <p className="text-lg text-muted-foreground">
            Enterprise-grade architecture with powerful features
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Unified Content Model</h4>
                      <p className="text-sm text-muted-foreground">
                        Single source of truth for all your social media content with automatic
                        platform adaptation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Platform Capability Validation</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatic validation of content against platform-specific limits and
                        requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Real-time Status Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor publication status across all platforms with detailed error tracking
                        and retry mechanisms.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Advanced Media Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Reusable media library with metadata, thumbnails, and automatic format
                        optimization.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Platform-Specific Configuration</h4>
                      <p className="text-sm text-muted-foreground">
                        Fine-tune posts with platform-specific options like polls, location tags,
                        and user mentions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Row-Level Security</h4>
                      <p className="text-sm text-muted-foreground">
                        Enterprise security with user-scoped data access and encrypted OAuth token
                        storage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="py-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Ready to Simplify Your Social Media?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of creators and businesses managing their social presence with
              Chatsian.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-base">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Schedule a Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="mb-1 text-xl font-bold">Chatsian</h3>
              <p className="text-sm text-muted-foreground">
                Multi-Platform Social Media Management
              </p>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2025 Chatsian. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
