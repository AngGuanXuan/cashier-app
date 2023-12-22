"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const GoogleSignInBtn = () => {
  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/admin" });
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="w-full btn btn-accent border-none"
    >
      <FaGoogle />
      Sign In with Google
    </button>
  );
};

export default GoogleSignInBtn;
