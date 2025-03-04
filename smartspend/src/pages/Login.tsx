
import AuthForm from "@/components/AuthForm";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
      document.title = "Sign in | SmartSpend";
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to SmartSpend</h1>
      <p className="mb-4 text-gray-800">จัดการการเงินของคุณได้อย่างง่ายดาย</p>
      <AuthForm />
    </div>
  );
}
