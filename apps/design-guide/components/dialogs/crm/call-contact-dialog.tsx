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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface CallContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  phoneNumbers?: Array<{ type: string; number: string }>;
  onLogCall: (callLog: {
    phoneNumber: string;
    callType: string;
    notes: string;
  }) => void;
  hasVoipIntegration?: boolean;
}

const callTypes = [
  { value: "sales", label: "Sales Call" },
  { value: "support", label: "Support Call" },
  { value: "follow-up", label: "Follow-up Call" },
  { value: "discovery", label: "Discovery Call" },
  { value: "other", label: "Other" },
];

export function CallContactDialog({
  open,
  onOpenChange,
  contactName,
  phoneNumbers = [
    { type: "Mobile", number: "+1 (555) 123-4567" },
    { type: "Work", number: "+1 (555) 987-6543" },
  ],
  onLogCall,
  hasVoipIntegration = false,
}: CallContactDialogProps) {
  const [selectedNumber, setSelectedNumber] = useState(phoneNumbers[0]?.number || "");
  const [callType, setCallType] = useState("sales");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(selectedNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogCall = () => {
    onLogCall({
      phoneNumber: selectedNumber,
      callType,
      notes: notes.trim(),
    });

    // Reset
    setCallType("sales");
    setNotes("");
    onOpenChange(false);
  };

  const handleStartCall = () => {
    // In a real app, this would integrate with VoIP service
    console.log("Starting call to:", selectedNumber);
    handleLogCall();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call {contactName}
          </DialogTitle>
          <DialogDescription>
            {hasVoipIntegration
              ? "Start a call or log call details"
              : "Log call details for this contact"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Phone Number Selection */}
          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number</Label>
            <div className="flex gap-2">
              <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                <SelectTrigger id="phone-number" className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {phoneNumbers.map((phone, index) => (
                    <SelectItem key={index} value={phone.number}>
                      {phone.type}: {phone.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyNumber}
                title="Copy number"
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Call Type */}
          <div className="space-y-2">
            <Label htmlFor="call-type">Call Type</Label>
            <Select value={callType} onValueChange={setCallType}>
              <SelectTrigger id="call-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {callTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Call Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              Call Notes {hasVoipIntegration ? "(Optional)" : ""}
            </Label>
            <Textarea
              id="notes"
              placeholder="Log details about the call..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Integration Info */}
          {!hasVoipIntegration && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-3 text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                No VoIP Integration
              </p>
              <p className="text-xs text-blue-800 dark:text-blue-200 mt-1">
                Connect a VoIP service to make calls directly from the app. For
                now, you can copy the number and log your call details.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {hasVoipIntegration ? (
            <>
              <Button variant="outline" onClick={handleLogCall}>
                Log Call Only
              </Button>
              <Button onClick={handleStartCall}>
                <Phone className="mr-2 h-4 w-4" />
                Start Call
              </Button>
            </>
          ) : (
            <Button onClick={handleLogCall}>
              Log Call
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
