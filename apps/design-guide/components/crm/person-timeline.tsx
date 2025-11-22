"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { formatDistanceToNow, format, isToday, isYesterday, isThisWeek } from "date-fns";
import type { Person } from "@/lib/zod-schemas";
import { getTimelineForPerson } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface PersonTimelineProps {
  person: Person;
}

function getDateLabel(date: Date): string {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date)) return format(date, "EEEE"); // Day of week
  return format(date, "MMMM d, yyyy");
}

export function PersonTimeline({ person }: PersonTimelineProps) {
  const timelineItems = getTimelineForPerson(person.id);

  if (timelineItems.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="text-4xl">📅</div>
          <p className="text-muted-foreground">No activity yet</p>
        </div>
      </div>
    );
  }

  // Group items by date
  const groupedItems: Record<string, typeof timelineItems> = {};
  timelineItems.forEach((item) => {
    const date = new Date(item.timestamp);
    const label = getDateLabel(date);
    if (!groupedItems[label]) {
      groupedItems[label] = [];
    }
    groupedItems[label].push(item);
  });

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Activity Timeline</h3>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <ScrollArea className="flex-1">
        <div className="p-6 max-w-4xl">
          {Object.entries(groupedItems).map(([dateLabel, items]) => (
            <div key={dateLabel} className="mb-8">
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px bg-border flex-1" />
                <Badge variant="outline" className="text-xs">
                  {dateLabel}
                </Badge>
                <div className="h-px bg-border flex-1" />
              </div>

              {/* Timeline Items */}
              <div className="space-y-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

                {items.map((item, index) => (
                  <div key={item.id} className="flex gap-4 relative">
                    {/* Icon */}
                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm bg-background border-2 border-border z-10",
                      item.iconColor
                    )}>
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          {item.performedBy && (
                            <div className="text-sm text-muted-foreground">
                              by {item.performedBy.name}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {format(new Date(item.timestamp), "h:mm a")}
                        </div>
                      </div>

                      {/* Activity Data */}
                      {item.data && Object.keys(item.data).length > 0 && (
                        <div className="mt-2 p-3 bg-muted rounded-lg">
                          <div className="text-sm space-y-1">
                            {item.type === "tag_added" && item.data.tags && (
                              <div className="flex flex-wrap gap-1">
                                {(item.data.tags as string[]).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {item.type === "profile_updated" && (
                              <div className="text-xs space-y-1">
                                {Object.entries(item.data).map(([field, change]) => {
                                  const changeObj = change as { old: string; new: string };
                                  return (
                                    <div key={field}>
                                      <span className="font-medium">{field}:</span>{" "}
                                      {changeObj.old ? (
                                        <>
                                          <span className="line-through text-muted-foreground">
                                            {String(changeObj.old)}
                                          </span>
                                          {" → "}
                                        </>
                                      ) : null}
                                      <span>{String(changeObj.new)}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {item.type === "social_identity_added" && (
                              <div className="text-xs">
                                <span className="font-medium">
                                  {String(item.data.platform)}
                                </span>
                                {item.data.username && (
                                  <>
                                    {" · "}
                                    <span>{String(item.data.username)}</span>
                                  </>
                                )}
                              </div>
                            )}

                            {(item.type === "message_sent" || item.type === "message_received") &&
                              item.data.content_preview && (
                                <div className="text-xs italic">
                                  "{String(item.data.content_preview)}"
                                </div>
                              )}

                            {item.type === "conversation_started" && item.data.platform && (
                              <div className="text-xs">
                                via <Badge variant="outline" className="text-xs">
                                  {String(item.data.platform)}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Related Links */}
                      {item.relatedEntities && (
                        <div className="flex gap-2 mt-2">
                          {item.relatedEntities.conversationId && (
                            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                              View conversation →
                            </Button>
                          )}
                          {item.relatedEntities.noteId && (
                            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                              View note →
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
