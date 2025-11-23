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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Clock,
  TrendingUp,
  MessageSquare,
  Activity,
} from "lucide-react";
import { useState } from "react";
import type { IncidentSeverity, IncidentStatus } from "@/lib/zod-schemas/enums.schema";
import { format } from "date-fns";

interface IncidentData {
  id: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  description: string;
  detectedAt: Date;
  resolvedAt?: Date;
  affectedPlatforms: string[];
  affectedChannels: string[];
  impactMetrics?: {
    mentionsCount: number;
    negativesentimentPercentage: number;
    reachEstimate: number;
  };
  timeline: Array<{
    timestamp: Date;
    action: string;
    user: string;
    note?: string;
  }>;
}

interface IncidentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incident: IncidentData;
  onChangeStatus: (newStatus: IncidentStatus) => void;
  onAddUpdate: (update: string) => void;
  onResolve: () => void;
}

const statusOptions: IncidentStatus[] = [
  "detected",
  "investigating",
  "identified",
  "monitoring",
  "resolved",
];

const severityColors = {
  critical: "bg-red-600",
  high: "bg-orange-600",
  medium: "bg-yellow-600",
  low: "bg-blue-600",
};

export function IncidentDetailsDialog({
  open,
  onOpenChange,
  incident,
  onChangeStatus,
  onAddUpdate,
  onResolve,
}: IncidentDetailsDialogProps) {
  const [updateNote, setUpdateNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<IncidentStatus>(
    incident.status
  );

  const handleAddUpdate = () => {
    if (updateNote.trim()) {
      onAddUpdate(updateNote);
      setUpdateNote("");
    }
  };

  const handleStatusChange = (newStatus: IncidentStatus) => {
    setSelectedStatus(newStatus);
    onChangeStatus(newStatus);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl">{incident.title}</DialogTitle>
              <DialogDescription className="mt-2">
                Detected {format(incident.detectedAt, "MMM dd, yyyy 'at' h:mm a")}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={`${
                  severityColors[incident.severity]
                } text-white capitalize`}
              >
                <AlertCircle className="mr-1 h-3 w-3" />
                {incident.severity}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {incident.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {incident.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Affected Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {incident.affectedPlatforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="capitalize">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              {incident.affectedChannels.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Affected Channels</h4>
                  <div className="flex flex-wrap gap-2">
                    {incident.affectedChannels.map((channel) => (
                      <Badge key={channel} variant="outline">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {incident.impactMetrics && (
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-xs">Mentions</span>
                    </div>
                    <p className="text-2xl font-semibold">
                      {incident.impactMetrics.mentionsCount.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs">Negative Sentiment</span>
                    </div>
                    <p className="text-2xl font-semibold">
                      {incident.impactMetrics.negativesentimentPercentage}%
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Activity className="h-4 w-4" />
                      <span className="text-xs">Reach</span>
                    </div>
                    <p className="text-2xl font-semibold">
                      {(incident.impactMetrics.reachEstimate / 1000).toFixed(1)}K
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-3">
              {incident.timeline.map((entry, index) => (
                <div key={index} className="flex gap-3 pb-3 border-b last:border-0">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{entry.action}</p>
                      <span className="text-xs text-muted-foreground">
                        {format(entry.timestamp, "MMM dd, h:mm a")}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      by {entry.user}
                    </p>
                    {entry.note && (
                      <p className="text-sm mt-2 text-muted-foreground">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Change Status</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(v) => handleStatusChange(v as IncidentStatus)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        <span className="capitalize">{status}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="update">Add Update</Label>
                <Textarea
                  id="update"
                  placeholder="Describe what actions have been taken..."
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  rows={4}
                />
                <Button
                  onClick={handleAddUpdate}
                  disabled={!updateNote.trim()}
                  className="w-full"
                >
                  Add Update to Timeline
                </Button>
              </div>

              {incident.status !== "resolved" && (
                <Button
                  variant="outline"
                  onClick={onResolve}
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                >
                  Mark as Resolved
                </Button>
              )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="rounded-lg border p-6 text-center text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">
                  Detailed analytics and impact charts would appear here
                </p>
                <p className="text-xs mt-2">
                  Showing trend analysis, sentiment breakdown, and reach metrics
                </p>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
