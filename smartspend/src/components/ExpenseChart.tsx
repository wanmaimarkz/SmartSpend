import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"];

// ✅ สร้าง Type สำหรับ Data
type ExpenseData = {
  name: string;
  value: number;
};

interface ExpenseChartProps {
  data: ExpenseData[];
}

export default function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <PieChart width={400} height={400}>
      <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
