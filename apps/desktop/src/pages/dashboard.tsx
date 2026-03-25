import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  FileText,
  Zap,
} from "lucide-react"
import { Link } from "react-router"
import * as accountsApi from "@/lib/api/accounts"
import * as postsApi from "@/lib/api/posts"
import * as schedulerApi from "@/lib/api/scheduler"
import type { Account, Post, SchedulerStatus } from "@/lib/api/types"

export function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatus | null>(null)
  const [postCounts, setPostCounts] = useState({ draft: 0, scheduled: 0, published: 0, failed: 0 })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [accts, drafts, scheduled, published, failed, sched] = await Promise.all([
        accountsApi.listAccounts().catch(() => []),
        postsApi.listPosts({ status: "draft", limit: 5 }).catch(() => []),
        postsApi.listPosts({ status: "scheduled", limit: 5 }).catch(() => []),
        postsApi.listPosts({ status: "published", limit: 5 }).catch(() => []),
        postsApi.listPosts({ status: "failed", limit: 5 }).catch(() => []),
        schedulerApi.getSchedulerStatus().catch(() => null),
      ])
      setAccounts(accts)
      setRecentPosts([...published, ...scheduled, ...drafts].slice(0, 5))
      setPostCounts({
        draft: drafts.length,
        scheduled: scheduled.length,
        published: published.length,
        failed: failed.length,
      })
      setSchedulerStatus(sched)
    } catch {
      // Backend not available
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your q8t social media command center
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Link to="/integrations">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{postCounts.draft}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{postCounts.scheduled}</div>
              <p className="text-xs text-muted-foreground">Queued for publishing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{postCounts.published}</div>
              <p className="text-xs text-muted-foreground">Successfully posted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{postCounts.failed}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Connected Accounts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Your social media accounts</CardDescription>
                </div>
                <Link to="/integrations">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {accounts.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <p className="text-sm">No accounts connected yet.</p>
                  <Link to="/integrations">
                    <Button variant="link" className="mt-2">
                      Connect your first account
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm font-bold">
                          {account.platform === "x" ? "𝕏" : account.platform[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {account.platform_username
                              ? `@${account.platform_username}`
                              : account.label || account.platform}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {account.platform}
                          </p>
                        </div>
                      </div>
                      {account.verified_at ? (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                          Unverified
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scheduler & Recent Activity */}
          <div className="space-y-6">
            {/* Scheduler Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Scheduler
                </CardTitle>
              </CardHeader>
              <CardContent>
                {schedulerStatus ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        {schedulerStatus.running ? "Running" : "Paused"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {schedulerStatus.pending_jobs} job{schedulerStatus.pending_jobs !== 1 ? "s" : ""} in queue
                      </p>
                    </div>
                    <Badge variant={schedulerStatus.running ? "default" : "secondary"}>
                      {schedulerStatus.running ? "Active" : "Paused"}
                    </Badge>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Scheduler status unavailable
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/compose">
                    <Button variant="outline" className="w-full justify-start">
                      <Send className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </Link>
                  <Link to="/content-calendar">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Calendar
                    </Button>
                  </Link>
                  <Link to="/integrations">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Account
                    </Button>
                  </Link>
                  <Link to="/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Your latest social media posts</CardDescription>
              </div>
              <Link to="/content-calendar">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentPosts.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <p className="text-sm">No posts yet.</p>
                <Link to="/compose">
                  <Button variant="link" className="mt-2">
                    Create your first post
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{post.content || "(empty draft)"}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.created_at && new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        post.status === "published"
                          ? "default"
                          : post.status === "failed"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
