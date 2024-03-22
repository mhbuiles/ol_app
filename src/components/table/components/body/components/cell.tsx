import TableCell from "@mui/material/TableCell";
import { Typography } from "@components/typography";

type BaseColumn<TData extends Record<string, unknown>> = {
  accessor: keyof TData;
  header: string;
} & Partial<{
  width: string;
  minWidth: string;
  maxWidth: string;
  sortable: boolean;
}>;

type TypedColumn<TData extends Record<string, unknown>> = BaseColumn<TData> &
  Partial<{
    type: "date";
    cell: never;
    align: never;
  }>;

type UntypedColumn<TData extends Record<string, unknown>> = BaseColumn<TData> &
  Partial<{
    type: never;
    cell: (row: TData) => React.ReactNode;
    align: "left" | "center" | "right";
  }>;

type Column<TData extends Record<string, unknown>> =
  | TypedColumn<TData>
  | UntypedColumn<TData>;

type CellProps<TData extends Record<string, unknown>> = {
  data: TData;
  column: Column<TData>;
};

const Cell = <TData extends Record<string, unknown>>({
  data,
  column,
}: CellProps<TData>): React.ReactElement => (
  <TableCell
    align={column.type === "date" ? "right" : column.align}
    sx={{
      border: "none",
      ...(column.minWidth && {
        sx: {
          border: "none",
        },
      }),
      width: column.width,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
    }}
  >
    {(() => {
      if (column.cell) {
        return column.cell(data);
      }

      if (!data[column.accessor]) {
        return <Typography color="text.primary">-</Typography>;
      }

      return (
        <Typography color="text.primary" wordWrap="break-word">
          {data[column.accessor] as React.ReactNode}
        </Typography>
      );
    })()}
  </TableCell>
);

export type { Column };
export { Cell };
