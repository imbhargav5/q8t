
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, ChevronRight } from "lucide-react";
import { AI_ACTIONS, AI_TONES } from "@/lib/compose/constants";
import { toast } from "sonner";

interface AIControlsProps {
  onAction?: (actionId: string, options?: any) => void;
  disabled?: boolean;
}

export function AIControls({ onAction, disabled }: AIControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (actionId: string, tone?: string) => {
    // Show toast notification (since we don't have real AI)
    const action = AI_ACTIONS.find((a) => a.id === actionId);
    if (action) {
      if (tone) {
        toast.info(`AI Assistant`, {
          description: `${action.label} with ${tone} tone (Coming soon!)`,
        });
      } else {
        toast.info(`AI Assistant`, {
          description: `${action.label} (Coming soon!)`,
        });
      }
    }

    if (onAction) {
      onAction(actionId, tone ? { tone } : undefined);
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          AI Assistant
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>AI Writing Tools</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {AI_ACTIONS.map((action) => {
          if (action.id === "rewrite" && action.hasSubMenu) {
            return (
              <DropdownMenuSub key={action.id}>
                <DropdownMenuSubTrigger>
                  <span className="mr-2">{action.icon}</span>
                  <div className="flex flex-col items-start">
                    <span>{action.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {action.description}
                    </span>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>Select Tone</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {AI_TONES.map((tone) => (
                    <DropdownMenuItem
                      key={tone.value}
                      onClick={() => handleAction(action.id, tone.value)}
                    >
                      <span className="mr-2">{tone.icon}</span>
                      {tone.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          }

          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleAction(action.id)}
            >
              <span className="mr-2">{action.icon}</span>
              <div className="flex flex-col items-start">
                <span>{action.label}</span>
                <span className="text-xs text-muted-foreground">
                  {action.description}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
