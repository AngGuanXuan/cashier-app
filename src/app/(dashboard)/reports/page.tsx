import Header from "@/components/layouts/Header";
import PrintTotalSalesToday from "@/components/totalSalesPerDay/PrintTotalSalesToday";
import React from "react";

const reports = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Reports</h1>
        </div>
        <PrintTotalSalesToday />
      </div>
    </>
  );
};

export default reports;
