import { ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, SectionApp, AppHeader, Shape } from "@/components";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  isRowSelected,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import { Button } from "@/components/ui/button"
import { X } from "phosphor-react";


export function MyShipments() {

  return (
    <>
      <SectionApp>
        <AppHeader screenTitle="Solicitações" />
        <DataTableDemo />
      </SectionApp>
    </>
  );
}

const data = [
  {
    id: 1,
    amount: 10,
    status: "recusado",
    data: "10/05/2024",
    "origem/destino": "São Paulo/Rio de Janeiro",
    cancelar: "X"
  },
  {
    id: 2,
    amount: 242,
    status: "aceito",
    data: "27/06/2024",
    "origem/destino": "Belo Horizonte/Curitiba"
  },
  {
    id: 3,
    amount: 837,
    status: "pendente",
    data: "09/06/2024",
    "origem/destino": "Porto Alegre/Salvador"
  },
  {
    id: 4,
    amount: 874,
    status: "recusado",
    data: "18/06/2023",
    "origem/destino": "Brasília/Recife"
  },
  {
    id: 5,
    amount: 721,
    status: "pendente",
    data: "20/06/2024",
    "origem/destino": "Fortaleza/Florianópolis"
  },
];

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "data",
    header: "Data",
    sortingFn: (rowA, rowB, columnId) => {
      function parseDate(dateString) {
        const parts = dateString.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        return new Date(year, month, day);
      }
      rowA = parseDate(rowA.getValue(columnId))
      rowB = parseDate(rowB.getValue(columnId))
      return rowA > rowB ? 1 : rowA < rowB ? -1 : 0
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("data")}</div>
    ),
  },
  {
    accessorKey: "origem/destino",
    header: "Origem/Destino",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("origem/destino")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => (
      <Button
        className="font-bold"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cancelar

      </Button>),
    cell: ({ row }) => {
      return (
        <Button variant="secondary" className="h-8 w-8 p-0 hover:cursor-pointer" onClick={() => console.log(row.id)}>
          <X className={row.getValue("status") == "pendente" ? "capitalize" : "capitalize text-gray-100"} />
        </Button>

      );
    },
  },
];

function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      sorting: [
        {
          id: 'data',
          desc: true,
        },
      ],
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="text-center font-bold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow className="text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {console.log(row)}

                  {row.getVisibleCells().map(cell => (
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <Button
        size="sm"
        onClick={() => console.log(table.getRow)}
      >
        test
      </Button>
    </div>
  );
}

function Modal() {
  const [showAllertModal, setShowAllertModal] = React.useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-3">
      <Shape className="z-2 border border-gray-600 bg-white shadow-lg flex flex-col items-center max-w-md">
        <p className="mb-4 text-lg font-semibold text-red-600">Você realmente deseja cancelar essa
          solicitação??</p>
        <div className="flex flex-row gap-x-10">
          <Button className="bg-red-tx" onClick={() => setShowAllertModal(false)}>
            <ButtonText className="text-white text-center">Sim</ButtonText>
          </Button>
          <Button className="bg-red-tx" onClick={() => setShowAllertModal(false)}>
            <ButtonText className="text-white text-center">Não</ButtonText>
          </Button>
        </div>
      </Shape>
      <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
    </div>
  )
}

