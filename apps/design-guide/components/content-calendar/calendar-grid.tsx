"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PostWithAuthor } from "@/lib/zod-schemas";
import { CalendarDayCell } from "./calendar-day-cell";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  addMonths,
  subMonths,
} from "date-fns";

interface CalendarGridProps {
  posts: PostWithAuthor[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onAddPost: (date: Date) => void;
  onPostClick: (post: PostWithAuthor) => void;
}

export function CalendarGrid({
  posts,
  currentDate,
  onDateChange,
  onAddPost,
  onPostClick,
}: CalendarGridProps) {
  // Calculate calendar days
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    onDateChange(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex flex-col h-full">
      {/* Calendar header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-2xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b bg-muted/50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 flex-1 overflow-auto group">
        {days.map((day) => (
          <CalendarDayCell
            key={day.toISOString()}
            date={day}
            posts={posts}
            isCurrentMonth={
              day.getMonth() === currentDate.getMonth() &&
              day.getFullYear() === currentDate.getFullYear()
            }
            onAddPost={onAddPost}
            onPostClick={onPostClick}
          />
        ))}
      </div>
    </div>
  );
}
