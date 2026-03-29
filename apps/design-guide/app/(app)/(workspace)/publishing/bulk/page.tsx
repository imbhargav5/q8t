"use client";

import * as React from "react";
import { Upload, FileSpreadsheet, Download, CheckCircle2, XCircle, AlertCircle, ArrowRight, Table } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BulkUploadRow {
  rowNumber: number;
  content: string;
  platforms: string;
  scheduledTime: string;
  media?: string;
  status: "pending" | "valid" | "error";
  errors: string[];
}

export default function BulkUploadPage() {
  const [uploadStep, setUploadStep] = React.useState<"upload" | "map" | "validate" | "confirm">("upload");
  const [fileName, setFileName] = React.useState<string>("");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Mock data for demonstration
  const mockData: BulkUploadRow[] = [
    {
      rowNumber: 1,
      content: "Excited to announce our new product launch! 🚀 Check it out at example.com",
      platforms: "twitter,linkedin",
      scheduledTime: "2024-02-15 10:00",
      media: "https://example.com/image1.jpg",
      status: "valid",
      errors: [],
    },
    {
      rowNumber: 2,
      content: "Join us for a live webinar on digital marketing trends. Register now!",
      platforms: "facebook,instagram",
      scheduledTime: "2024-02-16 14:30",
      status: "valid",
      errors: [],
    },
    {
      rowNumber: 3,
      content: "Flash sale ending tonight!",
      platforms: "twitter",
      scheduledTime: "2024-02-17 18:00",
      status: "error",
      errors: ["Content too short (must be at least 20 characters)", "Missing media for Instagram"],
    },
    {
      rowNumber: 4,
      content: "Happy Monday! Here's your weekly motivation to crush your goals 💪 #MondayMotivation",
      platforms: "instagram,twitter,facebook",
      scheduledTime: "2024-02-19 08:00",
      media: "https://example.com/quote.jpg",
      status: "valid",
      errors: [],
    },
    {
      rowNumber: 5,
      content: "Behind the scenes at our office! Check out how we're building the future of social media management.",
      platforms: "linkedin",
      scheduledTime: "invalid-date",
      status: "error",
      errors: ["Invalid date format (use YYYY-MM-DD HH:MM)"],
    },
  ];

  const validRows = mockData.filter((row) => row.status === "valid");
  const errorRows = mockData.filter((row) => row.status === "error");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsProcessing(true);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setUploadStep("map");
          }, 500);
        }
      }, 200);
    }
  };

  const downloadTemplate = () => {
    // In a real app, this would trigger a CSV download
    const csvContent = `Content,Platforms,Scheduled Time,Media URL,Tags
"Your post content here","twitter,linkedin","2024-02-15 10:00","https://example.com/image.jpg","tag1,tag2"
"Another post","instagram,facebook","2024-02-16 14:30","","marketing"`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-upload-template.csv';
    a.click();
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Upload className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Bulk Upload</h1>
          </div>
          <p className="text-muted-foreground">
            Upload multiple posts at once using CSV or Excel files
          </p>
        </div>
        <Button variant="outline" onClick={downloadTemplate}>
          <Download className="mr-2 h-4 w-4" />
          Download Template
        </Button>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  uploadStep === "upload" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                1
              </div>
              <span className={uploadStep === "upload" ? "font-semibold" : "text-muted-foreground"}>
                Upload File
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  uploadStep === "map" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                2
              </div>
              <span className={uploadStep === "map" ? "font-semibold" : "text-muted-foreground"}>
                Map Columns
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  uploadStep === "validate" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                3
              </div>
              <span className={uploadStep === "validate" ? "font-semibold" : "text-muted-foreground"}>
                Validate Data
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  uploadStep === "confirm" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                4
              </div>
              <span className={uploadStep === "confirm" ? "font-semibold" : "text-muted-foreground"}>
                Confirm & Schedule
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Step */}
      {uploadStep === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Your File</CardTitle>
            <CardDescription>
              Support for CSV and Excel (.xlsx) files with up to 1000 rows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-12">
              <FileSpreadsheet className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <h3 className="mb-2 font-semibold">Drag and drop your file here</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  or click to browse from your computer
                </p>
                <Input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </label>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum file size: 10MB • Supported formats: CSV, XLSX, XLS
              </p>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{fileName}</span>
                  <span className="text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold">File Format Guidelines</h4>
              <div className="grid gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                  <div>
                    <strong>Required columns:</strong> Content, Platforms, Scheduled Time
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                  <div>
                    <strong>Optional columns:</strong> Media URL, Tags, Hashtags
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                  <div>
                    <strong>Date format:</strong> YYYY-MM-DD HH:MM (e.g., 2024-02-15 10:30)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                  <div>
                    <strong>Platforms:</strong> Comma-separated (twitter,linkedin,facebook)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Columns Step */}
      {uploadStep === "map" && (
        <Card>
          <CardHeader>
            <CardTitle>Map Your Columns</CardTitle>
            <CardDescription>
              Match your file columns to our system fields
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>File Column</Label>
                  <Input value="Content" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Maps To</Label>
                  <Select defaultValue="content">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content">Post Content</SelectItem>
                      <SelectItem value="caption">Caption</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>File Column</Label>
                  <Input value="Platforms" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Maps To</Label>
                  <Select defaultValue="platforms">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="platforms">Platforms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>File Column</Label>
                  <Input value="Scheduled Time" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Maps To</Label>
                  <Select defaultValue="scheduled_at">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled_at">Scheduled Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>File Column</Label>
                  <Input value="Media URL" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Maps To</Label>
                  <Select defaultValue="media">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="media">Media URL</SelectItem>
                      <SelectItem value="skip">Skip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadStep("upload")}>
                Back
              </Button>
              <Button onClick={() => setUploadStep("validate")}>
                Continue to Validation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validate Step */}
      {uploadStep === "validate" && (
        <>
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Rows</CardTitle>
                <Table className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.length}</div>
                <p className="text-xs text-muted-foreground">Processed from file</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valid Posts</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{validRows.length}</div>
                <p className="text-xs text-muted-foreground">Ready to schedule</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Errors</CardTitle>
                <XCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{errorRows.length}</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Data Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Validation Results</CardTitle>
              <CardDescription>
                Review and fix any errors before scheduling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">
                    All Rows
                    <Badge variant="secondary" className="ml-2">
                      {mockData.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="valid">
                    Valid
                    <Badge variant="secondary" className="ml-2">
                      {validRows.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="errors">
                    Errors
                    <Badge variant="destructive" className="ml-2">
                      {errorRows.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <ScrollArea className="h-[400px] rounded-md border">
                    <TableComponent>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Content</TableHead>
                          <TableHead>Platforms</TableHead>
                          <TableHead>Scheduled</TableHead>
                          <TableHead className="w-24">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockData.map((row) => (
                          <TableRow key={row.rowNumber}>
                            <TableCell>{row.rowNumber}</TableCell>
                            <TableCell className="max-w-md">
                              <div className="line-clamp-2 text-sm">{row.content}</div>
                              {row.errors.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {row.errors.map((error, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-destructive">
                                      <AlertCircle className="h-3 w-3" />
                                      {error}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {row.platforms.split(",").map((platform) => (
                                  <Badge key={platform} variant="outline">
                                    {platform}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{row.scheduledTime}</TableCell>
                            <TableCell>
                              {row.status === "valid" ? (
                                <Badge variant="default" className="bg-green-600">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  Valid
                                </Badge>
                              ) : (
                                <Badge variant="destructive">
                                  <XCircle className="mr-1 h-3 w-3" />
                                  Error
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableComponent>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="valid" className="space-y-4">
                  <ScrollArea className="h-[400px] rounded-md border">
                    <TableComponent>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Content</TableHead>
                          <TableHead>Platforms</TableHead>
                          <TableHead>Scheduled</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {validRows.map((row) => (
                          <TableRow key={row.rowNumber}>
                            <TableCell>{row.rowNumber}</TableCell>
                            <TableCell className="max-w-md line-clamp-2 text-sm">
                              {row.content}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {row.platforms.split(",").map((platform) => (
                                  <Badge key={platform} variant="outline">
                                    {platform}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{row.scheduledTime}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableComponent>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="errors" className="space-y-4">
                  <ScrollArea className="h-[400px] rounded-md border">
                    <TableComponent>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Content</TableHead>
                          <TableHead>Errors</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {errorRows.map((row) => (
                          <TableRow key={row.rowNumber}>
                            <TableCell>{row.rowNumber}</TableCell>
                            <TableCell className="max-w-md text-sm">{row.content}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {row.errors.map((error, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-destructive">
                                    <AlertCircle className="h-3 w-3" />
                                    {error}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableComponent>
                  </ScrollArea>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setUploadStep("map")}>
                  Back
                </Button>
                <Button onClick={() => setUploadStep("confirm")} disabled={errorRows.length > 0}>
                  {errorRows.length > 0 ? "Fix Errors to Continue" : "Continue to Confirm"}
                  {errorRows.length === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Confirm Step */}
      {uploadStep === "confirm" && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm & Schedule</CardTitle>
            <CardDescription>
              Review your posts before scheduling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-6 text-center">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
              <h3 className="mb-2 text-lg font-semibold">Ready to Schedule</h3>
              <p className="text-sm text-muted-foreground">
                {validRows.length} posts are ready to be scheduled across multiple platforms
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold">Summary</h4>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total posts:</span>
                  <span className="font-medium">{validRows.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date range:</span>
                  <span className="font-medium">Feb 15 - Feb 19, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platforms:</span>
                  <span className="font-medium">Twitter, LinkedIn, Instagram, Facebook</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadStep("validate")}>
                Back
              </Button>
              <Button size="lg">
                <Upload className="mr-2 h-4 w-4" />
                Schedule {validRows.length} Posts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
