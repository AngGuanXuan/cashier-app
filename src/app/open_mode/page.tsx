"use client";
import { redirect, useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import GetTableList from "@/components/getdata/GetTableList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GetOperateTimer from "@/components/getdata/GetOperateTimer";
import EndOperateBtn from "@/components/buttons/open_mode/EndOperateBtn";

const OpenMode = () => {
  const router = useRouter();

  // get operate time
  const { data: timeData, isLoading } = useQuery({
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
    if (!timeData) {
      return redirect("/admin");
    } else {
      return (
        <div className="flex min-h-screen bg-gray-900 text-white">
          <div className="w-8/12 p-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Tables List</h2>
            </div>
            <GetTableList timeData={timeData} />
          </div>
          <div className="w-4/12 p-4">
            <div className="bg-indigo-950/50 shadow-lg rounded-md h-full">
              <div className="flex flex-row items-center space-x-4 bg-indigo-950 px-8 py-6 shadow-md justify-end">
                <h1 className="badge badge-outline badge-error text-lg font-bold uppercase text-white p-5 pointer-events-none">
                  Open Now
                </h1>
                <EndOperateBtn timeData={timeData} />
              </div>
              <div className="p-4">
                <div className="space-y-4 py-8">
                  <div className="text-center">
                    <GetOperateTimer timeData={timeData} />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>Note</label>
                    <TextareaAutosize
                      name="note"
                      minRows={3}
                      className="textarea textarea-bordered text-black"
                      placeholder="note"
                    />
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default OpenMode;
