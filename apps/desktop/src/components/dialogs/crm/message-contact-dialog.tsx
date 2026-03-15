
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
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Send, Upload, X } from "lucide-react";
import { useState } from "react";

interface MessageContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  onSendMessage: (message: {
    channel: string;
    subject?: string;
    content: string;
    template?: string;
    attachments?: string[];
  }) => void;
}

const channels = [
  { value: "email", label: "Email", icon: Mail },
  { value: "sms", label: "SMS", icon: MessageSquare },
  { value: "internal", label: "Internal Note", icon: MessageSquare },
];

const templates = [
  { value: "", label: "No template (blank message)" },
  { value: "follow-up", label: "Follow-up Template" },
  { value: "intro", label: "Introduction Template" },
  { value: "proposal", label: "Proposal Template" },
  { value: "thank-you", label: "Thank You Template" },
];

export function MessageContactDialog({
  open,
  onOpenChange,
  contactName,
  contactEmail = "contact@example.com",
  contactPhone = "+1 (555) 123-4567",
  onSendMessage,
}: MessageContactDialogProps) {
  const [channel, setChannel] = useState("email");
  const [template, setTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleTemplateChange = (templateId: string) => {
    setTemplate(templateId);
    // In a real app, this would load template content
    if (templateId) {
      setSubject(`[Template] Subject for ${templateId}`);
      setContent(`Template content for ${templateId}...\n\nHi ${contactName},\n\n`);
    }
  };

  const handleSend = () => {
    if (!content.trim()) return;

    onSendMessage({
      channel,
      subject: channel === "email" ? subject : undefined,
      content: content.trim(),
      template: template || undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Reset
    setChannel("email");
    setTemplate("");
    setSubject("");
    setContent("");
    setAttachments([]);
    onOpenChange(false);
  };

  const addAttachment = () => {
    // Mock attachment - in real app would use file picker
    setAttachments([...attachments, `document-${attachments.length + 1}.pdf`]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const maxLength = channel === "sms" ? 160 : 5000;
  const isValid = content.trim().length > 0 && content.length <= maxLength;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message {contactName}
          </DialogTitle>
          <DialogDescription>
            Send a message to this contact
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Channel Selection */}
          <div className="space-y-2">
            <Label htmlFor="channel">Channel</Label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger id="channel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {channels.map((ch) => (
                  <SelectItem key={ch.value} value={ch.value}>
                    <div className="flex items-center gap-2">
                      <ch.icon className="h-4 w-4" />
                      {ch.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {channel === "email" && `To: ${contactEmail}`}
              {channel === "sms" && `To: ${contactPhone}`}
              {channel === "internal" && "Internal note (not sent to contact)"}
            </p>
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="template">Template (Optional)</Label>
            <Select value={template} onValueChange={handleTemplateChange}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((tmpl) => (
                  <SelectItem key={tmpl.value} value={tmpl.value}>
                    {tmpl.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject (Email only) */}
          {channel === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          )}

          {/* Message Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder={`Write your ${channel} message...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              maxLength={maxLength}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{content.length} / {maxLength} characters</span>
              {channel === "sms" && content.length > 160 && (
                <span className="text-orange-600">
                  Will be sent as {Math.ceil(content.length / 160)} messages
                </span>
              )}
            </div>
          </div>

          {/* Attachments (Email only) */}
          {channel === "email" && (
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
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!isValid}>
            <Send className="mr-2 h-4 w-4" />
            Send {channel === "email" ? "Email" : channel === "sms" ? "SMS" : "Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
