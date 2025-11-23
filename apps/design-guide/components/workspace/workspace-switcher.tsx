"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockWorkspaces, mockWorkspace } from "@/lib/mock-data/workspaces";

interface WorkspaceSwitcherProps {
  className?: string;
}

export function WorkspaceSwitcher({ className }: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(mockWorkspace);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          aria-label="Select workspace"
          className={cn("w-full justify-between px-2", className)}
        >
          <div className="flex items-center gap-2 truncate">
            <Avatar className="h-6 w-6">
              {selectedWorkspace.logo_url && (
                <AvatarImage
                  src={selectedWorkspace.logo_url}
                  alt={selectedWorkspace.name}
                />
              )}
              <AvatarFallback className="text-xs">
                {selectedWorkspace.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">
              {selectedWorkspace.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search workspace..." />
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup heading="Workspaces">
              {mockWorkspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  onSelect={() => {
                    setSelectedWorkspace(workspace);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    {workspace.logo_url && (
                      <AvatarImage
                        src={workspace.logo_url}
                        alt={workspace.name}
                      />
                    )}
                    <AvatarFallback className="text-xs">
                      {workspace.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 items-center justify-between">
                    <span className="truncate">{workspace.name}</span>
                    {selectedWorkspace.id === workspace.id && (
                      <Check className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  // TODO: Open create workspace dialog
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Workspace
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  // TODO: Navigate to workspace settings
                  window.location.href = "/settings";
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Workspace Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
