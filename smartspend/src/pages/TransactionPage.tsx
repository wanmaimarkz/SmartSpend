import { useEffect, useState } from "react";
import { addTransaction, getTransactions } from "@/services/transactionService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<{ id: string; type: string; amount: number; category: string, l_date: string }[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTransactions(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTransactions = async (userId: string) => {
    const data = await getTransactions(userId);
    setTransactions(data);
  };

  const handleAddTransaction = async () => {
    if (!amount || !category) return alert("กรุณากรอกข้อมูลให้ครบ");
    if (!user) return alert("กรุณาเข้าสู่ระบบ");
    setIsLoading(true);

    await addTransaction(user.uid, type, parseFloat(amount), category);
    setAmount("");
    setCategory("");
    fetchTransactions(user.uid);
    setIsLoading(false);
    alert("บันทึกรายการเสร็จสิ้น");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">บันทึกรายรับ-รายจ่าย</h1>

      {!user ? (
        <p className="text-red-500">กรุณาเข้าสู่ระบบเพื่อบันทึกข้อมูล</p>
      ) : (
        <>
          <div className="bg-white p-4 shadow-md rounded-lg w-full max-w-md">
            <select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")} className="w-full mb-2 p-2 border rounded">
              <option value="income">รายรับ</option>
              <option value="expense">รายจ่าย</option>
            </select>
            <Input type="number" placeholder="จำนวนเงิน" value={amount} onChange={(e) => setAmount(e.target.value)} className="mb-2" />
            <Input type="text" placeholder="หมวดหมู่ (เช่น อาหาร ค่าเดินทาง)" value={category} onChange={(e) => setCategory(e.target.value)} className="mb-2" />
            <Button onClick={handleAddTransaction} className="w-full bg-blue-500 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "กำลังบันทึก..." : "เพิ่มรายการ"}
            </Button>
          </div>
          <div className="w-full max-w-md mt-6">
            <h2 className="text-lg font-bold mb-2">รายการล่าสุด</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-500">ไม่มีรายการ</p>
            ) : (
              <Table>
                <TableCaption>บันทึกรายรับ-รายจ่ายของคุณ</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Date Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow>
                      <TableCell className={`p-2 border-b last:border-none ${txn.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {txn.type === "income" ? "รายรับ" : "รายจ่าย"}
                      </TableCell>
                      <TableCell>{txn.category}</TableCell>
                      <TableCell>{txn.amount}</TableCell>
                      <TableCell>{txn.l_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
