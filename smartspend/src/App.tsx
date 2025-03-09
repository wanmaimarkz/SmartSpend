import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import TransactionDetailPage from "@/pages/TransactionDetailPage";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import LoadingScreen from "@/components/LoadingScreen";
import TransactionPage from "@/pages/TransactionPage";
import Navbar from "@/components/Navbar";
import ConvertCurrency from "@/pages/ConvertCurrecyPage";
import SavingsGoal from "@/pages/SavingGoalsPage";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="w-screen h-full">
      {location.pathname !== "/login" && <Navbar onLogout={handleLogout}/>}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/transactions" element={<ProtectedRoute user={user}><TransactionPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard/></ProtectedRoute>} />
        <Route path="/convertCurency" element={ <ConvertCurrency/> } />
        <Route path="/savingGoals" element={ <ProtectedRoute user={user}><SavingsGoal/></ProtectedRoute>} />
        <Route path="/transactions/:id" element={<ProtectedRoute user={user}><TransactionDetailPage /></ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

function ProtectedRoute({ user, children }: { user: any, children: JSX.Element }) {
  return user ? children : <Navigate to="/login" />;
}
