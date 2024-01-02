import GetOperateMode from "@/components/getdata/GetOperateMode";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <GetOperateMode>
        <div>{children}</div>
      </GetOperateMode>
    );
  } else {
    redirect("/");
  }
};

export default DashboardLayout;
