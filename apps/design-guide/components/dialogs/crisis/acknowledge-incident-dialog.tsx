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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface AcknowledgeIncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incidentTitle: string;
  onAcknowledge: (note?: string) => void;
}

export function AcknowledgeIncidentDialog({
  open,
  onOpenChange,
  incidentTitle,
  onAcknowledge,
}: AcknowledgeIncidentDialogProps) {
  const [note, setNote] = useState("");

  const handleAcknowledge = () => {
    onAcknowledge(note.trim() || undefined);
    setNote("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <DialogTitle>Acknowledge Incident</DialogTitle>
          </div>
          <DialogDescription>
            Acknowledge that you are aware of this incident and will begin investigating
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm font-medium">{incidentTitle}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Add Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Add any initial observations or next steps..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </div>

          <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-3 text-sm text-blue-900 dark:text-blue-100">
            <p className="font-medium">What happens next:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Status will change to &quot;Investigating&quot;</li>
              <li>Your acknowledgment will be logged in the timeline</li>
              <li>Team members will be notified</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAcknowledge}>
            Acknowledge & Investigate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
