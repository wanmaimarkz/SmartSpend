import { useEffect, useState } from "react";
import { getTransactions } from "@/services/transactionService";
import { getMonthlySummary } from "@/services/summaryService";
import ExpenseChart from "@/components/ExpenseChart";
import { Button } from "@/components/ui/button";

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [transactions, setTransactions] = useState<{ name: string; value: number }[]>([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });

  useEffect(() => {
    document.title = "Dashboard | SmartSpend";

    const fetchData = async () => {
      const userId = "user123";
      
      const txns = await getTransactions(userId);
      const chartData = txns.map((txn) => ({
        name: txn.category,
        value: txn.amount,
      }));
      setTransactions(chartData);

      const summaryData = await getMonthlySummary(userId);
      setSummary(summaryData);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">Welcome to your financial dashboard.</p>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md text-center mb-4">
        <h2 className="text-xl font-bold">ยอดคงเหลือ: {summary.balance} บาท</h2>
        <p className="text-green-600">รายรับ: {summary.income} บาท</p>
        <p className="text-red-600">รายจ่าย: {summary.expense} บาท</p>
      </div>

      <ExpenseChart data={transactions} />

      <Button className="bg-red-500 mt-4" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
