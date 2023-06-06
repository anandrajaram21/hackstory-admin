"use client";

import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/TeamsTable/data-table-view-options";

import { DataTableFacetedFilter } from "@/components/TeamsTable/data-table-faceted-filter";
import { rounds, submitted, teamSizes } from "./data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter team name"
          value={
            (table.getColumn("teamName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("teamName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("round") && (
          <DataTableFacetedFilter
            column={table.getColumn("round")}
            title="Round"
            options={rounds}
          />
        )}
        {table.getColumn("teamSize") && (
          <DataTableFacetedFilter
            column={table.getColumn("teamSize")}
            title="Size"
            options={teamSizes}
          />
        )}
        {table.getColumn("projectExists") && (
          <DataTableFacetedFilter
            column={table.getColumn("projectExists")}
            title="Project Exists?"
            options={submitted}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
