import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Camera, Save } from "lucide-react";
import { mockUsers, mockGeneralSettings, mockNotificationPreferences } from "@/lib/mock-data";
import type { GeneralSettings, NotificationPreferences } from "@/lib/zod-schemas";

export function UserSettingsPage() {
  const currentUser = mockUsers[0];
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(mockGeneralSettings);
  const [notificationSettings, setNotificationSettings] = useState<NotificationPreferences>(mockNotificationPreferences);

  const handleSaveGeneral = () => {
    console.log("Saving general settings:", generalSettings);
    // In a real app, this would make an API call
  };

  const handleSaveNotifications = () => {
    console.log("Saving notification settings:", notificationSettings);
    // In a real app, this would make an API call
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">User Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your profile, preferences, and notifications
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-6 space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentUser.avatar_url || undefined} />
                  <AvatarFallback>{currentUser.full_name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Profile Fields */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" defaultValue={currentUser.full_name || ""} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={currentUser.email} />
                </div>
              </div>

              <Button onClick={handleSaveGeneral}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {/* Theme */}
                <div className="grid gap-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={generalSettings.theme}
                    onValueChange={(value: any) =>
                      setGeneralSettings({ ...generalSettings, theme: value })
                    }
                  >
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value: any) =>
                      setGeneralSettings({ ...generalSettings, language: value })
                    }
                  >
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timezone */}
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value: any) =>
                      setGeneralSettings({ ...generalSettings, timezone: value })
                    }
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      <SelectItem value="Asia/Singapore">Singapore</SelectItem>
                      <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Format */}
                <div className="grid gap-2">
                  <Label htmlFor="date_format">Date Format</Label>
                  <Select
                    value={generalSettings.date_format}
                    onValueChange={(value: any) =>
                      setGeneralSettings({ ...generalSettings, date_format: value })
                    }
                  >
                    <SelectTrigger id="date_format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Format */}
                <div className="grid gap-2">
                  <Label htmlFor="time_format">Time Format</Label>
                  <Select
                    value={generalSettings.time_format}
                    onValueChange={(value: any) =>
                      setGeneralSettings({ ...generalSettings, time_format: value })
                    }
                  >
                    <SelectTrigger id="time_format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveGeneral}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Channels */}
              <div>
                <h4 className="text-sm font-medium mb-4">Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_enabled">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email_enabled"
                      checked={notificationSettings.email_enabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, email_enabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push_enabled">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                    </div>
                    <Switch
                      id="push_enabled"
                      checked={notificationSettings.push_enabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, push_enabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in_app_enabled">In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show notifications within the app</p>
                    </div>
                    <Switch
                      id="in_app_enabled"
                      checked={notificationSettings.in_app_enabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, in_app_enabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms_enabled">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                    </div>
                    <Switch
                      id="sms_enabled"
                      checked={notificationSettings.sms_enabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, sms_enabled: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notification Events */}
              <div>
                <h4 className="text-sm font-medium mb-4">Notification Events</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new_message">New Messages</Label>
                    <Switch
                      id="new_message"
                      checked={notificationSettings.new_message}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, new_message: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="new_mention">Mentions</Label>
                    <Switch
                      id="new_mention"
                      checked={notificationSettings.new_mention}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, new_mention: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="new_comment">Comments</Label>
                    <Switch
                      id="new_comment"
                      checked={notificationSettings.new_comment}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, new_comment: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="post_published">Post Published</Label>
                    <Switch
                      id="post_published"
                      checked={notificationSettings.post_published}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, post_published: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="post_scheduled">Post Scheduled</Label>
                    <Switch
                      id="post_scheduled"
                      checked={notificationSettings.post_scheduled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, post_scheduled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="team_invitation">Team Invitations</Label>
                    <Switch
                      id="team_invitation"
                      checked={notificationSettings.team_invitation}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, team_invitation: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="workspace_updates">Workspace Updates</Label>
                    <Switch
                      id="workspace_updates"
                      checked={notificationSettings.workspace_updates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, workspace_updates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="security_alerts">Security Alerts</Label>
                    <Switch
                      id="security_alerts"
                      checked={notificationSettings.security_alerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, security_alerts: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing_emails">Marketing Emails</Label>
                    <Switch
                      id="marketing_emails"
                      checked={notificationSettings.marketing_emails}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, marketing_emails: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Digests */}
              <div>
                <h4 className="text-sm font-medium mb-4">Digest Emails</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily_digest">Daily Digest</Label>
                      <p className="text-sm text-muted-foreground">Summary of your daily activity</p>
                    </div>
                    <Switch
                      id="daily_digest"
                      checked={notificationSettings.daily_digest}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, daily_digest: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly_digest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Summary of your weekly activity</p>
                    </div>
                    <Switch
                      id="weekly_digest"
                      checked={notificationSettings.weekly_digest}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, weekly_digest: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
