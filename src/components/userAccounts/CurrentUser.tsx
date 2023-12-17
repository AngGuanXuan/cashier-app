import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const currentuser = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex space-x-4">
      <div className="w-1/2 space-y-2">
        <label className="text-neutral-700">Current User</label>
        <input
          type="text"
          name="currentuser"
          placeholder="Current User"
          value={session?.user.username}
          className="input input-bordered !border-neutral-200 w-full"
          disabled
        />
      </div>
    </div>
  );
};

export default currentuser;
