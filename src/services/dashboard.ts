import type { Error } from "@app/types";
import type { UseQueryResult } from "@tanstack/react-query";
import { useFetch } from "@context/fetch";
import { useQuery } from "@tanstack/react-query";

const DASHBOARD_GENERAL_ENDPOINT = "/dashboard_cards";
const CPU_REPORT_ENDPOINT = "/cpu_report";
const COMMITS_REPORT_ENDPOINT = "/report_commits";
const RELEASE_SUMMARY_ENDPOINT = "/release_resume";

type DashboardCardsResponse = {
  projects: number;
  projectsDev: number;
  pedingNc: number;
  errorsDeploy: number;
};

const useDashboardGeneralInfo = (): UseQueryResult<
  DashboardCardsResponse,
  Error
> => {
  const { authRequest } = useFetch();

  return useQuery<DashboardCardsResponse, Error>({
    queryKey: ["dashboard-general-info"],
    queryFn: async () => {
      const { data } = await authRequest.get<DashboardCardsResponse>(
        DASHBOARD_GENERAL_ENDPOINT,
      );

      return data;
    },
  });
};

type CpuReportResponse = {
  percentajeTime: number;
  deploys: number;
  time: Array<{
    time: string;
    value: number;
  }>;
};

const useCpuReport = (): UseQueryResult<CpuReportResponse, Error> => {
  const { authRequest } = useFetch();

  return useQuery<CpuReportResponse, Error>({
    queryKey: ["cpu-report"],
    queryFn: async () => {
      const { data } =
        await authRequest.get<CpuReportResponse>(CPU_REPORT_ENDPOINT);

      return data;
    },
  });
};

type CommitsReportResponse = Array<{
  month: number;
  feat: number;
  fix: number;
}>;

const useCommitsReport = (): UseQueryResult<CommitsReportResponse, Error> => {
  const { authRequest } = useFetch();

  return useQuery<CommitsReportResponse, Error>({
    queryKey: ["commits-report"],
    queryFn: async () => {
      const { data } = await authRequest.get<CommitsReportResponse>(
        COMMITS_REPORT_ENDPOINT,
      );

      return data;
    },
  });
};

type ReleaseSummaryResponse = {
  porcentaje: string;
  cicle: string;
  ncState: {
    detected: number;
    process: number;
    solved: number;
  };
  topProjects: Array<{
    name: string;
    porcentaje: string;
    isNc: boolean;
    isDelay: boolean;
    isDeliver: boolean;
  }>;
};

const useReleaseSummary = (): UseQueryResult<ReleaseSummaryResponse, Error> => {
  const { authRequest } = useFetch();

  return useQuery<ReleaseSummaryResponse, Error>({
    queryKey: ["release-summary"],
    queryFn: async () => {
      const { data } = await authRequest.get<ReleaseSummaryResponse>(
        RELEASE_SUMMARY_ENDPOINT,
      );

      return data;
    },
  });
};

export {
  useCommitsReport,
  useCpuReport,
  useDashboardGeneralInfo,
  useReleaseSummary,
};
