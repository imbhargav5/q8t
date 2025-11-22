"use client";

import { useState } from "react";
import { PersonList } from "@/components/crm/person-list";
import { PersonDetail } from "@/components/crm/person-detail";
import { PersonSidebar } from "@/components/crm/person-sidebar";
import { FilterSidebar } from "@/components/crm/filter-sidebar";
import { RightSidebarContainer } from "@/components/layout/right-sidebar-container";
import { AddContactDialog } from "@/components/crm/contact-form-dialogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { mockPeople } from "@/lib/mock-data";
import type { Person } from "@/lib/zod-schemas";

export default function CRMPage() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFilters, setShowFilters] = useState(true);
  const [addContactOpen, setAddContactOpen] = useState(false);

  // Filter people based on search query
  const filteredPeople = mockPeople.filter((person) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      person.full_name?.toLowerCase().includes(query) ||
      person.email?.toLowerCase().includes(query) ||
      person.company?.toLowerCase().includes(query) ||
      person.display_name?.toLowerCase().includes(query) ||
      person.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex h-full">
      {/* Left Panel - People List */}
      <div className="w-80 border-r bg-background flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">
              CRM
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {filteredPeople.length}
              </span>
            </h2>
            <Button size="sm" onClick={() => setAddContactOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            <Button
              variant={showFilters ? "secondary" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            >
              {viewMode === "list" ? (
                <LayoutGrid className="h-4 w-4" />
              ) : (
                <LayoutList className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Filter Sidebar */}
        {showFilters && <FilterSidebar />}

        {/* People List */}
        <PersonList
          people={filteredPeople}
          selectedId={selectedPerson?.id}
          onSelect={setSelectedPerson}
          viewMode={viewMode}
        />
      </div>

      {/* Center Panel - Person Detail */}
      <div className="flex-1 flex flex-col">
        {selectedPerson ? (
          <PersonDetail person={selectedPerson} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-4">
              <div className="text-6xl">👥</div>
              <p className="text-lg">Select a contact to view details</p>
              <Button onClick={() => setAddContactOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Contact
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Context Panel */}
      <RightSidebarContainer>
        {selectedPerson ? (
          <PersonSidebar person={selectedPerson} />
        ) : (
          <div className="p-4">
            <h3 className="font-semibold mb-2">Quick Stats</h3>
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">{mockPeople.length}</div>
                <div className="text-sm text-muted-foreground">Total Contacts</div>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">
                  {mockPeople.filter((p) => p.is_vip).length}
                </div>
                <div className="text-sm text-muted-foreground">VIP Contacts</div>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">
                  {mockPeople.filter((p) => p.is_verified).length}
                </div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </div>
            </div>
          </div>
        )}
      </RightSidebarContainer>

      {/* Dialogs */}
      <AddContactDialog open={addContactOpen} onOpenChange={setAddContactOpen} />
    </div>
  );
}
