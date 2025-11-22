"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWorkspace, mockSubscription, mockTeamMembers } from "@/lib/mock-data";
import { Settings, Users, CreditCard, TrendingUp, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface WorkspaceHomeProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function WorkspaceHome({ params }: WorkspaceHomeProps) {
  const { workspaceId } = await params;
  const workspace = mockWorkspace;
  const subscription = mockSubscription;
  const teamMembers = mockTeamMembers;
  const seatsUsagePercent = (subscription.used_seats / subscription.seats) * 100;

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="border-b bg-background">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">{workspace.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Workspace overview and quick actions
                </p>
              </div>
              <Link href={`/workspace/${workspaceId}/settings`}>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teamMembers.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {subscription.used_seats} / {subscription.seats} seats used
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{subscription.plan}</div>
                  <p className="text-xs text-muted-foreground">
                    ${subscription.total_price}/{subscription.billing_period === "monthly" ? "mo" : "yr"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{subscription.status}</div>
                  <p className="text-xs text-muted-foreground">
                    Billing is up to date
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Seat Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Seat Usage</CardTitle>
                <CardDescription>
                  Track your team seat utilization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Seats Used</span>
                    <span className="font-medium">
                      {subscription.used_seats} / {subscription.seats}
                    </span>
                  </div>
                  <Progress value={seatsUsagePercent} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {subscription.seats - subscription.used_seats} seats available
                  </p>
                  <Link href={`/workspace/${workspaceId}/settings?tab=plan`}>
                    <Button variant="outline" size="sm">
                      Upgrade Plan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Active members in your workspace
                    </CardDescription>
                  </div>
                  <Link href={`/workspace/${workspaceId}/settings?tab=members`}>
                    <Button variant="outline" size="sm">
                      Manage Team
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teamMembers.slice(0, 5).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar_url || undefined} />
                          <AvatarFallback>
                            {member.full_name
                              ? member.full_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                              : member.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.full_name || member.email}</div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common workspace management tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href={`/workspace/${workspaceId}/settings?tab=members`}>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Invite Team Members
                    </Button>
                  </Link>
                  <Link href={`/workspace/${workspaceId}/settings?tab=general`}>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Workspace Settings
                    </Button>
                  </Link>
                  <Link href={`/workspace/${workspaceId}/settings?tab=plan`}>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </Link>
                  <Link href="/social-inbox">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Conversations
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
