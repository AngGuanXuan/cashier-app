import React from "react";
import Header from "@/components/layouts/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/components/User";
import { IoIosSave, IoIosPrint } from "react-icons/io";

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
            <span className="font-semibold uppercase">
              {session?.user.username
                ? session?.user.username
                : session?.user.name
                ? session?.user.name
                : "User"}
            </span>
            .
          </h2>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <div className="card bg-transparent shadow-xl">
              <div className="card-body space-y-4">
                <div>
                  <h2 className="card-title">Select Today Rate</h2>
                  <p>Please select the hourly rate for your table today</p>
                </div>
                <div className="space-y-4">
                  <select className="select select-info w-full">
                    <option disabled selected>
                      Select rate
                    </option>
                    <option>Normal rate - RM 3.00</option>
                    <option>Promotion - RM 2.00</option>
                  </select>
                  <button className="btn btn-neutral w-full">
                    <IoIosSave />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow-xl p-10 w-1/2">
            <button className="ms-auto btn btn-accent w-fit">
              <IoIosPrint />
              Print
            </button>
            <div className="flex-col space-y-4">
              <div className="card shadow-xl">
                <div className="card-body space-y-2">
                  <div>
                    <h2 className="card-title">Total Table Sales Today</h2>
                    <p>Total Table earn for today</p>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-sm">RM</span>
                    <h1 className="text-3xl font-semibold">1,000</h1>
                  </div>
                </div>
              </div>
              <div className="card shadow-xl">
                <div className="card-body space-y-2">
                  <div>
                    <h2 className="card-title">
                      Total Food &amp; Beverage Today
                    </h2>
                    <p>Total Food &amp; Beverage earn for today</p>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-sm">RM</span>
                    <h1 className="text-3xl font-semibold">1,000</h1>
                  </div>
                </div>
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
