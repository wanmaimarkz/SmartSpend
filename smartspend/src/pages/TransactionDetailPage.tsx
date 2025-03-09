import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import { CalendarFold, Clock, FileText} from "lucide-react";

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

    useEffect(() => {
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

    if (!transaction) {
        return <p className="text-center">ไม่พบข้อมูลธุรกรรม</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px] shadow-lg p-4">
                <CardHeader>
                    <CardTitle className="flex"><FileText className="w-5 h-5"/>ธุรกรรม ID: {transaction.id}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold"> ชื่อรายการ: {transaction.category}</p>
                    <p className="text-gray-500 flex"><CalendarFold /> วันที่: {transaction.l_date}</p>
                    <p className="text-gray-500 flex"><Clock /> {transaction.l_time}</p>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">จำนวนเงิน (บาท)</label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <Button className="mt-4 w-full" onClick={handleSave}>
                        บันทึกการเปลี่ยนแปลง
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}