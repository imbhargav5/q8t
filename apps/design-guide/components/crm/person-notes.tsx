"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Pin, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Person } from "@/lib/zod-schemas";
import { getNotesByConversation } from "@/lib/mock-data";

interface PersonNotesProps {
  person: Person;
}

export function PersonNotes({ person }: PersonNotesProps) {
  const [isComposingNote, setIsComposingNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  // For demo, we'll use conversation notes from person's first conversation
  // In a real app, we'd have person notes directly
  const mockPersonNotes = mockConversations
    .filter((c) => c.person_id === person.id)
    .flatMap((c) => getNotesByConversation(c.id))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const pinnedNotes = mockPersonNotes.filter((n) => n.is_pinned);
  const regularNotes = mockPersonNotes.filter((n) => !n.is_pinned);

  const handleAddNote = () => {
    if (!noteContent.trim()) return;
    // In a real app, this would create a note
    console.log("Adding note:", noteContent);
    setNoteContent("");
    setIsComposingNote(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Notes</h3>
          <Button size="sm" onClick={() => setIsComposingNote(!isComposingNote)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6 max-w-4xl">
          {/* Note Composer */}
          {isComposingNote && (
            <Card>
              <CardContent className="p-4">
                <Textarea
                  placeholder="Write a note about this contact..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="min-h-[100px] mb-3"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer">
                      📋 General
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      🔒 Private
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsComposingNote(false)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleAddNote}>
                      Save Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pinned Notes */}
          {pinnedNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Pin className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-semibold text-muted-foreground uppercase">
                  Pinned
                </h4>
              </div>

              <div className="space-y-3">
                {pinnedNotes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={note.author_avatar || undefined} />
                          <AvatarFallback className="text-xs">
                            {note.author_name?.substring(0, 2).toUpperCase() || "??"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {note.author_name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {note.note_type}
                            </Badge>
                            {note.visibility === "private" && (
                              <Lock className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(note.created_at), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                        <Pin className="h-4 w-4 text-amber-500 fill-amber-500" />
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Notes */}
          {regularNotes.length > 0 && (
            <div>
              {pinnedNotes.length > 0 && (
                <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                  All Notes
                </h4>
              )}

              <div className="space-y-3">
                {regularNotes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={note.author_avatar || undefined} />
                          <AvatarFallback className="text-xs">
                            {note.author_name?.substring(0, 2).toUpperCase() || "??"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {note.author_name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {note.note_type}
                            </Badge>
                            {note.visibility === "private" && (
                              <Lock className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(note.created_at), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {mockPersonNotes.length === 0 && !isComposingNote && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-muted-foreground mb-4">No notes yet</p>
              <Button onClick={() => setIsComposingNote(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Note
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// Import mock conversations for the demo
import { mockConversations } from "@/lib/mock-data";
