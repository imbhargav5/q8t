"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User, Shield, Lock } from "lucide-react";

const settingsTabs = [
  {
    name: "General",
    href: "/settings",
    icon: User,
  },
  {
    name: "Privacy",
    href: "/settings/privacy",
    icon: Shield,
  },
  {
    name: "Security",
    href: "/settings/security",
    icon: Lock,
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="px-6">
          <nav className="flex space-x-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </div>
    </div>
  );
}
