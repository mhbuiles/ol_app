import { Button } from "@components/button";
import { Table } from "@components/table";
import { TableSkeleton } from "@components/table-skeleton";
import { useColumns } from "./hooks";
import { useState } from "react";
import { useUsers } from "@services/users";
import { Box, Stack } from "@mui/material";

const ROWS_PER_PAGE = 10;

const Users = (): React.ReactElement => {
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useUsers();
  const columns = useColumns();

  const initialIndex = (page - 1) * ROWS_PER_PAGE;
  const finalIndex = page * ROWS_PER_PAGE;

  if (isSuccess) {
    return (
      <Stack sx={{ padding: "1rem" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large">
            Add user
          </Button>
        </Box>
        <Stack sx={{ padding: "2rem", alignItems: "center" }}>
          <Stack maxWidth="150rem" width="100%">
            <Table
              title="Users"
              data={data?.slice(initialIndex, finalIndex)}
              columns={columns}
              pagination={{
                itemCount: data?.length ?? 0,
                page: page,
                onPageChange: (page) => setPage(page),
                rowsPerPage: ROWS_PER_PAGE,
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return <TableSkeleton />;
};

export default Users;
