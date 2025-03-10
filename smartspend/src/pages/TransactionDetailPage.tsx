import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import { CalendarFold, Clock, Save, Trash2 } from "lucide-react";
import { deleteTransaction } from "@/services/transactionService";
import { Label } from "@/components/ui/label"

export default function TransactionDetailPage() {
    const { id } = useParams<{ id: string }>(); // ดึง id จาก URL
    const [transaction, setTransaction] = useState<{
        id: string;
        type: string;
        amount: number;
        category: string;
        l_date: string;
        l_time: string;
    } | null>(null);

    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Transaction Detail | SmartSpend";
        const fetchTransaction = async () => {
            if (!id) return;

            const docRef = doc(db, "transactions", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const formattedData = {
                    id: docSnap.id,
                    category: data.category,
                    amount: data.amount,
                    type: data.type,
                    l_date: new Date(data.l_dt).toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" }),
                    l_time: new Date(data.l_dt).toLocaleTimeString("th-TH", { timeZone: "Asia/Bangkok" }),
                };
                setTransaction(formattedData);
                setAmount(data.amount.toString());
            } else {
                setTransaction(null);
            }
        };

        fetchTransaction();
    }, [id]);

    const handleSave = async () => {
        if (!transaction || !id) return;

        try {
            const docRef = doc(db, "transactions", id);
            await updateDoc(docRef, {
                amount: Number(amount),
            });
            setTransaction((prev) => prev ? { ...prev, amount: Number(amount) } : null);
            alert("อัปเดตข้อมูลเรียบร้อยแล้ว!");
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("เกิดข้อผิดพลาดในการบันทึก");
        }
    };
    const handleDelete = async () => {
        if (!transaction || !id) return;

        try {
            await deleteTransaction(id);
            setTransaction(null);
            alert("ลบข้อมูลเรียบร้อยแล้ว!");
            navigate("/transactions");
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("เกิดข้อผิดพลาดในการลบ");
        }
    }

    if (!transaction) {
        return <p className="text-center">ไม่พบข้อมูลธุรกรรม</p>;
    }

    return (
        <div className="flex justify-center bg-[#E6FFFA] w-full h-full">
            <Card className="w-5/6 md:w-2/6 shadow-lg p-4 mt-10 bg-white h-fit">
                <CardHeader>
                    <CardTitle className="flex flex-col md:flex-row text-xl gap-2">
                        <div className="font-semibold text-zinc-500">รหัสธุรกรรม (ID): </div>
                        <div className="font-semibold"> {transaction.id}</div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <hr />
                    <div className="flex gap-2 mt-4">
                        <div className="text-lg font-semibold text-zinc-500 ">ชื่อรายการ:</div>
                        <div className="text-lg font-semibold"> {transaction.category} </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className=" flex gap-2 items-center"><CalendarFold className="w-5 h-5" /><div className="text-gray-500 text-lg">{transaction.l_date}</div></div>
                        <div className="flex gap-2 items-center"><Clock className="w-5 h-5" /> <div className="text-gray-500 text-lg">{transaction.l_time}</div></div>
                    </div>


                    <div className="mt-4 px-2">
                        <Label >จำนวนเงิน (บาท)</Label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full justify-between px-2">
                        <Button className="mt-4 bg-[#ECC94B] hover:bg-[#F6E05E] duration-300 flex items-center" onClick={handleSave}>
                            <Save />
                            บันทึก
                        </Button>
                        <Button className="gap-2 mt-4 text-white bg-[#ec4b4b] hover:bg-[#f65e5e] duration-300 rounded-full" onClick={handleDelete}>
                            <Trash2 />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}