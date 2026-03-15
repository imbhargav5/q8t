
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Clock,
  Send,
  Save,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { SocialPlatform } from "@/lib/zod-schemas";
import { BEST_TIME_SUGGESTIONS } from "@/lib/compose/constants";

interface SchedulingPanelProps {
  scheduledDate: string | null;
  scheduledTime: string | null;
  onScheduledDateChange: (date: string | null) => void;
  onScheduledTimeChange: (time: string | null) => void;
  selectedPlatforms: SocialPlatform[];
}

type PublishMode = "now" | "schedule" | "draft" | "queue";

export function SchedulingPanel({
  scheduledDate,
  scheduledTime,
  onScheduledDateChange,
  onScheduledTimeChange,
  selectedPlatforms,
}: SchedulingPanelProps) {
  const [publishMode, setPublishMode] = useState<PublishMode>("schedule");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    scheduledDate ? new Date(scheduledDate) : undefined
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onScheduledDateChange(date ? format(date, "yyyy-MM-dd") : null);
  };

  const handleTimeChange = (time: string) => {
    onScheduledTimeChange(time);
  };

  const applyBestTime = (day: string, time: string) => {
    // Find next occurrence of this day
    const today = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const targetDay = daysOfWeek.indexOf(day);

    if (targetDay === -1) {
      // "Any day" or "Weekdays" - use tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      handleDateSelect(tomorrow);
    } else {
      const daysUntilTarget =
        (targetDay + 7 - today.getDay()) % 7 || 7;
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + daysUntilTarget);
      handleDateSelect(nextDate);
    }

    // Parse and set time (e.g., "12:00 PM" -> "12:00")
    const timeParts = time.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (timeParts) {
      let hours = parseInt(timeParts[1]);
      const minutes = timeParts[2];
      const period = timeParts[3]?.toUpperCase();

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      handleTimeChange(`${hours.toString().padStart(2, "0")}:${minutes}`);
    }
  };

  // Get best time suggestions for selected platforms
  const bestTimeSuggestions =
    selectedPlatforms.length > 0
      ? BEST_TIME_SUGGESTIONS[selectedPlatforms[0]] || []
      : [];

  return (
    <div className="space-y-4">
      <Label className="text-base">Publishing Options</Label>

      <RadioGroup value={publishMode} onValueChange={(v) => setPublishMode(v as PublishMode)}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="now" id="publish-now" />
            <Label htmlFor="publish-now" className="font-normal cursor-pointer flex items-center gap-2">
              <Send className="h-4 w-4" />
              Publish Now
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="schedule" id="publish-schedule" />
            <Label htmlFor="publish-schedule" className="font-normal cursor-pointer flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Schedule for Later
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="draft" id="publish-draft" />
            <Label htmlFor="publish-draft" className="font-normal cursor-pointer flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save as Draft
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="queue" id="publish-queue" />
            <Label htmlFor="publish-queue" className="font-normal cursor-pointer flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Add to Queue
            </Label>
          </div>
        </div>
      </RadioGroup>

      {publishMode === "schedule" && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={scheduledTime || "09:00"}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Best time suggestions */}
          {bestTimeSuggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                Best time to post
              </div>
              <div className="grid gap-2">
                {bestTimeSuggestions.map((suggestion, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() =>
                      applyBestTime(suggestion.day, suggestion.time)
                    }
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {suggestion.day} at {suggestion.time}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {suggestion.reason}
                        </span>
                      </div>
                      <Badge variant="secondary">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {publishMode === "queue" && (
        <div className="text-sm text-muted-foreground pt-2">
          Post will be added to your content queue and published automatically
          based on your queue settings.
        </div>
      )}

      {publishMode === "draft" && (
        <div className="text-sm text-muted-foreground pt-2">
          Post will be saved as a draft. You can publish it later from the
          content calendar.
        </div>
      )}
    </div>
  );
}
