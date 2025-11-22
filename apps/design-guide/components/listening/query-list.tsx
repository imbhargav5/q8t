"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ListeningQuery } from "@/lib/mock-data";
import * as Listbox from "@diceui/listbox";

interface ListenerQueryListProps {
  queries: ListeningQuery[];
  selectedId?: string;
  onSelect: (query: ListeningQuery) => void;
}

export function ListenerQueryList({ queries, selectedId, onSelect }: ListenerQueryListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-2">
        <Listbox.Root orientation="vertical">
          <Listbox.Group className="space-y-1">
            {queries.map((query) => (
              <Listbox.Item
                key={query.id}
                onClick={() => onSelect(query)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-colors cursor-pointer",
                  "hover:bg-accent hover:border-accent-foreground/20",
                  selectedId === query.id
                    ? "bg-accent border-accent-foreground/20"
                    : "bg-card border-transparent"
                )}
              >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {query.icon && <span className="text-lg">{query.icon}</span>}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{query.name}</div>
                </div>
                {query.isStarred && (
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                )}
              </div>
            </div>

            <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {query.description}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={query.isActive ? "default" : "secondary"}
                className="text-xs"
              >
                {query.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {query.queryType}
              </Badge>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">24h:</span>
                <span className="ml-1 font-medium">{query.mentionCount24h}</span>
                {getMentionTrend(query) === "up" && (
                  <TrendingUp className="inline h-3 w-3 text-green-600 ml-1" />
                )}
                {getMentionTrend(query) === "down" && (
                  <TrendingDown className="inline h-3 w-3 text-red-600 ml-1" />
                )}
                {getMentionTrend(query) === "stable" && (
                  <Minus className="inline h-3 w-3 text-gray-400 ml-1" />
                )}
              </div>
              <div>
                <span className="text-muted-foreground">Total:</span>
                <span className="ml-1 font-medium">
                  {formatNumber(query.totalMentions)}
                </span>
              </div>
            </div>

            {query.alertsEnabled && (
              <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                <div className="h-1.5 w-1.5 bg-green-600 rounded-full" />
                <span>Alerts enabled</span>
              </div>
            )}
              </Listbox.Item>
            ))}
          </Listbox.Group>
        </Listbox.Root>
      </div>
    </ScrollArea>
  );
}

function getMentionTrend(query: ListeningQuery): "up" | "down" | "stable" {
  const avg7d = query.mentionCount7d / 7;
  const diff = query.mentionCount24h - avg7d;
  const percentChange = (diff / avg7d) * 100;

  if (percentChange > 20) return "up";
  if (percentChange < -20) return "down";
  return "stable";
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
