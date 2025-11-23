"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockCrisisIncidents, mockCrisisDetectionRules, mockStatusComponents } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle, Clock, Shield, Activity, Plus, Settings } from "lucide-react";
import type { CrisisSeverity, CrisisStatus, ComponentStatus } from "@/lib/zod-schemas";
import { useParams } from "next/navigation";

const severityConfig: Record<CrisisSeverity, { color: string; icon: typeof AlertTriangle }> = {
  low: { color: "bg-blue-500/10 text-blue-700 border-blue-200", icon: Activity },
  medium: { color: "bg-yellow-500/10 text-yellow-700 border-yellow-200", icon: Clock },
  high: { color: "bg-orange-500/10 text-orange-700 border-orange-200", icon: AlertTriangle },
  critical: { color: "bg-red-500/10 text-red-700 border-red-200", icon: Shield },
};

const statusConfig: Record<CrisisStatus, { color: string; label: string }> = {
  detected: { color: "bg-red-500", label: "Detected" },
  acknowledged: { color: "bg-yellow-500", label: "Acknowledged" },
  investigating: { color: "bg-blue-500", label: "Investigating" },
  resolving: { color: "bg-purple-500", label: "Resolving" },
  resolved: { color: "bg-green-500", label: "Resolved" },
};

const componentStatusConfig: Record<ComponentStatus, { color: string; label: string }> = {
  operational: { color: "bg-green-500", label: "Operational" },
  degraded: { color: "bg-yellow-500", label: "Degraded" },
  partial_outage: { color: "bg-orange-500", label: "Partial Outage" },
  major_outage: { color: "bg-red-500", label: "Major Outage" },
  maintenance: { color: "bg-blue-500", label: "Maintenance" },
};

export default function CrisisManagementPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const activeIncidents = mockCrisisIncidents.filter(i => i.status !== "resolved");
  const resolvedIncidents = mockCrisisIncidents.filter(i => i.status === "resolved");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Crisis Management</h1>
          <p className="text-muted-foreground">Monitor and manage crisis incidents across all platforms</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {activeIncidents.length} Active Incident{activeIncidents.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Active Incidents */}
      {activeIncidents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Incidents</h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Manual Incident
            </Button>
          </div>
          <div className="grid gap-4">
            {activeIncidents.map((incident) => {
              const SeverityIcon = severityConfig[incident.severity].icon;
              return (
                <Alert key={incident.id} className={`${severityConfig[incident.severity].color} cursor-pointer hover:shadow-md transition-shadow`}>
                  <SeverityIcon className="h-5 w-5" />
                  <AlertTitle className="flex items-center gap-2">
                    {incident.title}
                    <Badge className={statusConfig[incident.status].color}>
                      {statusConfig[incident.status].label}
                    </Badge>
                    <Badge variant="outline">{incident.severity.toUpperCase()}</Badge>
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    <p className="mb-2">{incident.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span>
                        <strong>Platforms:</strong> {incident.platforms.join(", ")}
                      </span>
                      <span>
                        <strong>Detected:</strong> {new Date(incident.detectedAt).toLocaleString()}
                      </span>
                      {incident.negativeMessageCount > 0 && (
                        <span>
                          <strong>Negative Messages:</strong> {incident.negativeMessageCount}
                        </span>
                      )}
                    </div>
                    {incident.impactNotes && (
                      <p className="mt-2 text-sm italic">{incident.impactNotes}</p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="secondary">
                        View Details
                      </Button>
                      {incident.status === "detected" && (
                        <Button size="sm">
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        </div>
      )}

      {/* System Status Components */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">System Status</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Component
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockStatusComponents.map((component) => (
            <Card key={component.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{component.name}</span>
                  <Badge className={componentStatusConfig[component.status].color}>
                    {componentStatusConfig[component.status].label}
                  </Badge>
                </CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Type: {component.componentType}</p>
                  {component.lastStatusChange && (
                    <p>Last changed: {new Date(component.lastStatusChange).toLocaleString()}</p>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detection Rules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Detection Rules</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
        </div>
        <div className="grid gap-4">
          {mockCrisisDetectionRules.map((rule) => (
            <Card key={rule.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{rule.name}</span>
                  <div className="flex gap-2">
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">Priority: {rule.priority}</Badge>
                  </div>
                </CardTitle>
                <CardDescription>{rule.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-4">
                    <span><strong>Type:</strong> {rule.detectionType.replace("_", " ")}</span>
                    <span><strong>Triggers:</strong> {rule.triggerCount}</span>
                  </div>
                  {rule.lastTriggeredAt && (
                    <p className="text-muted-foreground">
                      Last triggered: {new Date(rule.lastTriggeredAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 mr-1" />
                    Edit Rule
                  </Button>
                  <Button size="sm" variant={rule.isActive ? "secondary" : "default"}>
                    {rule.isActive ? "Pause" : "Activate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Resolved Incidents */}
      {resolvedIncidents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recently Resolved</h2>
          <div className="grid gap-4">
            {resolvedIncidents.map((incident) => (
              <Card key={incident.id} className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {incident.title}
                    <Badge className="bg-green-500">Resolved</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>{incident.description}</p>
                    {incident.resolutionNotes && (
                      <div className="mt-2 p-3 bg-muted rounded">
                        <p className="font-semibold mb-1">Resolution:</p>
                        <p>{incident.resolutionNotes}</p>
                      </div>
                    )}
                    <div className="flex gap-4 text-muted-foreground">
                      <span>Detected: {new Date(incident.detectedAt).toLocaleDateString()}</span>
                      {incident.resolvedAt && (
                        <span>Resolved: {new Date(incident.resolvedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
