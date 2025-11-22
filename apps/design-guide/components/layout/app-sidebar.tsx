"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Send,
  BarChart3,
  Users,
  Bot,
  Settings,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: MessageSquare, label: "Social Inbox", href: "/social-inbox" },
  { icon: Send, label: "Publishing", href: "/publishing" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "CRM", href: "/crm" },
  { icon: Bot, label: "Automations", href: "/automations" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 56 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative border-r bg-background flex flex-col"
    >
      {/* Navigation */}
      <nav className="flex-1 py-4">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.href}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="truncate"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </motion.div>
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          onClick={onToggle}
          className="w-full"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </motion.aside>
  );
}
