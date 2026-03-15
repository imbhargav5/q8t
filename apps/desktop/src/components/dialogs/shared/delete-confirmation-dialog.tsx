
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { ReactNode, useState } from "react";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  itemName: string;
  itemType: string;
  description?: string;
  impact?: ReactNode;
  onConfirm: () => void;
  requiresConfirmation?: boolean;
  confirmationText?: string;
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  title,
  itemName,
  itemType,
  description,
  impact,
  onConfirm,
  requiresConfirmation = true,
  confirmationText = "DELETE",
}: DeleteConfirmationDialogProps) {
  const [confirmInput, setConfirmInput] = useState("");

  const isConfirmed =
    !requiresConfirmation || confirmInput === confirmationText;

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm();
      onOpenChange(false);
      setConfirmInput("");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setConfirmInput("");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>
                {description ||
                  `Are you sure you want to delete ${itemType} `}
                <span className="font-semibold text-foreground">
                  {itemName}
                </span>
                ? This action cannot be undone.
              </p>
              {impact && (
                <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                  {impact}
                </div>
              )}
              {requiresConfirmation && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-delete">
                    Type <span className="font-mono font-semibold">{confirmationText}</span> to
                    confirm:
                  </Label>
                  <Input
                    id="confirm-delete"
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value)}
                    placeholder={confirmationText}
                    className="font-mono"
                  />
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmed}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete {itemType}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
