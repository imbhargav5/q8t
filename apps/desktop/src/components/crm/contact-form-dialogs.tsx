
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Edit, Upload } from "lucide-react";
import type { Person } from "@/lib/zod-schemas";

// Add Contact Dialog
interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddContactDialog({ open, onOpenChange }: AddContactDialogProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    job_title: "",
    location: "",
    timezone: "",
    bio: "",
    website_url: "",
    is_vip: false,
    is_verified: false,
  });

  const handleSubmit = () => {
    console.log("Creating contact:", formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      company: "",
      job_title: "",
      location: "",
      timezone: "",
      bio: "",
      website_url: "",
      is_vip: false,
      is_verified: false,
    });
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Create a new contact in your CRM
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] pr-4">
            <TabsContent value="basic" className="space-y-4 mt-4">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {formData.full_name?.substring(0, 2).toUpperCase() || "??"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>

              {/* Basic Fields */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) => updateField("full_name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) => updateField("company", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job_title">Job Title</Label>
                    <Input
                      id="job_title"
                      placeholder="Software Engineer"
                      value={formData.job_title}
                      onChange={(e) => updateField("job_title", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="website_url">Website</Label>
                <Input
                  id="website_url"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website_url}
                  onChange={(e) => updateField("website_url", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => updateField("timezone", value)}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about this contact..."
                  value={formData.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  rows={4}
                />
              </div>

              {/* Flags */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="is_vip">VIP Contact</Label>
                    <p className="text-sm text-muted-foreground">
                      Mark as high-priority contact
                    </p>
                  </div>
                  <Switch
                    id="is_vip"
                    checked={formData.is_vip}
                    onCheckedChange={(checked) => updateField("is_vip", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="is_verified">Verified Contact</Label>
                    <p className="text-sm text-muted-foreground">
                      Email or identity has been verified
                    </p>
                  </div>
                  <Switch
                    id="is_verified"
                    checked={formData.is_verified}
                    onCheckedChange={(checked) => updateField("is_verified", checked)}
                  />
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Edit Contact Dialog
interface EditContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: Person;
}

export function EditContactDialog({ open, onOpenChange, person }: EditContactDialogProps) {
  const [formData, setFormData] = useState({
    full_name: person.full_name || "",
    email: person.email || "",
    phone: person.phone || "",
    company: person.company || "",
    job_title: person.job_title || "",
    location: person.location || "",
    timezone: person.timezone || "",
    bio: person.bio || "",
    website_url: person.website_url || "",
    is_vip: person.is_vip,
    is_verified: person.is_verified,
  });

  const handleSubmit = () => {
    console.log("Updating contact:", { personId: person.id, ...formData });
    onOpenChange(false);
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            Update information for {person.full_name || person.email}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] pr-4">
            <TabsContent value="basic" className="space-y-4 mt-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={person.avatar_url || undefined} />
                  <AvatarFallback className="text-lg">
                    {formData.full_name?.substring(0, 2).toUpperCase() || "??"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              {/* Basic Fields */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_full_name">Full Name *</Label>
                  <Input
                    id="edit_full_name"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) => updateField("full_name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit_email">Email *</Label>
                  <Input
                    id="edit_email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit_phone">Phone</Label>
                  <Input
                    id="edit_phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit_company">Company</Label>
                    <Input
                      id="edit_company"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) => updateField("company", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit_job_title">Job Title</Label>
                    <Input
                      id="edit_job_title"
                      placeholder="Software Engineer"
                      value={formData.job_title}
                      onChange={(e) => updateField("job_title", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit_location">Location</Label>
                  <Input
                    id="edit_location"
                    placeholder="San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="edit_website_url">Website</Label>
                <Input
                  id="edit_website_url"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website_url}
                  onChange={(e) => updateField("website_url", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit_timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => updateField("timezone", value)}
                >
                  <SelectTrigger id="edit_timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit_bio">Bio</Label>
                <Textarea
                  id="edit_bio"
                  placeholder="Tell us about this contact..."
                  value={formData.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  rows={4}
                />
              </div>

              {/* Flags */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="edit_is_vip">VIP Contact</Label>
                    <p className="text-sm text-muted-foreground">
                      Mark as high-priority contact
                    </p>
                  </div>
                  <Switch
                    id="edit_is_vip"
                    checked={formData.is_vip}
                    onCheckedChange={(checked) => updateField("is_vip", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="edit_is_verified">Verified Contact</Label>
                    <p className="text-sm text-muted-foreground">
                      Email or identity has been verified
                    </p>
                  </div>
                  <Switch
                    id="edit_is_verified"
                    checked={formData.is_verified}
                    onCheckedChange={(checked) => updateField("is_verified", checked)}
                  />
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Edit className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Assign To Dialog
interface AssignToDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: Person;
}

export function AssignToDialog({ open, onOpenChange, person }: AssignToDialogProps) {
  const [selectedUser, setSelectedUser] = useState<string>("");

  // Mock team members
  const teamMembers = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: null },
    { id: "2", name: "Bob Smith", email: "bob@example.com", avatar: null },
    { id: "3", name: "Carol Williams", email: "carol@example.com", avatar: null },
    { id: "4", name: "David Brown", email: "david@example.com", avatar: null },
  ];

  const handleAssign = () => {
    console.log("Assigning contact:", { personId: person.id, userId: selectedUser });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Contact</DialogTitle>
          <DialogDescription>
            Assign {person.full_name || person.email} to a team member
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Team Member</Label>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedUser(member.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-secondary transition-colors ${
                    selectedUser === member.id ? "border-primary bg-secondary" : ""
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {member.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                  {selectedUser === member.id && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedUser}>
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
