import React from "react";
import Header from "@/components/layouts/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import FormSelectRate from "@/components/forms/FormSelectRate";
import PrintTotalSalesToday from "@/components/totalSalesPerDay/PrintTotalSalesToday";
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
        </div>
        <div className="flex flex-col space-y-10">
          <div className="flex flex-row space-x-4">
            <div className="w-1/2">
              <div className="card bg-accent shadow-xl h-full">
                <div className="card-body space-y-2">
                  <div>
                    <h2 className="card-title">Welcome&#44;</h2>
                  </div>
                  <div className="flex flex-col space-y-8">
                    <h2 className="text-4xl font-semibold">
                      {session?.user.username
                        ? session?.user.username
                        : session?.user.name
                        ? session?.user.name
                        : "User"}
                      &#46;
                    </h2>
                    <div className="divider"></div>
                    <div className="mt-auto space-y-2">
                      <h3 className="font-medium">Tips:</h3>
                      <p>
                        Click on &#34;Operate Now&#34; to start cashier mode.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="card h-full bg-transparent shadow-xl">
                <div className="card-body h-full space-y-4">
                  <div>
                    <h2 className="card-title">Select Today Rate</h2>
                    <p>Select today rate for each table</p>
                  </div>
                  <div>
                    <FormSelectRate />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {session?.user.email == "lccl.enterprise@gmail.com" ? (
            <PrintTotalSalesToday />
          ) : (
            "2022-01-14 18:13:00"
          )}
        </div>
        {/* <div>
          <h2>Client Session</h2>
          <User />
          <h2>Server Session</h2>
          {JSON.stringify(session)}
        </div> */}
      </div>
    </>
  );
};

export default page;
