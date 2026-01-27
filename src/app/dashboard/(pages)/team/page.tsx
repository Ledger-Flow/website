"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, UsersRound } from "lucide-react";
import { ViewModeToggle } from "../../components/ViewModeToggle";
import MembersTable from "./components/MembersTable";
import MembersCard from "./components/MembersCard";
import { useTeam } from "@/context/team-context";
import EmptyState from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceTableSkeleton } from "@/components/shared/DashboardSkeleton";

export default function TeamPage() {
  const { teamMembers, fetchingTeam } = useTeam();
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (fetchingTeam) {
    return (
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-20" />
          </CardHeader>
        </Card>
        <InvoiceTableSkeleton />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <main className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and permissions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Invite Member
        </Button>
      </main>

      {/* Controls */}
      <Card>
        <CardHeader className="px-5">
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={(mode) => setViewMode(mode as "table" | "card")}
              showCard
            />
          </div>
        </CardHeader>
      </Card>

      {filteredMembers.length === 0 ? (
        <EmptyState
          media={<UsersRound />}
          title="No Team Members Found"
          description="Invite your team to collaborate on this project."
        />
      ) : (
        <>
          {/* Content - Table View */}
          {viewMode === "table" && <MembersTable members={filteredMembers} />}
          {/* Content - Card View */}
          {viewMode === "card" && <MembersCard members={filteredMembers} />}
        </>
      )}
    </section>
  );
}
