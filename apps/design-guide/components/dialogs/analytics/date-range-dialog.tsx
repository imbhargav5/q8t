"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface DateRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (range: DateRange | undefined, compareToPrevious: boolean) => void;
  currentRange?: DateRange;
}

const quickOptions = [
  { label: "Today", days: 0 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "This month", days: -1 },
  { label: "Last month", days: -2 },
];

export function DateRangeDialog({
  open,
  onOpenChange,
  onApply,
  currentRange,
}: DateRangeDialogProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    currentRange
  );
  const [compareToPrevious, setCompareToPrevious] = useState(false);

  const handleQuickOption = (days: number) => {
    const today = new Date();
    let from: Date;
    let to: Date = today;

    if (days === 0) {
      // Today
      from = today;
    } else if (days === -1) {
      // This month
      from = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (days === -2) {
      // Last month
      from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      to = new Date(today.getFullYear(), today.getMonth(), 0);
    } else {
      // Last N days
      from = new Date(today);
      from.setDate(today.getDate() - days);
    }

    setDateRange({ from, to });
  };

  const handleApply = () => {
    onApply(dateRange, compareToPrevious);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
          <DialogDescription>
            Choose a date range for your analytics data
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4">
          {/* Quick Options */}
          <div className="space-y-3">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-2 gap-2">
              {quickOptions.map((option) => (
                <Button
                  key={option.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickOption(option.days)}
                  className="justify-start"
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Date Range Display */}
            <div className="mt-6 space-y-2">
              <Label>Selected Range</Label>
              <div className="rounded-md border p-3 text-sm">
                {dateRange?.from ? (
                  <>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(dateRange.from, "MMM dd, yyyy")}
                        {dateRange.to &&
                          ` - ${format(dateRange.to, "MMM dd, yyyy")}`}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-muted-foreground">No range selected</span>
                )}
              </div>
            </div>

            {/* Compare Option */}
            <div className="flex items-center gap-2 pt-4">
              <Checkbox
                id="compare"
                checked={compareToPrevious}
                onCheckedChange={(checked) =>
                  setCompareToPrevious(checked as boolean)
                }
              />
              <Label htmlFor="compare" className="cursor-pointer font-normal">
                Compare to previous period
              </Label>
            </div>
          </div>

          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              className="rounded-md border"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={!dateRange?.from}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
