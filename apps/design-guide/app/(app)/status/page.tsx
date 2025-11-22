import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStatusComponents, mockStatusPageUpdates } from "@/lib/mock-data";
import { CheckCircle2, AlertCircle, AlertTriangle, Wrench, XCircle } from "lucide-react";
import type { ComponentStatus } from "@/lib/zod-schemas";

const statusConfig: Record<ComponentStatus, {
  color: string;
  bgColor: string;
  icon: typeof CheckCircle2;
  label: string
}> = {
  operational: {
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    icon: CheckCircle2,
    label: "Operational"
  },
  degraded: {
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 border-yellow-200",
    icon: AlertTriangle,
    label: "Degraded Performance"
  },
  partial_outage: {
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
    icon: AlertCircle,
    label: "Partial Outage"
  },
  major_outage: {
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
    icon: XCircle,
    label: "Major Outage"
  },
  maintenance: {
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    icon: Wrench,
    label: "Maintenance"
  },
};

export default function StatusPage() {
  const allOperational = mockStatusComponents.every(c => c.status === "operational");
  const hasIssues = mockStatusComponents.some(c =>
    c.status === "degraded" || c.status === "partial_outage" || c.status === "major_outage"
  );

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">System Status</h1>
        <p className="text-muted-foreground">
          Current status of all Q8T services and components
        </p>
      </div>

      {/* Overall Status */}
      <Card className={allOperational ? "bg-green-50 border-green-200" : hasIssues ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {allOperational ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <span className="text-green-600">All Systems Operational</span>
              </>
            ) : hasIssues ? (
              <>
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <span className="text-yellow-600">Some Systems Experiencing Issues</span>
              </>
            ) : (
              <>
                <Wrench className="h-6 w-6 text-blue-600" />
                <span className="text-blue-600">Scheduled Maintenance</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Components Status */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Components</h2>
        {mockStatusComponents
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((component) => {
            const config = statusConfig[component.status];
            const Icon = config.icon;

            return (
              <Card key={component.id} className={config.bgColor}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${config.color}`} />
                      <div>
                        <CardTitle className="text-lg">{component.name}</CardTitle>
                        <CardDescription>{component.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={config.color}>
                      {config.label}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
      </div>

      {/* Status Updates */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Updates</h2>
        {mockStatusPageUpdates
          .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
          .map((update) => {
            const config = statusConfig[update.status];
            const Icon = config.icon;

            return (
              <Card key={update.id}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{update.title}</CardTitle>
                        <Badge variant="outline" className={config.color}>
                          {config.label}
                        </Badge>
                      </div>
                      <CardDescription className="text-base mb-2">
                        {update.body}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{new Date(update.postedAt).toLocaleString()}</span>
                        {update.isPinned && (
                          <Badge variant="secondary">Pinned</Badge>
                        )}
                        {update.isPublic && (
                          <Badge variant="secondary">Public</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
      </div>

      {/* Footer */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleString()}</p>
            <p className="mt-2">
              Subscribe to updates or view historical uptime data
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
