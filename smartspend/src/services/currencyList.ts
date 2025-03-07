const API_KEY = "9a2448a4f71c4931f5b655d5";

export const getCurrencyList = async () => {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
    const data = await response.json();
    return data.supported_codes;
  } catch (error) {
    console.error("Error fetching currency list:", error);
    return [];
  }
};
