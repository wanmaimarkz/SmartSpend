import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("สมัครสมาชิกสำเร็จ!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("เข้าสู่ระบบสำเร็จ!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    const googleLogin = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
          alert("เข้าสู่ระบบด้วย Google สำเร็จ!");
        } catch (error: any) {
          alert(error.message);
        }
      };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold mb-4">เข้าสู่ระบบ / สมัครสมาชิก</h1>
            <input
                type="email"
                placeholder="Email"
                className="border p-2 mb-2"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 mb-2"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 rounded m-2" onClick={login}>
                เข้าสู่ระบบ
            </button>
            <button className="bg-green-500 text-white p-2 rounded" onClick={register}>
                สมัครสมาชิก
            </button>
            <button className="bg-red-500 text-white p-2 rounded mt-2" onClick={googleLogin}>
                เข้าสู่ระบบด้วย Google
            </button>

        </div>
    );
}
