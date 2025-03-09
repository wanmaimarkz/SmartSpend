import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Import useNavigate
import { auth, googleProvider } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // sendPasswordResetEmail,
  signInWithPopup
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Sign-In successful!");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // const handleResetPassword = async () => {
  //   if (!email) {
  //     alert("Please enter your email to reset password.");
  //     return;
  //   }
  //   try {
  //     await sendPasswordResetEmail(auth, email);
  //     alert("Password reset email sent! Check your inbox.");
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };

  return (
    <Card className="w-96 flex flex-col">
      <CardHeader>
        <CardTitle className="text-center">{isRegister ? "Register" : "Sign In"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col w-full justify-center gap-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
          className="rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
          className="rounded-full bg-blue-500 text-white hover:bg-blue-700"
           type="submit">{isRegister ? "Register" : "Sign In"}
           </Button>
        </form>

        <div className="flex w-full justify-center">
          <Button
            onClick={handleGoogleSignIn}
            className="mt-3 flex rounded-full items-center justify-center gap-2 hover:bg-gray-200 text-black bg-gray-100"
          >
            <FcGoogle size={20}  /> Sign in with Google
          </Button>
        </div>


        {/* <p
          className="text-sm text-blue-500 text-center mt-3 cursor-pointer"
          onClick={handleResetPassword}
        >
          Forgot Password? Reset Here
        </p> */}

        <p className="text-sm text-center mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 cursor-pointer"
          >
            {isRegister ? "Sign In" : "Register"}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
