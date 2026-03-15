
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
import { useState } from "react";

type ComponentStatus = "operational" | "degraded" | "partial-outage" | "major-outage";

interface AddComponentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddComponent: (component: {
    name: string;
    description: string;
    status: ComponentStatus;
  }) => void;
}

const statusOptions: { value: ComponentStatus; label: string }[] = [
  { value: "operational", label: "Operational" },
  { value: "degraded", label: "Degraded Performance" },
  { value: "partial-outage", label: "Partial Outage" },
  { value: "major-outage", label: "Major Outage" },
];

export function AddComponentDialog({
  open,
  onOpenChange,
  onAddComponent,
}: AddComponentDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ComponentStatus>("operational");

  const handleSubmit = () => {
    if (!name.trim()) return;

    onAddComponent({
      name: name.trim(),
      description: description.trim(),
      status,
    });

    // Reset form
    setName("");
    setDescription("");
    setStatus("operational");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add System Component</DialogTitle>
          <DialogDescription>
            Add a new component to monitor its status
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
              rows={3}
            />
          </div>

          {/* Initial Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Add Component
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
