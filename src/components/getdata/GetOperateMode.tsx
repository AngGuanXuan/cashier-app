"use client";
import { OperateTime } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface OperateModeProps {
  children: ReactNode;
}

const GetOperateMode: FC<OperateModeProps> = ({ children }) => {
  // get operate time
  const { data, isLoading } = useQuery<OperateTime>({
    queryKey: ["OperateTime"],
    queryFn: async () => {
      const response = await axios.get("/api/open_mode/startTime");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <span className="loading loading-ring loading-lg m-auto"></span>
      </div>
    );
  } else {
    if (data) {
      return (
        <div>
          {redirect("/open_mode")}
          <div>{children}</div>
        </div>
      );
    } else {
      return <div>{children}</div>;
    }
  }
};

export default GetOperateMode;
