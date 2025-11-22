import * as React from "react"
import { cn } from "@/lib/utils"

interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the spacer
   * @default "4"
   */
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24"
  /**
   * The orientation of the spacer
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal"
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = "4", orientation = "vertical", ...props }, ref) => {
    const sizeClasses = {
      "1": orientation === "vertical" ? "h-1" : "w-1",
      "2": orientation === "vertical" ? "h-2" : "w-2",
      "3": orientation === "vertical" ? "h-3" : "w-3",
      "4": orientation === "vertical" ? "h-4" : "w-4",
      "5": orientation === "vertical" ? "h-5" : "w-5",
      "6": orientation === "vertical" ? "h-6" : "w-6",
      "8": orientation === "vertical" ? "h-8" : "w-8",
      "10": orientation === "vertical" ? "h-10" : "w-10",
      "12": orientation === "vertical" ? "h-12" : "w-12",
      "16": orientation === "vertical" ? "h-16" : "w-16",
      "20": orientation === "vertical" ? "h-20" : "w-20",
      "24": orientation === "vertical" ? "h-24" : "w-24",
    }

    return (
      <div
        ref={ref}
        data-slot="spacer"
        data-orientation={orientation}
        className={cn("shrink-0", sizeClasses[size], className)}
        {...props}
      />
    )
  }
)

Spacer.displayName = "Spacer"

export { Spacer }
