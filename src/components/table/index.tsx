import Box from "@mui/material/Box";
import MUITable from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Typography } from "@components/typography";
import { memo } from "react";
import { Body, type Column } from "./components";

type SortDirection = "asc" | "desc";

type RowsPerPage = 5 | 10 | 25 | number;

type PaginationConfig = Partial<{
  itemCount: number;
  page: number;
  onPageChange: (page: number) => void;
  rowsPerPage: RowsPerPage;
  onRowsPerPageChange: (rowsPerPage: RowsPerPage) => void;
}>;

type SortConfig<TData extends Record<string, unknown>> = Partial<{
  direction: SortDirection;
  property: keyof TData;
  onSortChange: (property: keyof TData, newDirection: SortDirection) => void;
}>;

type TableProps<Data extends Record<string, unknown>> = {
  title: string | React.ReactNode;
  columns: Array<Column<Data>>;
} & Partial<{
  data: Array<Data>;
  disableFilter: boolean;
  pagination: PaginationConfig;
  sort: SortConfig<Data>;
  subHeader?: React.ReactNode;
  emptyDataComponent?: React.ReactNode;
  maxHeight: string;
}>;

type TableConfig<Data extends Record<string, unknown>> = Pick<
  PaginationConfig,
  "page" | "rowsPerPage"
> &
  Pick<SortConfig<Data>, "direction" | "property">;

const UnmemoizedTable = <Data extends Record<string, unknown>>({
  data,
  columns,
  title,
  sort,
  pagination,
  subHeader,
  emptyDataComponent,
  maxHeight,
}: TableProps<Data>): React.ReactElement => {
  return (
    <Paper>
      <Stack spacing="1.5rem">
        {title ? (
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing="1rem"
            sx={{ paddingInline: "1rem", paddingBlockStart: "1.5rem" }}
          >
            <Stack direction="row" spacing="1rem">
              {typeof title === "string" ? (
                <Typography variant="headline6" color="text.primary">
                  {title}
                </Typography>
              ) : (
                title
              )}
            </Stack>
          </Stack>
        ) : null}
        {subHeader || null}
        <Box
          sx={{
            overflowX: "auto",
            maxHeight: maxHeight || undefined,
          }}
        >
          <MUITable
            aria-label={typeof title === "string" ? title : "table"}
            sx={{
              minWidth: "42rem",
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "action.selected",
                  textTransform: "uppercase",
                }}
              >
                {columns.map(
                  ({
                    accessor,
                    align,
                    minWidth,
                    header,
                    sortable,
                    type,
                    width,
                  }) => (
                    <TableCell
                      key={accessor as string}
                      align={type === "date" ? "right" : align}
                      sx={{
                        width,
                        minWidth,
                      }}
                    >
                      {sort && sortable ? (
                        <TableSortLabel
                          direction={
                            accessor === sort.property ? sort.direction : "asc"
                          }
                          active={accessor === sort.property}
                          onClick={() => {
                            sort.onSortChange?.(
                              accessor,
                              accessor === sort.property
                                ? sort.direction === "asc"
                                  ? "desc"
                                  : "asc"
                                : "asc",
                            );
                          }}
                        >
                          <Typography variant="subtitle2" color="text.primary">
                            {header}
                          </Typography>
                        </TableSortLabel>
                      ) : (
                        <Typography variant="subtitle2" color="text.primary">
                          {header}
                        </Typography>
                      )}
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <Body
              data={data}
              columns={columns}
              emptyDataComponent={emptyDataComponent}
            />
          </MUITable>
        </Box>
        {pagination ? (
          <TablePagination
            count={pagination.itemCount ? +pagination.itemCount : 0}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            rowsPerPage={pagination.rowsPerPage || 10}
            page={pagination.page || 0}
            onPageChange={(...page) => pagination.onPageChange?.(page[1])}
            onRowsPerPageChange={({ target }) =>
              pagination.onRowsPerPageChange?.(+target.value)
            }
            sx={{
              color: "text.primary",
            }}
          />
        ) : null}
      </Stack>
    </Paper>
  );
};

const Table = memo(UnmemoizedTable) as typeof UnmemoizedTable;

export type { TableProps, Column, SortDirection, RowsPerPage, TableConfig };
export { Table };
