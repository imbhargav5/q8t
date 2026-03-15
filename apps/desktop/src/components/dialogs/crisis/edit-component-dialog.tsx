
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
import { useEffect, useState } from "react";

type ComponentStatus = "operational" | "degraded" | "partial-outage" | "major-outage";

interface ComponentData {
  name: string;
  description: string;
  status: ComponentStatus;
  statusMessage?: string;
}

interface EditComponentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  component: ComponentData;
  onSave: (component: ComponentData) => void;
}

const statusOptions: { value: ComponentStatus; label: string }[] = [
  { value: "operational", label: "Operational" },
  { value: "degraded", label: "Degraded Performance" },
  { value: "partial-outage", label: "Partial Outage" },
  { value: "major-outage", label: "Major Outage" },
];

export function EditComponentDialog({
  open,
  onOpenChange,
  component,
  onSave,
}: EditComponentDialogProps) {
  const [name, setName] = useState(component.name);
  const [description, setDescription] = useState(component.description);
  const [status, setStatus] = useState<ComponentStatus>(component.status);
  const [statusMessage, setStatusMessage] = useState(component.statusMessage || "");

  useEffect(() => {
    if (open) {
      setName(component.name);
      setDescription(component.description);
      setStatus(component.status);
      setStatusMessage(component.statusMessage || "");
    }
  }, [open, component]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      status,
      statusMessage: statusMessage.trim() || undefined,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Component</DialogTitle>
          <DialogDescription>
            Update component details and status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Component Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Component Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Twitter API, Publishing Service"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of what this component does"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as ComponentStatus)}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Message */}
          <div className="space-y-2">
            <Label htmlFor="statusMessage">Status Message</Label>
            <Textarea
              id="statusMessage"
              placeholder="Optional message about the current status"
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
