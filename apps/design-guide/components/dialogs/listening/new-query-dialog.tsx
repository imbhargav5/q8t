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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { Platform } from "@/lib/zod-schemas/enums.schema";

interface NewQueryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateQuery: (query: {
    name: string;
    keywords: string[];
    booleanLogic: string;
    languages: string[];
    platforms: Platform[];
    enableAlerts: boolean;
    alertThreshold?: number;
  }) => void;
}

const platforms: Platform[] = ["twitter", "facebook", "instagram", "linkedin", "youtube"];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
  { code: "ja", name: "Japanese" },
];

const booleanOperators = [
  { value: "AND", label: "AND (all keywords)" },
  { value: "OR", label: "OR (any keyword)" },
  { value: "NOT", label: "NOT (exclude keyword)" },
];

export function NewQueryDialog({
  open,
  onOpenChange,
  onCreateQuery,
}: NewQueryDialogProps) {
  const [name, setName] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [booleanLogic, setBooleanLogic] = useState("AND");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [enableAlerts, setEnableAlerts] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState("50");

  const addKeyword = () => {
    const keyword = keywordInput.trim();
    if (keyword && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const toggleLanguage = (code: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = () => {
    if (!name.trim() || keywords.length === 0) return;

    onCreateQuery({
      name: name.trim(),
      keywords,
      booleanLogic,
      languages: selectedLanguages,
      platforms: selectedPlatforms,
      enableAlerts,
      alertThreshold: enableAlerts ? parseInt(alertThreshold) : undefined,
    });

    // Reset
    setName("");
    setKeywords([]);
    setKeywordInput("");
    setBooleanLogic("AND");
    setSelectedLanguages(["en"]);
    setSelectedPlatforms([]);
    setEnableAlerts(false);
    setAlertThreshold("50");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Listening Query</DialogTitle>
          <DialogDescription>
            Set up a query to monitor conversations and mentions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Query Name */}
          <div className="space-y-2">
            <Label htmlFor="query-name">
              Query Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="query-name"
              placeholder="e.g., Brand Mentions, Competitor Analysis"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords">
              Keywords <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="keywords"
                placeholder="Type a keyword and press Enter"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addKeyword}>
                Add
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="gap-1">
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Boolean Logic */}
          <div className="space-y-2">
            <Label htmlFor="boolean-logic">Boolean Logic</Label>
            <Select value={booleanLogic} onValueChange={setBooleanLogic}>
              <SelectTrigger id="boolean-logic">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {booleanOperators.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              How keywords should be matched in search
            </p>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <div key={lang.code} className="flex items-center gap-2">
                  <Checkbox
                    id={`lang-${lang.code}`}
                    checked={selectedLanguages.includes(lang.code)}
                    onCheckedChange={() => toggleLanguage(lang.code)}
                  />
                  <Label
                    htmlFor={`lang-${lang.code}`}
                    className="cursor-pointer font-normal text-sm"
                  >
                    {lang.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <Label>Platforms to Monitor</Label>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center gap-2">
                  <Checkbox
                    id={`query-platform-${platform}`}
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => togglePlatform(platform)}
                  />
                  <Label
                    htmlFor={`query-platform-${platform}`}
                    className="capitalize cursor-pointer font-normal"
                  >
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Settings */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-alerts" className="cursor-pointer">
                  Enable Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when activity threshold is reached
                </p>
              </div>
              <Switch
                id="enable-alerts"
                checked={enableAlerts}
                onCheckedChange={setEnableAlerts}
              />
            </div>

            {enableAlerts && (
              <div className="space-y-2">
                <Label htmlFor="threshold">Alert Threshold (mentions/hour)</Label>
                <Input
                  id="threshold"
                  type="number"
                  min="1"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || keywords.length === 0}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Query
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
