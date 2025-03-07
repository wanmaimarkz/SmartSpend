import { useEffect, useState } from "react";
import { getCurrencyList } from "@/services/currencyList"; // นำเข้าฟังก์ชัน
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // ใช้ Select จาก ShadCN

const CurrencyDropdown = ({ selectedCurrency, onChange }: { selectedCurrency: string; onChange: (value: string) => void }) => {
    const [currencies, setCurrencies] = useState<[string, string][]>([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const currencyList = await getCurrencyList();
            setCurrencies(currencyList);
        };

        fetchCurrencies();
    }, []);

    return (
        <Select value={selectedCurrency} onValueChange={onChange} >
            <SelectTrigger className="w-full mb-2 p-2 border rounded hover:bg-blue-50">
                <SelectValue placeholder="เลือกสกุลเงิน" />
            </SelectTrigger>
            <SelectContent className="bg-white">
                {currencies.map(([code, name]) => (
                    <SelectItem key={code} value={code} className="hover:bg-blue-100">
                        {code} - {name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default CurrencyDropdown;
