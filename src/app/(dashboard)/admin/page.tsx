import React from "react";
import Header from "@/components/layouts/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { IoIosSave, IoIosPrint } from "react-icons/io";
import FormSelectRate from "@/components/forms/FormSelectRate";
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
                      <p>Click on "Operate Now" to start cashier mode.</p>
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

          <div className="flex flex-row space-x-4">
            <div className="card border-2 border-neutral w-1/4">
              <div className="card-body space-y-2">
                <div>
                  <h2 className="card-title">Total Sales Today</h2>
                </div>
                <div className="flex items-end !mt-auto space-x-2">
                  <span className="text-sm text-neutral-400">RM</span>
                  <h1 className="text-3xl font-semibold">1,000</h1>
                </div>
              </div>
            </div>
            <div className="card border-2 border-success w-1/4">
              <div className="card-body space-y-2">
                <div>
                  <h2 className="card-title">Total Table Sales Today</h2>
                </div>
                <div className="flex items-end !mt-auto space-x-2">
                  <span className="text-sm text-neutral-400">RM</span>
                  <h1 className="text-3xl font-semibold">1,000</h1>
                </div>
              </div>
            </div>
            <div className="card border-2 border-neutral w-1/4">
              <div className="card-body space-y-2">
                <div>
                  <h2 className="card-title">
                    Total Food &amp; Beverage Sales Today
                  </h2>
                </div>
                <div className="flex items-end !mt-auto space-x-2">
                  <span className="text-sm text-neutral-400">RM</span>
                  <h1 className="text-3xl font-semibold">1,000</h1>
                </div>
              </div>
            </div>
            <div className="card border border-neutral w-1/4">
              <div className="card-body space-y-2">
                <div>
                  <h2 className="card-title font-medium text-neutral-700">
                    Print Today Sales
                  </h2>
                </div>
                <button className="btn btn-accent !mt-auto w-full">
                  <IoIosPrint />
                  Print
                </button>
              </div>
            </div>
          </div>
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
