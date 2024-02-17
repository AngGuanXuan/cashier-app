import { CompanyDetailsValues } from "@/types/company-details";
import { foodBeveragePayValues } from "@/types/foodBeverage/food-beverage-pay";
import { FnBSalesIndvidual } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import React, { FC, useRef } from "react";
import { HiPrinter } from "react-icons/hi2";
import { useReactToPrint } from "react-to-print";
import AddDiscountFnBIndvSales from "./AddDiscountFnBIndvSales";
import FnBIndvSalesPay from "@/components/input/FnBIndvSalesPay";

interface FnBIndividualProps {
  FnBIndvSales: FnBSalesIndvidual;
}

const FormFnBIndvSales: FC<FnBIndividualProps> = ({ FnBIndvSales }) => {
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

  // get company data
  const { data: companydata, isLoading: companyDataLoading } =
    useQuery<CompanyDetailsValues>({
      queryKey: ["company"],
      queryFn: async () => {
        const response = await axios.get("/api/company");
        return response.data;
      },
    });

  // get fnb sales list
  const { data: fnBSalesData, isLoading: fnBSalesLoading } = useQuery<
    foodBeveragePayValues[]
  >({
    queryKey: ["fnbSales"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/open_mode/fnbSales/individual/${FnBIndvSales.id}`
      );
      return response.data;
    },
  });

  if (companyDataLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  } else if (fnBSalesLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
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
              <h2>Invoice No - FnB-000{FnBIndvSales.id}</h2>
              <h2>{format(new Date(), "dd/LL/yyyy HH:mm:ss")}</h2>
            </div>
          </div>
          <div className="pt-6">
            <h2 className="uppercase">Transaction Details</h2>
          </div>
          <div className="pt-4">
            {fnBSalesData == undefined ? (
              <h2 className="uppercase">&#91;Food &#38; Beverage&#93;</h2>
            ) : (
              ""
            )}
            <div className="pt-2">
              {fnBSalesData?.map((fnbPay) => (
                <div key={fnbPay.id} className="pb-2">
                  <h2 className="flex">{fnbPay.FoodBeverage.name}</h2>
                  <h2 className="flex">
                    RM {fnbPay.FoodBeverage.price} &#10761; {fnbPay.amount}{" "}
                    &#61;{" "}
                    <span className="ms-auto">RM {fnbPay.totalFnBSales}</span>
                  </h2>
                </div>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <h2>
                {FnBIndvSales.totalBeforeDiscount} &#45; &#91;DIS&#93;
                {FnBIndvSales.discount} &#61;
              </h2>
              <h2 className="text-end">RM {FnBIndvSales.totalIndvFnBSales}</h2>
            </div>
            <div className="border-b-2 border-dashed border-black py-4"></div>
          </div>
          <div className="text-lg pt-4 flex">
            <h1>Total</h1>
            <h1 className="mx-auto">{FnBIndvSales.totalIndvFnBSales}</h1>
          </div>
          <div className="capitalize text-center pt-10">
            <h1>Thank You For Visit</h1>
            <h1>Please Come Again</h1>
          </div>
          <div className="border-b border-dashed border-black py-4"></div>
        </div>
        <div className="text-center">
          <button onClick={handlePrint} className="btn btn-success">
            <HiPrinter />
            Print Receipt
          </button>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Discount Given</h2>
          <AddDiscountFnBIndvSales
            FnBIndvSalesId={FnBIndvSales.id}
            FnBIndvSalesDiscount={FnBIndvSales.discount}
          />
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Total </h2>
          <h2 className="flex text-2xl font-semibold">
            RM
            <span className="w-36 text-end ms-2 px-4">
              {FnBIndvSales.totalIndvFnBSales}
            </span>
          </h2>
        </div>
      </div>
      <div className="divider"></div>
      <FnBIndvSalesPay
        FnBIndvSalesId={FnBIndvSales.id}
        FnBIndvTotalSales={FnBIndvSales.totalIndvFnBSales}
      />
    </div>
  );
};

export default FormFnBIndvSales;
