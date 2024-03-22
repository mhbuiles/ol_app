import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Typography } from "./typography";

type LineChartProps = {
  title: string;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
};

export const LineChart = ({ chartData, title }: LineChartProps) => {
  return (
    <Box>
      <Typography variant="headline6" align="center">
        {title}
      </Typography>
      <Line data={chartData} />
    </Box>
  );
};
