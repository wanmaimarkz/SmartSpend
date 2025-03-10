
import AuthForm from "@/components/AuthForm";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
      document.title = "Sign in | SmartSpend";
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome to SmartSpend</h1>
      <img src="/SmartSpendIcon.svg" alt="LogoApp" />
      <p className="mb-4 text-gray-800 font-semibold text-lg mt-4">จัดการการเงินของคุณได้อย่างง่ายดาย</p>
      <AuthForm />
    </div>
  );
}
