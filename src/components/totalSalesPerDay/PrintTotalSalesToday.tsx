"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoIosPrint } from "react-icons/io";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";

type TotalSalesValues = {
  totalTableSales: string;
  totalFnBSales: string;
  TotalDiscount: string;
  totalDaySales: string;
};

const PrintTotalSalesToday = () => {
  // get data
  const { data: totalSalesdata, isLoading } = useQuery<TotalSalesValues>({
    queryKey: ["totalSales"],
    queryFn: async () => {
      const response = await axios.get("/api/totalSalesPerDay");
      return response.data;
    },
  });

  // print receipt
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: 48mm auto;
        margin: 20mm 0;
      }
    }`,
    content: () => componentRef.current,
  });

  if (isLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-row space-x-4">
        <div className="card border-2 border-neutral w-1/4">
          <div className="card-body space-y-2">
            <div>
              <h2 className="card-title">Total Table Today</h2>
            </div>
            <div className="flex items-end !mt-auto space-x-2">
              <span className="text-sm text-neutral-400">RM</span>
              <h1 className="text-3xl font-semibold">
                {totalSalesdata?.totalTableSales}
              </h1>
            </div>
          </div>
        </div>
        <div className="card border-2 border-success w-1/4">
          <div className="card-body space-y-2">
            <div>
              <h2 className="card-title">Total Food &amp; Beverage Today</h2>
            </div>
            <div className="flex items-end !mt-auto space-x-2">
              <span className="text-sm text-neutral-400">RM</span>
              <h1 className="text-3xl font-semibold">
                {totalSalesdata?.totalFnBSales}
              </h1>
            </div>
          </div>
        </div>
        <div className="card border-2 border-neutral w-1/4">
          <div className="card-body space-y-2">
            <div>
              <h2 className="card-title">Total Sales Today</h2>
            </div>
            <div className="flex items-end !mt-auto space-x-2">
              <span className="text-sm text-neutral-400">RM</span>
              <h1 className="text-3xl font-semibold">
                {totalSalesdata?.totalDaySales}
              </h1>
            </div>
          </div>
        </div>
        <div className="card border border-neutral w-1/4">
          <div className="card-body space-y-2">
            <div>
              <h2 className="card-title">Total Discount Given Today</h2>
            </div>
            <div className="flex items-end !mt-auto space-x-2">
              <span className="text-sm text-neutral-400">RM</span>
              <h1 className="text-3xl font-semibold">
                {totalSalesdata?.TotalDiscount}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handlePrint}
          className="btn btn-accent !mt-auto w-full"
        >
          <IoIosPrint />
          Print Today Sales
        </button>
      </div>
      <div ref={componentRef} className="p-2 text-xs font-mono">
        <div className="border-b-2 border-dashed border-black pb-4 text-center space-y-2">
          <h2>LCCL ENTERPRISE</h2>
          <h3>SS15 SUBANG JAYA</h3>
        </div>
        <div>
          <div className="pt-4">
            <h2>{format(new Date(), "dd/LL/yyyy HH:mm:ss")}</h2>
          </div>
          <div className="pt-2">
            <h2>Total Table Sales Today &#69706;</h2>
            <p>RM {totalSalesdata?.totalTableSales}</p>
          </div>
          <div className="pt-2">
            <h2>Total Food &amp; Beverage Sales Today &#69706;</h2>
            <p>RM {totalSalesdata?.totalFnBSales}</p>
          </div>
          <div className="pt-2">
            <h2>Total Sales Today &#69706;</h2>
            <p>RM {totalSalesdata?.totalDaySales}</p>
          </div>
          <div className="pt-2">
            <h2>Total Discount Given Today &#69706;</h2>
            <p>RM {totalSalesdata?.TotalDiscount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintTotalSalesToday;
