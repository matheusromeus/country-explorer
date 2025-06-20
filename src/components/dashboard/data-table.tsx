"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Country } from "@/types/countries";
import FavoriteButton from "@/components/buttons/favourite";

export const columns: ColumnDef<Country>[] = [
  {
    accessorKey: "name",
    header: "Country",
    size: 250,
    cell: ({ row }) => {
      const name = row.getValue("name") as { common: string };
      const country = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={country.flags.svg}
            alt={`Flag of ${name.common}`}
            width={24}
            height={16}
            className="rounded-sm object-cover"
          />
          <span className="capitalize">{name.common}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const name = row.getValue(id) as { common: string };
      return name.common.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3"
        >
          Region
          <ArrowUpDown />
        </Button>
      );
    },
    size: 150,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("region")}</div>
    ),
  },
  {
    accessorKey: "population",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3"
        >
          Population
          <ArrowUpDown />
        </Button>
      );
    },
    size: 150,
    cell: ({ row }) => {
      const population = row.getValue("population") as number;
      const formatted = new Intl.NumberFormat("en-US").format(population);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "capital",
    header: () => <div className="text-left">Capital</div>,
    size: 150,
    cell: ({ row }) => {
      const capital = row.getValue("capital") as string[] | undefined;
      return <div className="text-left">{capital?.[0] || "N/A"}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Favorite</div>,
    enableHiding: false,
    size: 100,
    cell: ({ row }) => {
      const country = row.original;
      return (
        <div className="flex justify-center">
          <FavoriteButton code={country.cca2} />
        </div>
      );
    },
  },
];

export function DataTable({ countries }: { countries: Country[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRegion, setSelectedRegion] = React.useState<string>("all");

  // Get unique regions from countries data
  const regions = React.useMemo(() => {
    const uniqueRegions = Array.from(
      new Set(countries.map((country) => country.region))
    );
    return uniqueRegions.sort();
  }, [countries]);

  // Filter countries by selected region
  const filteredCountries = React.useMemo(() => {
    if (selectedRegion === "all") {
      return countries;
    }
    return countries.filter((country) => country.region === selectedRegion);
  }, [countries, selectedRegion]);

  const table = useReactTable({
    data: filteredCountries,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableColumnResizing: false,
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-5 border rounded-lg">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter countries..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {selectedRegion === "all" ? "All Regions" : selectedRegion}{" "}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={selectedRegion === "all"}
              onCheckedChange={() => setSelectedRegion("all")}
            >
              All Regions
            </DropdownMenuCheckboxItem>
            {regions.map((region) => (
              <DropdownMenuCheckboxItem
                key={region}
                checked={selectedRegion === region}
                onCheckedChange={() => setSelectedRegion(region)}
              >
                {region}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md">
        <div>
          <Table className="table-fixed w-full">
            <TableHeader className="sticky top-0 bg-background z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          width: header.getSize(),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          -{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer"
          >
            <ChevronLeft className="cursor-pointer" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer"
          >
            <ChevronRight className="cursor-pointer" />
          </Button>
        </div>
      </div>
    </div>
  );
}
