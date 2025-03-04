import { db } from "@/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

// ✅ ตั้งเป้าหมายการออมเงิน
export const setSavingGoal = async (userId: string, goalAmount: number) => {
  try {
    await setDoc(doc(db, "savingGoals", userId), { goalAmount });
  } catch (error) {
    console.error("Error setting saving goal:", error);
  }
};

// ✅ ดึงเป้าหมายการออม
export const getSavingGoal = async (userId: string) => {
  const docSnap = await getDoc(doc(db, "savingGoals", userId));
  return docSnap.exists() ? docSnap.data() : null;
};
