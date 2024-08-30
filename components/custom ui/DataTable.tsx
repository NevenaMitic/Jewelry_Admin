"use client";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// Definisanje interfejsa za DataTable komponentu
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

// DataTable komponenta
export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Inicijalizacija tabele sa potrebnim opcijama
  const table = useReactTable({
    data, // Podaci za tabelu
    columns, // Kolone tabele
    getCoreRowModel: getCoreRowModel(),  // Model za osnovne redove
    onColumnFiltersChange: setColumnFilters, // Funkcija koja se poziva kada se filteri kolona promene
    getPaginationRowModel: getPaginationRowModel(),  // Model za paginaciju
    getFilteredRowModel: getFilteredRowModel(),  // Model za filtrirane redove
    state: {
      columnFilters, // Trenutni filtri kolona
    },
  });

  return (
    <div className="py-5">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {/* Zaglavlja tabele */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {/* Redovi tabele */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}  // Označi red ako je selektovan
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Kontrola za paginaciju */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()} // Funkcija za prelazak na prethodnu stranicu
          disabled={!table.getCanPreviousPage()} // Onemogući dugme ako nema prethodne stranice
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()} // Funkcija za prelazak na sledeću stranicu
          disabled={!table.getCanNextPage()} // Onemogući dugme ako nema sledeće stranice
        >
          Next
        </Button>
      </div>
    </div>
  );
}
