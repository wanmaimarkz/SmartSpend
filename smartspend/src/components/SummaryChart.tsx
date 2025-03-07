import { PieChart } from "@mui/x-charts/PieChart";

type ExpenseData = {
  label: string;
  value: number;
};

interface ExpenseChartProps {
  data: ExpenseData[];
}

export default function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <PieChart
      series={[
        {
          data,
          outerRadius: 110,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -20, color: "gray" },
          arcLabel: (item) => `${item.value.toFixed(2)}%`,
          arcLabelMinAngle: 20,
          arcLabelRadius: "50%",
        },
      ]}
      width={350}
      height={350}
    />
  );
}
