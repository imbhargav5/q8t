import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { ConversationStatus } from "@/lib/zod-schemas";

const statusConfig: Record<ConversationStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
  open: { label: "Open", variant: "default", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  pending: { label: "Pending", variant: "secondary", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  resolved: { label: "Resolved", variant: "outline", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  archived: { label: "Archived", variant: "outline", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" },
};

interface StatusBadgeProps {
  status: ConversationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn(config.className, "text-xs", className)}>
      {config.label}
    </Badge>
  );
}
