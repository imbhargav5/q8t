"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { mockCRMSegments } from "@/lib/mock-data";

export function FilterSidebar() {
  const systemSegments = mockCRMSegments.filter((s) => s.is_system);
  const customSegments = mockCRMSegments.filter((s) => !s.is_system);

  return (
    <ScrollArea className="h-64 border-b">
      <div className="p-3 space-y-4">
        {/* Quick Filters */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Quick Filters
          </h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox id="vip" />
              <span>⭐ VIP Contacts</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox id="verified" />
              <span>✅ Verified</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox id="blocked" />
              <span>🚫 Blocked</span>
            </label>
          </div>
        </div>

        <Separator />

        {/* System Segments */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Segments
          </h4>
          <div className="space-y-1">
            {systemSegments.slice(0, 5).map((segment) => (
              <button
                key={segment.id}
                className="w-full flex items-center justify-between p-2 rounded hover:bg-accent text-sm"
              >
                <span className="flex items-center gap-2">
                  <span>{segment.icon}</span>
                  <span>{segment.name}</span>
                </span>
                <Badge variant="secondary" className="text-xs">
                  {segment.contact_count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {customSegments.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Custom Segments
              </h4>
              <div className="space-y-1">
                {customSegments.map((segment) => (
                  <button
                    key={segment.id}
                    className="w-full flex items-center justify-between p-2 rounded hover:bg-accent text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span>{segment.icon}</span>
                      <span>{segment.name}</span>
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {segment.contact_count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
