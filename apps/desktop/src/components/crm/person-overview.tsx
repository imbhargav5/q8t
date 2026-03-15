
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe, MapPin, Clock, Calendar, MessageSquare, ExternalLink } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import type { Person } from "@/lib/zod-schemas";

interface PersonOverviewProps {
  person: Person;
}

export function PersonOverview({ person }: PersonOverviewProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-4xl">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Primary contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {person.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{person.email}</span>
              </div>
            )}
            {person.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{person.phone}</span>
              </div>
            )}
            {person.website_url && (
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={person.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  {person.website_url}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
            {person.location && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{person.location}</span>
              </div>
            )}
            {person.timezone && (
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{person.timezone}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Professional Information */}
        {(person.company || person.job_title || person.bio) && (
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {person.company && (
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">
                    Company
                  </div>
                  <div className="text-sm">{person.company}</div>
                </div>
              )}
              {person.job_title && (
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">
                    Job Title
                  </div>
                  <div className="text-sm">{person.job_title}</div>
                </div>
              )}
              {person.bio && (
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">
                    Bio
                  </div>
                  <div className="text-sm">{person.bio}</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Engagement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">{person.total_messages}</div>
                <div className="text-sm text-muted-foreground">Total Messages</div>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">{person.total_conversations}</div>
                <div className="text-sm text-muted-foreground">Conversations</div>
              </div>
              {person.first_contact_at && (
                <div className="p-3 bg-secondary rounded-lg">
                  <div className="text-sm font-medium">First Contact</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {format(new Date(person.first_contact_at), "PPP")}
                  </div>
                </div>
              )}
              {person.last_contact_at && (
                <div className="p-3 bg-secondary rounded-lg">
                  <div className="text-sm font-medium">Last Contact</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(person.last_contact_at), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tags & Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Tags & Segments</CardTitle>
          </CardHeader>
          <CardContent>
            {person.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {person.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                <Button variant="outline" size="sm">
                  + Add Tag
                </Button>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No tags yet. <Button variant="link" size="sm" className="p-0 h-auto">Add tags</Button> to organize this contact.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Custom Fields (placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Fields</CardTitle>
            <CardDescription>Workspace-specific contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              No custom fields configured
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
