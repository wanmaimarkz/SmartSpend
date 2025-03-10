import { useEffect, useState } from "react";
import { convertCurrency } from "@/services/convertCurrency";
import CurrencyDropdown from "@/components/CurrencyDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency, setToCurrency] = useState<string>("THB");
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleConvert = async () => {
        setLoading(true);
        const result = await convertCurrency(amount, fromCurrency, toCurrency);
        setConvertedAmount(result);
        setLoading(false);
    };

    useEffect(() => {
        document.title = "Convert Currency | SmartSpend";
    }, []);

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg mt-5 border">
            <h2 className="text-4xl font-bold mb-4 flex justify-center">การแลกเปลี่ยนสกุลเงิน</h2>
            {convertedAmount !== null ? (
                <div className="p-1">
                    <p className="text-base">
                        แลกเปลี่ยนจาก <b className="text-red-500">{fromCurrency}</b>  ไปสู่ <b className="text-green-500">{toCurrency}</b> ได้จำนวนเงิน: 
                    </p>
                    <div className="flex justify-center px-8 py-10 font-bold text-3xl">
                    {convertedAmount} {toCurrency}
                    </div>
                </div>

            ):(
                <div className="flex justify-center p-5 font-bold text-3xl text-zinc-200">
                    ยังไม่มี
                </div>
            )}
            <div className="mb-2">
                <Label>จำนวนเงิน</Label>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="border p-2 w-fullw hover:bg-blue-50"
                    min={0}
                />
            </div>
            <div className="mb-2">
                <Label>จาก</Label>
                <CurrencyDropdown selectedCurrency={fromCurrency} onChange={setFromCurrency} />
            </div>
            <div className="mb-2">
                <Label>เป็น</Label>
                <CurrencyDropdown selectedCurrency={toCurrency} onChange={setToCurrency} />
            </div>
            <Button
                onClick={handleConvert}
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Converting..." : "Convert"}
            </Button>
        </div>
    );
};

export default CurrencyConverter;
