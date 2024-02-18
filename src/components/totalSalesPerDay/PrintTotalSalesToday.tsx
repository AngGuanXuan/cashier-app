"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoIosPrint } from "react-icons/io";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { CompanyDetailsValues } from "@/types/company-details";
import FoodBeverageSalesDetails from "./FoodBeverageSalesDetails";
import { OperateTime } from "@prisma/client";
import FnBDetailsReceipt from "./FnBDetailsReceipt";

const PrintTotalSalesToday = () => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(true);

  // accordion open close
  const openAccordion = () => {
    accordionOpen ? setAccordionOpen(false) : setAccordionOpen(true);
  };

  // get company data
  const { data: companydata, isLoading: companyDataLoading } =
    useQuery<CompanyDetailsValues>({
      queryKey: ["company"],
      queryFn: async () => {
        const response = await axios.get("/api/company");
        return response.data;
      },
    });

  // get total sales data
  const { data: totalSalesdata, isLoading } = useQuery<OperateTime>({
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

  if (companyDataLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-10">
      <div>
        <h2 className="text-neutral-600 font-semibold">
          Last Updated&#58; &nbsp;
          {format(
            totalSalesdata?.updatedAt ? totalSalesdata?.updatedAt : "no time",
            "dd/LL/yyyy HH:mm:ss"
          )}
        </h2>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="card shadow border-2 border-neutral/50 w-1/4">
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
        <div className="card shadow border border-neutral/50 w-1/4">
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
        <div className="card shadow border border-neutral/50 w-1/4">
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
        <div className="card shadow border border-neutral/50 w-1/4">
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
      <div className="py-10">
        <div>
          <h2 className="text-neutral-600 font-semibold">
            Food &amp; Beverage Sales Details
          </h2>
        </div>
        <div>
          <div
            className={`${
              accordionOpen ? "collapse-open" : "collapse"
            } collapse-arrow bg-base-200 cursor-pointer select-none`}
            onClick={openAccordion}
          >
            <div className="collapse-title text-xl font-medium">
              Check Food &amp; Beverage Sales Details
            </div>
            <div className="collapse-content">
              <FoodBeverageSalesDetails
                opTimeId={totalSalesdata?.id ? totalSalesdata?.id : 1}
              />
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
        <div className="border-b border-dashed border-black py-4"></div>
        <div className="border-b-2 border-dashed border-black py-4 text-center space-y-2">
          <h2>{companydata?.name}</h2>
          <p>
            {companydata?.address_1}, {companydata?.address_2} <br />
            {companydata?.city}, {companydata?.posCode},{" "}
            {companydata?.state.name}
          </p>
          <h3>{companydata?.phone_no}</h3>
          <h3>{companydata?.email}</h3>
        </div>
        <div className="px-2">
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
            <h2>In Details &#69706;</h2>
            <div className="ps-2">
              <FnBDetailsReceipt
                opTimeId={totalSalesdata?.id ? totalSalesdata?.id : 1}
              />
            </div>
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
        <div className="border-b border-dashed border-black py-4"></div>
      </div>
    </div>
  );
};

export default PrintTotalSalesToday;
