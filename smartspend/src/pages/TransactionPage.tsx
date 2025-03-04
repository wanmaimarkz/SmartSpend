import { useEffect, useState } from "react";
import { addTransaction, getTransactions } from "@/services/transactionService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function TransactionPage() {
  const [transactions, setTransactions] = useState<{ id: string; type: string; amount: number; category: string, l_date: string, l_time: string }[]>([]);
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
    <div className="flex flex-col w-full items-center p-4">
      <h1 className="text-2xl font-bold mb-4">บันทึกรายรับ-รายจ่าย</h1>

      {!user ? (
        <p className="text-red-500">กรุณาเข้าสู่ระบบเพื่อบันทึกข้อมูล</p>
      ) : (
        <>
          <div className="bg-white p-4 shadow-md rounded-lg w-full max-w-md">
            <Select value={type} onValueChange={(value) => setType(value as "income" | "expense")}>
              <SelectTrigger className="classNamw-full mb-2 p-2 border roundede">
                <SelectValue placeholder="เลือกประเภท" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {/* <SelectLabel>เลือกประเภท</SelectLabel> */}
                <SelectItem value="income">รายรับ</SelectItem>
                <SelectItem value="expense">รายจ่าย</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="จำนวนเงิน" value={amount} onChange={(e) => setAmount(e.target.value)} className="mb-2" />
            <Input type="text" placeholder="หมวดหมู่ (เช่น อาหาร ค่าเดินทาง)" value={category} onChange={(e) => setCategory(e.target.value)} className="mb-2" />
            <Button onClick={handleAddTransaction} className="w-full bg-blue-500 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "กำลังบันทึก..." : "เพิ่มรายการ"}
            </Button>
          </div>
          <div className="flex flex-col w-full h-96 max-w-md mt-6">
            <h2 className="text-lg font-bold mb-2">รายการล่าสุด</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-500">ไม่มีรายการ</p>
            ) : (
              <Table className="rounded-xl">
                {/* <TableCaption>บันทึกรายรับ-รายจ่ายของคุณ</TableCaption> */}
                <TableHeader className="sticky top-0 shadow-md bg-green-300 rounded-xl">
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="overflow-y-auto">
                  {transactions.map((txn) => (
                    <TableRow>
                      <TableCell className={`p-2 border-b last:border-none ${txn.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {txn.type === "income" ? "รายรับ" : "รายจ่าย"}
                      </TableCell>
                      <TableCell>{txn.category}</TableCell>
                      <TableCell>{txn.amount}</TableCell>
                      <TableCell>{txn.l_date}</TableCell>
                      <TableCell>{txn.l_time}</TableCell>
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
