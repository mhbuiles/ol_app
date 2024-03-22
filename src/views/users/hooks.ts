import type { Column } from "@components/table";
import type { Users } from "@services/users";
import { useMemo } from "react";

type ProjectColumn = Column<Users[number]>;

const useColumns = (): Array<ProjectColumn> =>
  useMemo<Array<ProjectColumn>>(
    () => [
      {
        accessor: "id",
        header: "ID",
        minWidth: "5rem",
      },
      {
        accessor: "name",
        header: "Name",
        minWidth: "8rem",
      },
      {
        accessor: "lastName",
        header: "Last name",
        minWidth: "8rem",
      },
      {
        accessor: "urlPhoto",
        header: "Photo url",
        minWidth: "10rem",
      },
      {
        accessor: "rol",
        header: "Role",
        minWidth: "5rem",
      },
      {
        accessor: "list",
        header: "Skills",
        minWidth: "10rem",
        cell: (row) =>
          row.list
            .split("|")
            .map((skill) => skill.trim())
            .join(", "),
      },
      {
        accessor: "area",
        header: "Area",
        minWidth: "10rem",
      },
    ],
    [],
  );

export { useColumns };
