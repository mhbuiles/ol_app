import type { Column } from "@components/table";
import type { Projects } from "@services/projects";
import { useMemo } from "react";

type ProjectColumn = Column<Projects[number]>;

const useColumns = (): Array<ProjectColumn> =>
  useMemo<Array<ProjectColumn>>(
    () => [
      {
        accessor: "id",
        header: "ID",
        minWidth: "5rem",
      },
      {
        accessor: "projectName",
        header: "Project name",
        minWidth: "18rem",
      },
      {
        accessor: "repoUrl",
        header: "Repository URL",
        minWidth: "10rem",
      },
      {
        accessor: "developers",
        header: "Developers",
        minWidth: "20rem",
        cell: (row) =>
          row.developers
            .split("|")
            .map((dev) => dev.trim())
            .join(", "),
      },
      {
        accessor: "ci",
        header: "CI",
        minWidth: "5rem",
        cell: (row) => (row.ci ? "Yes" : "No"),
      },
      {
        accessor: "cd",
        header: "CD",
        minWidth: "5rem",
        cell: (row) => (row.cd ? "Yes" : "No"),
      },
      {
        accessor: "client",
        header: "Client",
        minWidth: "15rem",
      },
    ],
    [],
  );

export { useColumns };
