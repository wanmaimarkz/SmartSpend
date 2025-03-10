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
    <div className="flex flex-col items-center h-screen bg-[#E6FFFA] px-4 py-10 overflow-y-auto">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">Welcome to your financial dashboard.</p>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md text-center mb-4">
        <h2 className="text-3xl font-bold">ยอดคงเหลือ</h2>
        <h3 className={`text-lg ${summary.balance > 0 ? "text-green-500" : "text-red-500"}  font-semibold mb-4`}>{summary.balance} บาท</h3>
        <hr />
        <div className="grid grid-cols-3 gap-2 mt-4 font-semibold text-sm">
          <div className="flex justify-end"><div className="flex w-5/12 justify-start">รายรับ</div></div>
          <div className="text-green-500">{summary.income}</div>
          <div className="flex items-start pl-3">บาท</div>
          <div className="flex justify-end"><div className="flex w-5/12 justify-start">รายจ่าย</div></div>
          <div className="text-red-500">{summary.expense}</div>
          <div className="flex items-start pl-3">บาท  </div>
        </div>
      </div>
      <div className=" flex flex-col gap-2 items-center justify-center">
        <SummaryChart data={percent} />
      </div>
    </div>
  );
}
