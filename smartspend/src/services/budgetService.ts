import { db } from "@/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

// ✅ ตั้งงบประมาณ
export const setMonthlyBudget = async (userId: string, budgetAmount: number) => {
  try {
    await setDoc(doc(db, "monthlyBudgets", userId), { budgetAmount });
  } catch (error) {
    console.error("Error setting budget:", error);
  }
};

// ✅ ดึงงบประมาณ
export const getMonthlyBudget = async (userId: string) => {
  const docSnap = await getDoc(doc(db, "monthlyBudgets", userId));
  return docSnap.exists() ? docSnap.data() : null;
};
