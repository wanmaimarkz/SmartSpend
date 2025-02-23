import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to SmartSpend</h1>
      <p className="mb-4 text-gray-600">Manage your expenses easily.</p>
      <AuthForm />
      <button onClick={() => navigate("/dashboard")} className="mt-4 text-blue-500">
        Go to Dashboard (after login)
      </button>
    </div>
  );
}
