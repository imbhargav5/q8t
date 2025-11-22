"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Star, ShieldCheck } from "lucide-react";
import type { Person } from "@/lib/zod-schemas";
import { cn } from "@/lib/utils";
import * as Listbox from "@diceui/listbox";

interface PersonListProps {
  people: Person[];
  selectedId?: string;
  onSelect: (person: Person) => void;
  viewMode?: "list" | "grid";
}

export function PersonList({
  people,
  selectedId,
  onSelect,
  viewMode = "list",
}: PersonListProps) {
  if (people.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center text-muted-foreground">
        <div>
          <p className="text-sm">No contacts found</p>
          <p className="text-xs mt-1">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-2">
        <Listbox.Root orientation={viewMode === "grid" ? "horizontal" : "vertical"}>
          <Listbox.Group className={cn(
            viewMode === "grid" && "grid grid-cols-2 gap-2"
          )}>
            {people.map((person) => (
              <Listbox.Item
                key={person.id}
                onClick={() => onSelect(person)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors hover:bg-accent cursor-pointer",
                  selectedId === person.id && "bg-accent"
                )}
              >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={person.avatar_url || undefined} />
                <AvatarFallback>
                  {person.full_name?.substring(0, 2).toUpperCase() || person.email?.substring(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-medium truncate">
                    {person.display_name || person.full_name || person.email}
                  </span>
                  {person.is_vip && (
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                  )}
                  {person.is_verified && (
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                  )}
                </div>

                {person.email && (
                  <div className="text-xs text-muted-foreground truncate mb-1">
                    {person.email}
                  </div>
                )}

                {person.company && (
                  <div className="text-xs text-muted-foreground truncate mb-1">
                    {person.company}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {person.last_contact_at && (
                    <span>
                      {formatDistanceToNow(new Date(person.last_contact_at), {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                  {person.total_messages > 0 && (
                    <>
                      <span>·</span>
                      <span>{person.total_messages} msg</span>
                    </>
                  )}
                </div>

                {person.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {person.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {person.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                        +{person.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
              </Listbox.Item>
            ))}
          </Listbox.Group>
        </Listbox.Root>
      </div>
    </ScrollArea>
  );
}
