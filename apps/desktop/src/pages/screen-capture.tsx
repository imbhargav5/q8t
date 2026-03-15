import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Monitor, Square } from "lucide-react"

export function ScreenCapturePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h1 className="text-2xl font-semibold">Screen Capture</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Capture screenshots and record your screen
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Screenshot
            </CardTitle>
            <CardDescription>Capture a screenshot of your screen</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Take Screenshot</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Record Screen
            </CardTitle>
            <CardDescription>Record your entire screen</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Recording</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Square className="h-5 w-5" />
              Record Region
            </CardTitle>
            <CardDescription>Record a selected region</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Select Region</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
