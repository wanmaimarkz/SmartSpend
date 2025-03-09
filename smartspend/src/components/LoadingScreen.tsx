import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

export default function LoadingScreen() {
  useEffect(() => {
    document.title = "Loading...";
  }, []);
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <h2 className="flex gap-2 text-xl font-bold text-gray-600"><LoaderCircle className="animate-spin" /> Loading...</h2>
    </div>
  );
}
