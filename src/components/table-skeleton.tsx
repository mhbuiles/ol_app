import type { Component } from "@app/types";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const TableSkeleton: Component = () => (
  <Stack spacing="0.5rem">
    {Array.from({ length: 2 }).map((_, index) => (
      <Skeleton key={index} height="9.5rem" />
    ))}
  </Stack>
);

export { TableSkeleton };
