"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MiniCalendarContextValue {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
}

const MiniCalendarContext = React.createContext<
  MiniCalendarContextValue | undefined
>(undefined);

function useMiniCalendar() {
  const context = React.useContext(MiniCalendarContext);
  if (!context) {
    throw new Error("Mini calendar components must be used within MiniCalendar");
  }
  return context;
}

interface MiniCalendarProps {
  children: React.ReactNode;
  defaultDate?: Date;
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  className?: string;
}

export function MiniCalendar({
  children,
  defaultDate = new Date(),
  selectedDate,
  onSelectDate,
  className,
}: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(defaultDate);

  return (
    <MiniCalendarContext.Provider
      value={{ currentDate, setCurrentDate, selectedDate, onSelectDate }}
    >
      <div className={cn("w-full", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="flex gap-1">{children}</div>
        </div>
      </div>
    </MiniCalendarContext.Provider>
  );
}

interface MiniCalendarNavigationProps {
  direction: "prev" | "next";
  className?: string;
}

export function MiniCalendarNavigation({
  direction,
  className,
}: MiniCalendarNavigationProps) {
  const { currentDate, setCurrentDate } = useMiniCalendar();

  const navigate = () => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={navigate}
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
      <span className="sr-only">
        {direction === "prev" ? "Previous month" : "Next month"}
      </span>
    </Button>
  );
}

interface MiniCalendarDaysProps {
  children: (date: Date) => React.ReactNode;
  className?: string;
}

export function MiniCalendarDays({
  children,
  className,
}: MiniCalendarDaysProps) {
  const { currentDate } = useMiniCalendar();

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: Date[] = [];

    // Add padding days from previous month
    const startDay = firstDay.getDay();
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(date);
    }

    // Add current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add padding days from next month
    const endDay = lastDay.getDay();
    for (let i = 1; i < 7 - endDay; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const days = getDaysInMonth();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-xs text-center font-medium text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days.map(children)}</div>
    </div>
  );
}

interface MiniCalendarDayProps {
  date: Date;
  className?: string;
}

export function MiniCalendarDay({ date, className }: MiniCalendarDayProps) {
  const { currentDate, selectedDate, onSelectDate } = useMiniCalendar();

  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
  const isToday =
    date.toDateString() === new Date().toDateString();
  const isSelected =
    selectedDate && date.toDateString() === selectedDate.toDateString();

  const handleClick = () => {
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "h-8 w-8 text-xs rounded-md flex items-center justify-center transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        !isCurrentMonth && "text-muted-foreground opacity-50",
        isToday && "bg-primary text-primary-foreground font-semibold",
        isSelected && !isToday && "bg-accent",
        className
      )}
    >
      {date.getDate()}
    </button>
  );
}
