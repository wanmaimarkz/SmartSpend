import { useEffect, useState } from "react";
import { getMonthlySummary } from "@/services/summaryService";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import SummaryChart from "@/components/SummaryChart";

export default function Dashboard() {
  const [percent, setPercent] = useState<{ label: string; value: number }[]>([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [user, setUser] = useState<any>(null);

  const fetchData = async (userId: string) => {
    const summaryData = await getMonthlySummary(userId);
    setSummary(summaryData);

    const total = summaryData.income + summaryData.expense;
    if (total > 0) {
      const summaryChartData = [
        { label: "รายรับ", value: (summaryData.income / total) * 100 },
        { label: "รายจ่าย", value: (summaryData.expense / total) * 100 },
      ];
      setPercent(summaryChartData);
    } else {
      setPercent([]);
    }
  };

  useEffect(() => {
    document.title = "Dashboard | SmartSpend";

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData(user.uid);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">Welcome to your financial dashboard.</p>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md text-center mb-4">
        <h2 className="text-xl font-bold">ยอดคงเหลือ: {summary.balance} บาท</h2>
        <p className="text-green-600">รายรับ: {summary.income} บาท</p>
        <p className="text-red-600">รายจ่าย: {summary.expense} บาท</p>
      </div>
      <div className="">
        <SummaryChart data={percent} />
      </div>
    </div>
  );
}
