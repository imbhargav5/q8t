"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { ReactNode } from "react";

interface ActionProgressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  status: "loading" | "success" | "error" | "idle";
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  children?: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function ActionProgressDialog({
  open,
  onOpenChange,
  title,
  status,
  loadingMessage = "Processing...",
  successMessage = "Action completed successfully!",
  errorMessage = "An error occurred. Please try again.",
  children,
  onClose,
  showCloseButton = true,
}: ActionProgressDialogProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              {status === "loading" && (
                <div className="flex items-center gap-3 py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span>{loadingMessage}</span>
                </div>
              )}
              {status === "success" && (
                <div className="flex items-center gap-3 py-4">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">{successMessage}</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 py-4">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="text-destructive">{errorMessage}</span>
                </div>
              )}
              {children && <div className="mt-4">{children}</div>}
            </div>
          </DialogDescription>
        </DialogHeader>
        {showCloseButton && status !== "loading" && (
          <DialogFooter>
            <Button onClick={handleClose}>Close</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
