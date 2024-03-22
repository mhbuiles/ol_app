import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import { Typography } from "./typography";

type BarChartProps = {
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

export const BarChart = ({ chartData, title }: BarChartProps) => {
  return (
    <Box>
      <Typography variant="headline6" align="center">
        {title}
      </Typography>
      <Bar data={chartData} />
    </Box>
  );
};
