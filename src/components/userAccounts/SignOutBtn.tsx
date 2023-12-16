"use client";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/`,
        })
      }
      className="btn btn-neutral"
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
