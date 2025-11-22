import { Badge } from "@/components/ui/badge";
import type { IntegrationStatus } from "@/lib/zod-schemas";

interface IntegrationStatusBadgeProps {
  status: IntegrationStatus;
}

export function IntegrationStatusBadge({
  status,
}: IntegrationStatusBadgeProps) {
  const variants = {
    connected: { variant: "default" as const, label: "Connected" },
    disconnected: { variant: "outline" as const, label: "Disconnected" },
    error: { variant: "destructive" as const, label: "Error" },
    pending: { variant: "secondary" as const, label: "Pending" },
  };

  const config = variants[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
