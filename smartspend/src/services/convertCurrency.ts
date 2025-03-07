const API_KEY = "9a2448a4f71c4931f5b655d5";

export const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string) => {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`);
    const data = await response.json();
    return data.conversion_result;
  } catch (error) {
    console.error("Currency conversion error:", error);
    return null;
  }
};