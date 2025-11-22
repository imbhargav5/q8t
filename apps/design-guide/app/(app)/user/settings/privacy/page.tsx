"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Save, Download, Trash2, Unplug, ExternalLink } from "lucide-react";
import { mockPrivacySettings, mockConnectedApps } from "@/lib/mock-data";
import type { PrivacySettings, ConnectedApp } from "@/lib/zod-schemas";

export default function PrivacySettingsPage() {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(mockPrivacySettings);
  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>(mockConnectedApps);

  const handleSavePrivacy = () => {
    console.log("Saving privacy settings:", privacySettings);
    // In a real app, this would make an API call
  };

  const handleDisconnectApp = (appId: string) => {
    setConnectedApps(connectedApps.filter((app) => app.id !== appId));
    console.log("Disconnecting app:", appId);
    // In a real app, this would make an API call
  };

  const handleExportData = () => {
    console.log("Exporting user data");
    // In a real app, this would trigger a data export
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account");
    // In a real app, this would trigger account deletion
  };

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {/* Profile Visibility */}
            <div className="grid gap-2">
              <Label htmlFor="profile_visible_to">Profile Visible To</Label>
              <Select
                value={privacySettings.profile_visible_to}
                onValueChange={(value: any) =>
                  setPrivacySettings({ ...privacySettings, profile_visible_to: value })
                }
              >
                <SelectTrigger id="profile_visible_to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Only Me</SelectItem>
                  <SelectItem value="team">My Team</SelectItem>
                  <SelectItem value="workspace">My Workspace</SelectItem>
                  <SelectItem value="everyone">Everyone</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose who can view your full profile
              </p>
            </div>

            {/* Email Visibility */}
            <div className="grid gap-2">
              <Label htmlFor="email_visible_to">Email Visible To</Label>
              <Select
                value={privacySettings.email_visible_to}
                onValueChange={(value: any) =>
                  setPrivacySettings({ ...privacySettings, email_visible_to: value })
                }
              >
                <SelectTrigger id="email_visible_to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Only Me</SelectItem>
                  <SelectItem value="team">My Team</SelectItem>
                  <SelectItem value="workspace">My Workspace</SelectItem>
                  <SelectItem value="everyone">Everyone</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose who can see your email address
              </p>
            </div>

            {/* Activity Visibility */}
            <div className="grid gap-2">
              <Label htmlFor="activity_visible_to">Activity Visible To</Label>
              <Select
                value={privacySettings.activity_visible_to}
                onValueChange={(value: any) =>
                  setPrivacySettings({ ...privacySettings, activity_visible_to: value })
                }
              >
                <SelectTrigger id="activity_visible_to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Only Me</SelectItem>
                  <SelectItem value="team">My Team</SelectItem>
                  <SelectItem value="workspace">My Workspace</SelectItem>
                  <SelectItem value="everyone">Everyone</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose who can see your recent activity
              </p>
            </div>
          </div>

          <Button onClick={handleSavePrivacy}>
            <Save className="h-4 w-4 mr-2" />
            Save Visibility Settings
          </Button>
        </CardContent>
      </Card>

      {/* Communication Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Communication</CardTitle>
          <CardDescription>Control how others can communicate with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow_direct_messages">Direct Messages</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to send you direct messages
              </p>
            </div>
            <Switch
              id="allow_direct_messages"
              checked={privacySettings.allow_direct_messages}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, allow_direct_messages: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show_online_status">Online Status</Label>
              <p className="text-sm text-muted-foreground">
                Show when you're online or active
              </p>
            </div>
            <Switch
              id="show_online_status"
              checked={privacySettings.show_online_status}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, show_online_status: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show_typing_indicator">Typing Indicator</Label>
              <p className="text-sm text-muted-foreground">
                Show when you're typing a message
              </p>
            </div>
            <Switch
              id="show_typing_indicator"
              checked={privacySettings.show_typing_indicator}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, show_typing_indicator: checked })
              }
            />
          </div>

          <Button onClick={handleSavePrivacy}>
            <Save className="h-4 w-4 mr-2" />
            Save Communication Settings
          </Button>
        </CardContent>
      </Card>

      {/* Data Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Analytics</CardTitle>
          <CardDescription>Control how your data is used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow_analytics">Usage Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help improve the product by sharing usage data
              </p>
            </div>
            <Switch
              id="allow_analytics"
              checked={privacySettings.allow_analytics}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, allow_analytics: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow_personalization">Personalization</Label>
              <p className="text-sm text-muted-foreground">
                Use your data to personalize your experience
              </p>
            </div>
            <Switch
              id="allow_personalization"
              checked={privacySettings.allow_personalization}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, allow_personalization: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="share_crash_reports">Crash Reports</Label>
              <p className="text-sm text-muted-foreground">
                Automatically send crash reports to help fix bugs
              </p>
            </div>
            <Switch
              id="share_crash_reports"
              checked={privacySettings.share_crash_reports}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, share_crash_reports: checked })
              }
            />
          </div>

          <Button onClick={handleSavePrivacy}>
            <Save className="h-4 w-4 mr-2" />
            Save Data Settings
          </Button>
        </CardContent>
      </Card>

      {/* Connected Apps */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Apps</CardTitle>
          <CardDescription>
            Manage third-party apps that have access to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-0.5">
              <Label htmlFor="allow_third_party_integrations">Third-Party Integrations</Label>
              <p className="text-sm text-muted-foreground">
                Allow third-party apps to connect to your account
              </p>
            </div>
            <Switch
              id="allow_third_party_integrations"
              checked={privacySettings.allow_third_party_integrations}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, allow_third_party_integrations: checked })
              }
            />
          </div>

          <Separator />

          <div className="space-y-4">
            {connectedApps.map((app) => (
              <div key={app.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={app.app_icon || undefined} />
                    <AvatarFallback>{app.app_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{app.app_name}</h4>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {app.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Connected on{" "}
                      {new Date(app.connected_at).toLocaleDateString()}
                      {app.last_used_at && (
                        <>
                          {" • "}Last used{" "}
                          {new Date(app.last_used_at).toLocaleDateString()}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Unplug className="h-4 w-4 mr-2" />
                      Disconnect
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Disconnect {app.app_name}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This app will no longer have access to your account. You can reconnect it
                        at any time.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDisconnectApp(app.id)}>
                        Disconnect
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Download or delete your account data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Download a copy of all your account data
              </p>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium text-destructive">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, Delete My Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
