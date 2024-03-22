import type { Error } from "@app/types";
import type { UseQueryResult } from "@tanstack/react-query";
import { useFetch } from "@context/fetch";
import { useQuery } from "@tanstack/react-query";

const PROJECTS_ENDPOINT = "/projects";

type Projects = Array<{
  id: number;
  projectName: string;
  repoUrl: string;
  client: string;
  developers: string;
  ci: boolean;
  cd: boolean;
  frontendTecnology: string;
  backendTecnology: string;
  databases: string;
  errorsCount: number;
  warningCount: number;
  deployCount: number;
  percentageCompletion: number;
  reportNc: number;
  status: string;
}>;

const useProjects = (): UseQueryResult<Projects, Error> => {
  const { authRequest } = useFetch();

  return useQuery<Projects, Error>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await authRequest.get<Projects>(PROJECTS_ENDPOINT);

      return data;
    },
  });
};

export { useProjects };
export type { Projects };
