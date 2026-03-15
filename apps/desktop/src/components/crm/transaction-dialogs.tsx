
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Tag, Calendar as CalendarIcon, Phone, Mail, X } from "lucide-react";
import type { Person } from "@/lib/zod-schemas";

// Send Message Dialog
interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: Person;
}

export function SendMessageDialog({ open, onOpenChange, person }: SendMessageDialogProps) {
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState<string>("email");

  const handleSend = () => {
    console.log("Sending message:", { message, channel, personId: person.id });
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Message to {person.full_name || person.email}</DialogTitle>
          <DialogDescription>
            Choose a channel and compose your message
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="channel">Channel</Label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger id="channel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </SelectItem>
                <SelectItem value="sms">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    SMS
                  </div>
                </SelectItem>
                <SelectItem value="internal">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Internal Note
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Add Tag Dialog
interface AddTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: Person;
}

export function AddTagDialog({ open, onOpenChange, person }: AddTagDialogProps) {
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(person.tags);

  const suggestedTags = ["VIP", "Customer", "Lead", "Partner", "Vendor", "Prospect"];

  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleToggleSuggestedTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      handleRemoveTag(tag);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    console.log("Saving tags:", { tags: selectedTags, personId: person.id });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
          <DialogDescription>
            Add or remove tags for {person.full_name || person.email}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Tags */}
          {selectedTags.length > 0 && (
            <div className="space-y-2">
              <Label>Current Tags</Label>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Add New Tag */}
          <div className="space-y-2">
            <Label htmlFor="new-tag">Add New Tag</Label>
            <div className="flex gap-2">
              <Input
                id="new-tag"
                placeholder="Enter tag name..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button onClick={handleAddTag} size="sm">
                Add
              </Button>
            </div>
          </div>

          {/* Suggested Tags */}
          <div className="space-y-2">
            <Label>Suggested Tags</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedTags
                .filter((tag) => !selectedTags.includes(tag))
                .map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => handleToggleSuggestedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Tag className="h-4 w-4 mr-2" />
            Save Tags
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Mark Date Dialog
interface MarkDateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: Person;
}

export function MarkDateDialog({ open, onOpenChange, person }: MarkDateDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateType, setDateType] = useState<string>("followup");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log("Marking date:", { date, dateType, notes, personId: person.id });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Mark Important Date</DialogTitle>
          <DialogDescription>
            Set a reminder or mark an important date for {person.full_name || person.email}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date-type">Date Type</Label>
            <Select value={dateType} onValueChange={setDateType}>
              <SelectTrigger id="date-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="followup">Follow-up</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="anniversary">Anniversary</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about this date..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Save Date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Contact Method Dialog
interface ContactMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: Person;
}

export function ContactMethodDialog({ open, onOpenChange, person }: ContactMethodDialogProps) {
  const [method, setMethod] = useState<string>("call");
  const [notes, setNotes] = useState("");

  const handleLog = () => {
    console.log("Logging contact:", { method, notes, personId: person.id });
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Log Contact</DialogTitle>
          <DialogDescription>
            Record a contact interaction with {person.full_name || person.email}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="method">Contact Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="meeting">In-Person Meeting</SelectItem>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="message">Message</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-notes">Notes</Label>
            <Textarea
              id="contact-notes"
              placeholder="What was discussed or accomplished?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
            />
          </div>

          <div className="text-sm text-muted-foreground">
            This will be logged in the timeline with the current timestamp.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleLog}>
            <Phone className="h-4 w-4 mr-2" />
            Log Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
