import { getCurrentWindow } from "@tauri-apps/api/window"
import { Minus, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WindowControls() {
  const appWindow = getCurrentWindow()

  return (
    <div className="flex items-center gap-1 mr-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full hover:bg-muted"
        onClick={() => appWindow.minimize()}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full hover:bg-muted"
        onClick={() => appWindow.toggleMaximize()}
      >
        <Square className="h-2.5 w-2.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
        onClick={() => appWindow.close()}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}
