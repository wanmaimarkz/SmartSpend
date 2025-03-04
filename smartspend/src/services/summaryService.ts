import { db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

// ✅ ดึงสรุปยอดรายเดือน
export const getMonthlySummary = async (userId: string) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const q = query(collection(db, "transactions"), where("userId", "==", userId), where("date", ">=", startOfMonth));
  const snapshot = await getDocs(q);

  let income = 0, expense = 0;
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.type === "income") income += data.amount;
    else if (data.type === "expense") expense += data.amount;
  });

  return { income, expense, balance: income - expense };
};
