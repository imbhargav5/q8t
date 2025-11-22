"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lock,
  Shield,
  Smartphone,
  Key,
  History,
  AlertTriangle,
  Copy,
  Trash2,
  CheckCircle,
  XCircle,
  Monitor,
  Tablet,
  Plus,
} from "lucide-react";
import {
  mockTwoFactorAuth,
  mockLoginSessions,
  mockLoginHistory,
  mockAPIKeys,
  mockSecurityAuditLog,
} from "@/lib/mock-data";
import type {
  TwoFactorAuth,
  LoginSession,
  LoginHistory as LoginHistoryType,
  APIKey,
  SecurityAuditLog,
} from "@/lib/zod-schemas";

export default function SecuritySettingsPage() {
  const [twoFactorAuth, setTwoFactorAuth] = useState<TwoFactorAuth>(mockTwoFactorAuth);
  const [loginSessions, setLoginSessions] = useState<LoginSession[]>(mockLoginSessions);
  const [loginHistory] = useState<LoginHistoryType[]>(mockLoginHistory);
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys);
  const [auditLog] = useState<SecurityAuditLog[]>(mockSecurityAuditLog);
  const [show2FASetup, setShow2FASetup] = useState(false);

  const handleChangePassword = () => {
    console.log("Changing password");
    // In a real app, this would make an API call
  };

  const handleToggle2FA = (enabled: boolean) => {
    if (enabled) {
      setShow2FASetup(true);
    } else {
      setTwoFactorAuth({ ...twoFactorAuth, enabled: false, method: null });
      console.log("Disabling 2FA");
    }
  };

  const handleSetup2FA = (method: "authenticator" | "sms" | "email") => {
    setTwoFactorAuth({
      ...twoFactorAuth,
      enabled: true,
      method,
      verified_at: new Date().toISOString(),
      backup_codes_count: 10,
    });
    setShow2FASetup(false);
    console.log("Setting up 2FA with method:", method);
  };

  const handleRevokeSession = (sessionId: string) => {
    setLoginSessions(loginSessions.filter((session) => session.id !== sessionId));
    console.log("Revoking session:", sessionId);
  };

  const handleDeleteAPIKey = (keyId: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== keyId));
    console.log("Deleting API key:", keyId);
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password
          </CardTitle>
          <CardDescription>Change your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current_password">Current Password</Label>
              <Input id="current_password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input id="new_password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <Input id="confirm_password" type="password" />
            </div>
          </div>
          <Button onClick={handleChangePassword}>
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="2fa_enabled">Enable 2FA</Label>
                {twoFactorAuth.enabled && (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Require a verification code when signing in
              </p>
            </div>
            <Switch
              id="2fa_enabled"
              checked={twoFactorAuth.enabled}
              onCheckedChange={handleToggle2FA}
            />
          </div>

          {twoFactorAuth.enabled && (
            <>
              <Separator />
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Authentication Method</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {twoFactorAuth.method === "authenticator" && "Authenticator App (Recommended)"}
                    {twoFactorAuth.method === "sms" && "SMS Text Message"}
                    {twoFactorAuth.method === "email" && "Email"}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Backup Codes</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {twoFactorAuth.backup_codes_count} unused backup codes remaining
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Key className="h-4 w-4 mr-2" />
                    View Backup Codes
                  </Button>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Change 2FA Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change 2FA Method</DialogTitle>
                      <DialogDescription>
                        Choose how you want to receive verification codes
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleSetup2FA("authenticator")}
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        Authenticator App (Recommended)
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleSetup2FA("sms")}
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        SMS Text Message
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleSetup2FA("email")}
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}

          {!twoFactorAuth.enabled && (
            <>
              <Separator />
              <Dialog open={show2FASetup} onOpenChange={setShow2FASetup}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                      Choose how you want to receive verification codes
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleSetup2FA("authenticator")}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Authenticator App</div>
                        <div className="text-xs text-muted-foreground">
                          Recommended - Use Google Authenticator or similar
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleSetup2FA("sms")}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">SMS Text Message</div>
                        <div className="text-xs text-muted-foreground">
                          Receive codes via text message
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleSetup2FA("email")}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Email</div>
                        <div className="text-xs text-muted-foreground">
                          Receive codes via email
                        </div>
                      </div>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Manage devices where you're currently signed in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loginSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  {getDeviceIcon(session.device_type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{session.device_name}</h4>
                    {session.is_current && (
                      <Badge variant="default" className="bg-green-500">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {session.browser} • {session.os}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.location} • {session.ip_address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last active: {new Date(session.last_active_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {!session.is_current && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Revoke
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Revoke this session?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will sign you out from {session.device_name}. You'll need to sign
                        in again on that device.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRevokeSession(session.id)}>
                        Revoke Session
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>Manage API keys for programmatic access</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New API Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create API Key</DialogTitle>
                  <DialogDescription>
                    Create a new API key for accessing your account programmatically
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="api_key_name">Key Name</Label>
                    <Input id="api_key_name" placeholder="Production API Key" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="read_posts" />
                        <Label htmlFor="read_posts" className="font-normal">
                          Read posts
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="write_posts" />
                        <Label htmlFor="write_posts" className="font-normal">
                          Write posts
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="read_analytics" />
                        <Label htmlFor="read_analytics" className="font-normal">
                          Read analytics
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button>Create API Key</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{apiKey.name}</h4>
                  <Badge variant="outline" className="font-mono text-xs">
                    {apiKey.key_prefix}...
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {apiKey.permissions.map((permission, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Created: {new Date(apiKey.created_at).toLocaleDateString()}
                  {apiKey.last_used_at && (
                    <>
                      {" • "}
                      Last used: {new Date(apiKey.last_used_at).toLocaleDateString()}
                    </>
                  )}
                  {apiKey.expires_at && (
                    <>
                      {" • "}
                      Expires: {new Date(apiKey.expires_at).toLocaleDateString()}
                    </>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete API Key?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the API key "{apiKey.name}". Any
                        integrations using this key will stop working.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteAPIKey(apiKey.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Security Activity
          </CardTitle>
          <CardDescription>Recent security events and login history</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login History</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-4">
              {loginHistory.map((entry) => (
                <div key={entry.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="p-2 bg-muted rounded-lg">
                    {entry.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">
                        {entry.event_type === "login" && "Successful Login"}
                        {entry.event_type === "logout" && "Logged Out"}
                        {entry.event_type === "failed_login" && "Failed Login Attempt"}
                      </h4>
                      {!entry.success && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {entry.device_name} • {entry.browser}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.location || "Unknown location"} • {entry.ip_address}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="audit" className="space-y-4 mt-4">
              {auditLog.map((entry) => (
                <div key={entry.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="p-2 bg-muted rounded-lg">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium">{entry.action}</h4>
                    <p className="text-sm text-muted-foreground">{entry.details}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.ip_address} • {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
