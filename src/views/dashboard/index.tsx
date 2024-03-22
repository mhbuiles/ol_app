import { Grid } from "@components/grid";
import { Typography } from "@components/typography";
import { Box, Stack } from "@mui/material";
import {
  useCommitsReport,
  useCpuReport,
  useDashboardGeneralInfo,
  useReleaseSummary,
} from "@services/dashboard";

const Dashboard = (): React.ReactElement => {
  const { data: dashboardGeneralInfo } = useDashboardGeneralInfo();
  const { data: cpuReport } = useCpuReport();
  const { data: commitsReport } = useCommitsReport();
  const { data: releaseSummary } = useReleaseSummary();

  console.log(cpuReport, "cpuReport");
  console.log(commitsReport, "commitsReport");
  console.log(releaseSummary, "releaseSummary");

  return (
    <Stack sx={{ padding: "2rem" }}>
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
    </Stack>
  );
};

export default Dashboard;
