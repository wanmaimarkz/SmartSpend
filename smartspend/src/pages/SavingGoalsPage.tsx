import { useEffect, useState } from "react";
import { getSavingGoal, addSavingAmount, setSavingGoal, deleteSavingGoal } from "@/services/savingService";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/firebaseConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flag, TriangleAlert, Wallet } from "lucide-react";
import DeleteDialog from "@/components/DeleteDialog";

export default function SavingsGoal() {
  const [user, setUser] = useState<any>(null);
  const [savingGoal, setSavingGoalState] = useState<{ id: string; title: string; amount: number; goalAmount: number } | null>(null);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [newGoalTitle, setNewGoalTitle] = useState<string>("");
  const [newGoalAmount, setNewGoalAmount] = useState<string>("");

  useEffect(() => {
    document.title = "Saving Goals | SmartSpend";

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const data = await getSavingGoal(currentUser.uid);
        if (data) {
          setSavingGoalState(data);
        }
      } else {
        setUser(null);
        setSavingGoalState(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteGoal = async () => {
    if (!user?.uid) return;

    try {
      await deleteSavingGoal(user.uid);
      setSavingGoalState(null);
      alert("ลบเป้าหมายการออมสำเร็จ");
    } catch (error) {
      console.error("Error deleting saving goal:", error);
      alert("เกิดข้อผิดพลาดในการลบเป้าหมายการออม");
    }
  };

  const handleAddAmount = async () => {
    if (!user || inputAmount.trim() === "" || Number(inputAmount) <= 0) return;
    await addSavingAmount(user.uid, Number(inputAmount));
    setSavingGoalState((prev) => (prev ? { ...prev, amount: prev.amount + Number(inputAmount) } : null));
    setInputAmount("");
  };

  const handleCreateGoal = async () => {
    if (!user || newGoalTitle.trim() === "" || newGoalAmount.trim() === "" || Number(newGoalAmount) <= 0) return;
    await setSavingGoal(user.uid, newGoalTitle, Number(newGoalAmount));
    setSavingGoalState({ id: user.uid, title: newGoalTitle, amount: 0, goalAmount: Number(newGoalAmount) });
    setNewGoalTitle("");
    setNewGoalAmount("");
  };

  return (
    <div className="flex flex-col items-center h-full bg-[#E6FFFA] py-10 px-5">
      <Card className="lg:w-full max-w-lg p-6 text-center bg-white">
        <h2 className="flex gap-2 justify-center text-4xl font-bold text-gray-800 mb-4">เป้าหมายการออม</h2>

        {savingGoal ? (
          <CardContent className="space-y-4 flex flex-col items-center">
            <p className="text-3xl font-semibold py-8">{savingGoal.title}</p>
            <hr className="w-full" />
            <div className="flex w-full justify-between flex-col md:flex-row">
              <div className="flex  gap-2 text-gray-700 text-sm">
                <Wallet className="w-4 h-4" />
                ออมแล้ว:
                <span className="font-bold text-green-400">{savingGoal.amount}</span>
                <span className="font-semibold"> บาท</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm"> <Flag className="w-4 h-4 " />
                เป้าหมาย:
                <span className="font-bold text-amber-400">{savingGoal.goalAmount}</span>
                <span className="font-semibold"> บาท</span>
              </div>
            </div>

            {savingGoal && savingGoal.goalAmount > 0 && (
              // progressBar
              <div className="bg-gray-200 w-full h-4 p-1 rounded-full">
                <div
                  className="bg-green-400 h-full rounded-full max-w-full"
                  style={{
                    width: `${(savingGoal.amount / savingGoal.goalAmount) * 100}%`,
                  }}
                ></div>
              </div>
            )}
            <div className="flex w-full gap-2 justify-center">
              <Input
                type="number"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="w-3/4 text-center"
                placeholder="เพิ่มเงิน"
                disabled={savingGoal.amount >= savingGoal.goalAmount}
                hidden={true}
              />
              <Button
                onClick={handleAddAmount}
                disabled={savingGoal.amount >= savingGoal.goalAmount}
                className="1/4 bg-green-400 hover:bg-green-700 hover:text-white duration-300"
              >
                เพิ่มเงินออม
              </Button>
            </div>
            {savingGoal.amount >= savingGoal.goalAmount ? (
              <div className="flex flex-col items-center gap-3">
                <h2>🎉ยินดีด้วย คุณได้บรรลุเป้าหมาย <b>{savingGoal.title}</b> แล้ว🎉</h2>
                <h2 className="flex justify-center text-gray-500 text-sm gap-2"> <TriangleAlert className="text-sm text-red-400 w-4 h-5" />หากคุณต้องการสร้างเป้าหมายใหม่โปรดลบเป้าหมายการออมปัจจุบัน</h2>
                <DeleteDialog onDelete={handleDeleteGoal} />
              </div>
            ) : (
              <div className="w-0 h-0">
              </div>
            )
            }
          </CardContent>
        ) : (
          <CardContent className="space-y-4">
            <p className="text-gray-600">ยังไม่มีเป้าหมายการออม</p>
            <Input
              type="text"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              placeholder="ชื่อเป้าหมาย"
            />
            <Input
              type="number"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(e.target.value)}
              placeholder="จำนวนเงินเป้าหมาย"
            />
            <Button onClick={handleCreateGoal} className="w-full bg-[#2C7A7B] text-white hover:bg-green-700 duration-300">
              สร้างเป้าหมายออมเงิน
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
