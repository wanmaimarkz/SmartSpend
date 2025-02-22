import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={logout}>
        ออกจากระบบ
      </button>
    </div>
  );
}
