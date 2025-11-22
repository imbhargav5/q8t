"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProviderDefinition } from "@/lib/zod-schemas";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProviderCardProps {
  provider: ProviderDefinition;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [accountName, setAccountName] = useState("");

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnecting(false);
      setShowDialog(false);
      setAccountName("");
      toast.success(`${provider.name} connected successfully!`);
    }, 1500);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={provider.icon} alt={provider.name} />
              <AvatarFallback>
                {provider.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-base">{provider.name}</CardTitle>
          </div>
          <CardDescription className="line-clamp-2">
            {provider.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">
              Key Features:
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              {provider.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            onClick={() => setShowDialog(true)}
            className="flex-1"
            size="sm"
          >
            Connect
          </Button>
          {provider.documentation_url && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={provider.documentation_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {provider.name}</DialogTitle>
            <DialogDescription>
              Authorize Chatsian to access your {provider.name} account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="account-name">Account Name (optional)</Label>
              <Input
                id="account-name"
                placeholder={`My ${provider.name} Account`}
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Give this connection a memorable name
              </p>
            </div>
            <div className="rounded-lg border p-4 space-y-2">
              <div className="font-medium text-sm">
                This integration will be able to:
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {provider.capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span className="flex-1 capitalize">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isConnecting}
            >
              Cancel
            </Button>
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? "Authorizing..." : "Authorize"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
