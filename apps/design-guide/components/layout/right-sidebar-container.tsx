"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RightSidebarContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function RightSidebarContainer({ children, className }: RightSidebarContainerProps) {
  return (
    <aside className={cn("w-80 border-l bg-background", className)}>
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">{children}</div>
      </ScrollArea>
    </aside>
  );
}
