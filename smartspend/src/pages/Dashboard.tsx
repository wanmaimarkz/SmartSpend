import { Button } from "@/components/ui/button";

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600 mb-4">Welcome to your financial dashboard.</p>
      <Button className="bg-red-500" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
