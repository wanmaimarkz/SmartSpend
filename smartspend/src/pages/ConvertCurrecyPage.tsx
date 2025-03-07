import { useState } from "react";
import { convertCurrency } from "@/services/convertCurrency";
import CurrencyDropdown from "@/components/CurrencyDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg mt-5 border">
            <h2 className="text-xl font-bold mb-4">Currency Converter</h2>
            <div className="mb-2">
                <label>Amount:</label>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="border p-2 w-fullw hover:bg-blue-50"
                />
            </div>
            <div className="mb-2">
                <label>From:</label>
                <CurrencyDropdown selectedCurrency={fromCurrency} onChange={setFromCurrency} />
            </div>
            <div className="mb-2">
                <label>To:</label>
                <CurrencyDropdown selectedCurrency={toCurrency} onChange={setToCurrency} />
            </div>
            <Button
                onClick={handleConvert}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Converting..." : "Convert"}
            </Button>

            {convertedAmount !== null && (
                <p className="mt-4 text-lg font-bold">
                    Converted Amount: {convertedAmount} {toCurrency}
                </p>
            )}
        </div>
    );
};

export default CurrencyConverter;
