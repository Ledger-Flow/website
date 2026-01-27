"use client";

import { Button } from "@/components/ui/button";
import { List, Layers, Table } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "table" | "card" | "list";
  onViewModeChange: (mode: "table" | "card" | "list") => void;
  showCard?: boolean;
  showList?: boolean;
}

export function ViewModeToggle({
  viewMode = "table",
  onViewModeChange,
  showCard = true,
  showList = false,
}: ViewModeToggleProps) {
  return (
    <div className="flex gap-1">
      <Button
        variant={viewMode === "table" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewModeChange("table")}
        className="gap-2"
      >
        <Table className="size-4" />
        Table
      </Button>

      {showCard && (
        <Button
          variant={viewMode === "card" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("card")}
          className="gap-2"
        >
          <Layers className="size-4" />
          Card
        </Button>
      )}

      {showList && (
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("list")}
          className="gap-2"
        >
          <List className="size-4" />
          List
        </Button>
      )}
    </div>
  );
}
