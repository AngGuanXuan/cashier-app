import React from "react";
import Header from "@/components/layouts/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/components/User";

const page = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <h2 className="text-lg font-medium">
            Welcome{" "}
            <span className="font-semibold">
              {session?.user.username ? session?.user.username : "User"}
            </span>
            .
          </h2>
        </div>
        <div>
          <h2>Client Session</h2>
          <User />
          <h2>Server Session</h2>
          {JSON.stringify(session)}
        </div>
      </div>
    </>
  );
};

export default page;
