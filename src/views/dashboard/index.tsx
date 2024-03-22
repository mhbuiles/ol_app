import { BarChart } from "@components/bar-chart";
import { Grid } from "@components/grid";
import { LineChart } from "@components/line-chart";
import { Typography } from "@components/typography";
import { Box, Stack, useTheme } from "@mui/material";
import {
  useCommitsReport,
  useCpuReport,
  useDashboardGeneralInfo,
  useReleaseSummary,
} from "@services/dashboard";

const Dashboard = (): React.ReactElement => {
  const theme = useTheme();
  const { data: dashboardGeneralInfo } = useDashboardGeneralInfo();
  const { data: cpuReport } = useCpuReport();
  const { data: commitsReport } = useCommitsReport();
  const { data: releaseSummary } = useReleaseSummary();

  return (
    <Stack sx={{ padding: "2rem", gap: "2rem" }}>
      <Grid columns={3}>
        <Box>
          <Typography variant="subtitle2" align="center" color="GrayText">
            Projects
          </Typography>
          <Typography variant="caption" align="center" color="InfoText">
            {dashboardGeneralInfo?.projects}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" align="center" color="GrayText">
            Issues
          </Typography>
          <Typography variant="caption" align="center" color="InfoText">
            {dashboardGeneralInfo?.pedingNc}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" align="center" color="GrayText">
            Errors
          </Typography>
          <Typography variant="caption" align="center" color="InfoText">
            {dashboardGeneralInfo?.errorsDeploy}
          </Typography>
        </Box>
      </Grid>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            border: `0.1rem solid ${theme.palette.grey[300]}`,
            borderRadius: "1rem",
            width: "100%",
            maxWidth: "50rem",
            maxHeight: "30rem",
          }}
        >
          <BarChart
            title="Release summary"
            chartData={{
              labels:
                releaseSummary?.topProjects.map((project) => project.name) ??
                [],
              datasets: [
                {
                  label: "Delivery reports",
                  data:
                    releaseSummary?.topProjects.map((project) =>
                      parseInt(project.porcentaje),
                    ) ?? [],
                  backgroundColor: [theme.palette.info.light],
                },
              ],
            }}
          />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            border: `0.1rem solid ${theme.palette.grey[300]}`,
            borderRadius: "1rem",
            backgroundColor: theme.palette.grey[300],
            maxWidth: "50rem",
            width: "100%",
            maxHeight: "30rem",
          }}
        >
          <LineChart
            title="Commits per month"
            chartData={{
              labels:
                commitsReport?.map((month) => month.month.toString()) ?? [],
              datasets: [
                {
                  label: `Total commits last year: ${commitsReport?.reduce((acc, month) => acc + month.feat + month.fix, 0)}`,
                  data:
                    commitsReport?.map((month) => month.feat + month.fix) ?? [],
                  backgroundColor: [theme.palette.info.light],
                },
              ],
            }}
          />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            border: `0.1rem solid ${theme.palette.grey[300]}`,
            borderRadius: "1rem",
            width: "100%",
            maxWidth: "50rem",
            maxHeight: "30rem",
          }}
        >
          <LineChart
            title="Server details"
            chartData={{
              labels: cpuReport?.time.map((time) => time.time) ?? [],
              datasets: [
                {
                  label: "CPU usage",
                  data:
                    cpuReport?.time.map((time) =>
                      parseInt(time.value.toString()),
                    ) ?? [],
                  backgroundColor: [theme.palette.info.light],
                },
              ],
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
