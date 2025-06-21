import { ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, SectionApp, AppHeader, Shape, Modal, ModalConfirm } from "@/components";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, TriangleAlertIcon } from "lucide-react";

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
import { Warning, X } from "phosphor-react";

export function MyShipments() {  
  localStorage.setItem("solicitacoes", JSON.stringify(data));
  
  return (
    <>
      <SectionApp>
        <AppHeader screenTitle="Solicitações" />
        <DataTableDemo />
        {/* {showAllertModal && <Modal modalHandler={setShowAllertModal} />} */}
        <Modal status={false} />
      </SectionApp>
    </>
  );
}

const data = [
  {
    id: 1,
    status: "recusado",
    data: "10/05/2024",
    origem: "Rio de Janeiro",
    destino: "São Paulo",
    cancelar: "X"
  },
  {
    id: 2,
    status: "aceito",
    data: "27/06/2024",
    origem: "Curitiba",
    destino: "Belo Horizonte"
  },
  {
    id: 3,
    status: "pendente",
    data: "09/06/2024",
    origem: "Salvador",
    destino: "Porto Alegre",
  },
  {
    id: 4,
    status: "recusado",
    data: "18/06/2023",
    origem: "Reci ",
    destino: "Brasília",
  },
  {
    id: 5,
    status: "pendente",
    data: "20/06/2024",
    origem: "Florianópolis",
    destino: "Fortaleza",
  },
  {
    id: 6,
    status: "aceito",
    data: "02/07/2024",
    origem: "Manaus",
    destino: "Belém",
  },
  {
    id: 7,
    status: "pendente",
    data: "15/07/2024",
    origem: "Goiânia",
    destino: "Natal",
  },
  {
    id: 8,
    status: "recusado",
    data: "28/05/2024",
    origem: "Campo Grande",
    destino: "João Pessoa",
  },
  {
    id: 9,
    status: "aceito",
    data: "05/06/2025",
    origem: "Vitória",
    destino: "Maceió",
  }
];

const getColumns = ({ onCancelClick }) => [
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
    accessorKey: "origem",
    header: "Origem/Destino",
    cell: ({ row }) => (
        <div className="capitalize">
          {
            JSON.parse(localStorage.getItem("solicitacoes"))[row.index].origem +
            "/" +
            JSON.parse(localStorage.getItem("solicitacoes"))[row.index].destino
          }
        </div>
        //   <div className="capitalize">{row.getValue("origem")}</div>

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
        <Button variant="secondary" className="h-8 w-8 p-0 hover:cursor-pointer"  onClick={() => {onCancelClick(row.original)}
          // console.log(row.index);
          // row.toggleSelected();  
          // sessionStorage.setItem("id", row.index);
          // row.getToggleSelectedHandler();
          // Modal(true , row.index);
          }>
            
          <X className={row.getValue("status") == "pendente" ? "capitalize" : "capitalize text-gray-100"} />
        </Button>

      );
    },
  },
];

function DataTableDemo({ modalHandler }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);

  const columns = getColumns({
    onCancelClick: setSelectedRow
  })

  const [tableData, setTableData] = React.useState(
    () => JSON.parse(localStorage.getItem("solicitacoes")) || []
  );

  const handleCancel = () => {
    if (!selectedRow) return;

    const stored = JSON.parse(localStorage.getItem("solicitacoes")) || [];
    const updated = stored.filter(item => item.id !== selectedRow.id); 

    localStorage.setItem("solicitacoes", JSON.stringify(updated));
    setTableData(updated); 
    setSelectedRow(null);  
  };

const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
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
        
      <ModalConfirm
        message="Você realmente deseja cancelar esta solicitação?"
        open={!!selectedRow}
        actionWord="Cancelar"
        action={() => handleCancel()}
        onClose={() => setSelectedRow(null)}
      />
      </div>
      <Button
        size="sm"
        onClick={() => localStorage.setItem("solicitacoes", JSON.stringify(data))}
      >
        test
      </Button>
    </div>
  );
}
