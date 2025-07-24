import { ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, SectionApp, AppHeader, Shape, Modal, ModalConfirm } from "@/components";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
import { setInfo, getInfo, updateInfo, getOriginDestiny } from "@/services/shipments";
import { useIsMobile } from "@/hooks/use-mobile" 

export function MyShipments() {  
  getInfo() ?? setInfo();
  
  return (
    <>
      <SectionApp>
        <AppHeader screenTitle="Solicitações" />
        <DataTableDemo />
        <Modal status={false} />
      </SectionApp>
    </>
  );
}

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
        <div className="capitalize">{getOriginDestiny(row.index)}</div>
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
    header: "Cancelar",
    cell: ({ row }) => {
      return (
        <Button variant="secondary" className={`h-8 w-8 p-0 ${row.getValue('status') == 'pendente' ? ' hover:cursor-pointer' : 'capitalize text-gray-100 cursor-default'}`}  onClick={() => 
          {
            if(row.getValue("status") == "pendente")
             onCancelClick(row.original)
          }}>
          <X/>
        </Button>
      );
    },
  },
];

function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [tableData, setTableData] = React.useState(getInfo());
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const isMobile = useIsMobile()

  React.useEffect(() => {
      setColumnVisibility({
        id: !isMobile,
        origem: !isMobile,
      })
    }, [isMobile])

  const columns = getColumns({
    onCancelClick: setSelectedRow
  })

  const handleCancel = () => {
    if (!selectedRow) return;

    setTableData(updateInfo(selectedRow.id)); 
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
    <div className="w-full pt-5">
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
      <ModalConfirm
        message="Você realmente deseja cancelar esta solicitação?"
        open={!!selectedRow}
        options={["Não", "Sim"]}
        action={() => handleCancel()}
        onClose={() => setSelectedRow(null)}
      />
      </div>
    </div>
  );
}