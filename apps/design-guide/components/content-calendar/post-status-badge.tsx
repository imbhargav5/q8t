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

interface PostStatusBadgeProps {
  status: PostStatus;
}

const statusConfig: Record<
  PostStatus,
  { icon: typeof Clock; color: string; label: string }
> = {
  draft: {
    icon: FileText,
    color: "bg-gray-500 text-white",
    label: "Draft",
  },
  scheduled: {
    icon: Clock,
    color: "bg-blue-500 text-white",
    label: "Scheduled",
  },
  publishing: {
    icon: Loader2,
    color: "bg-yellow-500 text-white",
    label: "Publishing",
  },
  published: {
    icon: CheckCircle2,
    color: "bg-green-500 text-white",
    label: "Published",
  },
  failed: {
    icon: AlertCircle,
    color: "bg-red-500 text-white",
    label: "Failed",
  },
  archived: {
    icon: Archive,
    color: "bg-gray-400 text-white",
    label: "Archived",
  },
};

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="secondary" className={`${config.color} gap-1 px-2 py-0.5`}>
      <Icon className={`h-3 w-3 ${status === "publishing" ? "animate-spin" : ""}`} />
      <span className="text-xs font-medium">{config.label}</span>
    </Badge>
  );
}
