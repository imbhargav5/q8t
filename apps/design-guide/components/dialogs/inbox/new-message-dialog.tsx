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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Upload, X } from "lucide-react";
import { useState } from "react";
import type { SocialPlatform } from "@/lib/zod-schemas/enums.schema";

interface NewMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendMessage: (message: {
    recipientId: string;
    platform: SocialPlatform;
    content: string;
    attachments?: string[];
  }) => void;
}

const platforms: SocialPlatform[] = ["twitter", "facebook", "instagram", "linkedin"];

const mockContacts = [
  { id: "contact-1", name: "Sarah Johnson", platform: "twitter" as SocialPlatform },
  { id: "contact-2", name: "Mike Chen", platform: "facebook" as SocialPlatform },
  { id: "contact-3", name: "Emily Rodriguez", platform: "instagram" as SocialPlatform },
  { id: "contact-4", name: "David Kim", platform: "linkedin" as SocialPlatform },
  { id: "contact-5", name: "Alex Rivera", platform: "twitter" as SocialPlatform },
];

export function NewMessageDialog({
  open,
  onOpenChange,
  onSendMessage,
}: NewMessageDialogProps) {
  const [recipientId, setRecipientId] = useState("");
  const [platform, setPlatform] = useState<SocialPlatform>("twitter");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);

  const addAttachment = () => {
    // Mock attachment
    setAttachments([...attachments, `file-${attachments.length + 1}.pdf`]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!recipientId || !content.trim()) return;

    onSendMessage({
      recipientId,
      platform,
      content: content.trim(),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Reset
    setRecipientId("");
    setPlatform("twitter");
    setContent("");
    setAttachments([]);
    onOpenChange(false);
  };

  const filteredContacts = mockContacts.filter((c) => c.platform === platform);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Start a conversation with a contact
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* SocialPlatform Selection */}
          <div className="space-y-2">
            <Label htmlFor="platform">
              SocialPlatform <span className="text-destructive">*</span>
            </Label>
            <Select
              value={platform}
              onValueChange={(v) => {
                setPlatform(v as SocialPlatform);
                setRecipientId(""); // Reset recipient when platform changes
              }}
            >
              <SelectTrigger id="platform">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p} value={p}>
                    <span className="capitalize">{p}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Selection */}
          <div className="space-y-2">
            <Label htmlFor="recipient">
              Recipient <span className="text-destructive">*</span>
            </Label>
            <Select value={recipientId} onValueChange={setRecipientId}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Search or select a contact..." />
              </SelectTrigger>
              <SelectContent>
                {filteredContacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {filteredContacts.length} contacts available on {platform}
            </p>
          </div>

          {/* Message Content */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              {content.length} characters
            </p>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <span className="text-sm">{attachment}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAttachment}
            >
              <Upload className="mr-2 h-4 w-4" />
              Add Attachment
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!recipientId || !content.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
