
import AuthForm from "@/components/AuthForm";

export default function Login() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to SmartSpend</h1>
      <p className="mb-4 text-gray-600">Manage your expenses easily.</p>
      <AuthForm />
    </div>
  );
}
