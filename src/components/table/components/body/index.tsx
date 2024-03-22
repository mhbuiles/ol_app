import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@components/typography";
import { Cell, type Column } from "./components";

type BodyProps<TData extends Record<string, unknown>> = {
  data?: Array<TData>;
  columns: Array<Column<TData>>;
  emptyDataComponent?: React.ReactNode;
};

const Body = <TData extends Record<string, unknown>>({
  data,
  columns,
  emptyDataComponent,
}: BodyProps<TData>): React.ReactElement => (
  <TableBody>
    {data && data.length ? (
      data.map((item, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <Cell key={column.accessor as string} column={column} data={item} />
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={columns.length}>
          {emptyDataComponent ? (
            emptyDataComponent
          ) : (
            <Typography align="center" color="text.primary">
              No available data to show
            </Typography>
          )}
        </TableCell>
      </TableRow>
    )}
  </TableBody>
);

export type { Column };
export { Body };
