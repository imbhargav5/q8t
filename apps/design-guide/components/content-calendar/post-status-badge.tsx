import { Badge } from "@/components/ui/badge";
import type { PostStatus } from "@/lib/zod-schemas";
import {
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  Loader2,
  Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PostStatusBadgeProps {
  status: PostStatus;
}

const statusConfig: Record<
  PostStatus,
  { icon: typeof Clock; variant: "default" | "secondary" | "destructive" | "outline"; label: string }
> = {
  draft: {
    icon: FileText,
    variant: "outline",
    label: "Draft",
  },
  scheduled: {
    icon: Clock,
    variant: "default",
    label: "Scheduled",
  },
  publishing: {
    icon: Loader2,
    variant: "secondary",
    label: "Publishing",
  },
  published: {
    icon: CheckCircle2,
    variant: "secondary",
    label: "Published",
  },
  failed: {
    icon: AlertCircle,
    variant: "destructive",
    label: "Failed",
  },
  archived: {
    icon: Archive,
    variant: "outline",
    label: "Archived",
  },
};

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant}>
      <Icon className={cn("h-3 w-3 mr-1", status === "publishing" && "animate-spin")} />
      {config.label}
    </Badge>
  );
}
