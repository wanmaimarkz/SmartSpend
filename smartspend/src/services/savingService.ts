import { db } from "@/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// ✅ ตั้งเป้าหมายการออมเงิน
export const setSavingGoal = async (userId: string, title:string, goalAmount: number,) => {
  try {
    await setDoc(doc(db, "savingGoals", userId), { 
      title,
      goalAmount,
      amount: 0
    });
  } catch (error) {
    console.error("Error setting saving goal:", error);
  }
};

export const addSavingAmount = async (userId: string, addAmount: number) => {
  try {
    const docRef = doc(db, "savingGoals", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentAmount = docSnap.data().amount ?? 0;
      await updateDoc(docRef, {
        amount: currentAmount + addAmount
      });
    } else {
      console.error("Saving goal not found");
    }
  } catch (error) {
    console.error("Error adding saving amount:", error);
  }
};

// ✅ ดึงเป้าหมายการออม
export const getSavingGoal = async (userId: string) => {
  try {
    const docRef = doc(db, "savingGoals", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        title: docSnap.data().title ?? "",
        amount: docSnap.data().amount ?? 0,
        goalAmount: docSnap.data().goalAmount ?? 0
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting saving goal:", error);
    return null;
  }
};

export const deleteSavingGoal = async (userId: string) => {
  try {
    const docRef = doc(db, "savingGoals", userId);
    await deleteDoc(docRef);
    console.log("Saving goal deleted successfully");
  } catch (error) {
    console.error("Error deleting saving goal:", error);
  }
};
