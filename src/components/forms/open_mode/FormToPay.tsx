import { foodBeveragePayValues } from "@/types/foodBeverage/food-beverage-pay";
import { TableSalesAllValues } from "@/types/table/table-sales-all";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import AddDiscount from "./AddDiscount";
import CustomerPay from "@/components/input/CustomerPay";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { HiPrinter } from "react-icons/hi2";

interface TableToPayDataProps {
  tableName: string;
  timeRate: string;
  initialValue: TableSalesAllValues;
}

const FormToPay: FC<TableToPayDataProps> = ({
  tableName,
  timeRate,
  initialValue,
}) => {
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

  // get fnb sales list
  const { data: fnBSalesData, isLoading } = useQuery<foodBeveragePayValues[]>({
    queryKey: ["fnbSales"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/open_mode/fnbSales/${initialValue.id}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{tableName}</h2>
      </div>
      <div className="space-y-4">
        <div ref={componentRef} className="p-2 text-xs font-mono">
          <div className="border-b-2 border-dashed border-black pb-4 text-center space-y-2">
            <h2>LCCL ENTERPRISE</h2>
            <h3>SS15 SUBANG JAYA</h3>
          </div>
          <div>
            <div className="pt-4">
              <h2>Invoice No - 000100{initialValue.id}</h2>
              <h2>{format(new Date(), "dd/LL/yyyy HH:mm:ss")}</h2>
            </div>
            <div className="pt-2">
              <h2>Table No &#69706; {initialValue.Table.name}</h2>
            </div>
            <div className="pt-6">
              <h2 className="uppercase">Transaction Details</h2>
            </div>
            <div className="pt-2">
              <h2 className="uppercase">&#91;Snooker&#93;</h2>
              <h2>Rate &#61; {initialValue.OperateTime.rate} &#92; 1 hr</h2>
            </div>
            <div className="pt-2">
              <h2 className="uppercase">&#91;Snooker&#93;</h2>
              <h2>
                {format(initialValue.createdAt, "HH:mm")} &#8210;{" "}
                {format(initialValue.tableStopTime, "HH:mm")}&nbsp; &#61;
                0&#69706;{initialValue.timeSpend}
              </h2>
            </div>
            <div className="pt-2">
              <h2 className="flex">
                Total Amount
                <span className="ms-auto">{initialValue.tableRateSales}</span>
              </h2>
            </div>
            <div className="pt-4">
              <h2 className="uppercase">&#91;Food &#38; Beverage&#93;</h2>
              <div className="pt-2">
                {fnBSalesData?.map((fnbPay) => (
                  <div key={fnbPay.id} className="pb-2">
                    <h2 className="flex">
                      {fnbPay.FoodBeverage.name} &#61;
                      <span className="ms-auto">
                        {fnbPay.FoodBeverage.price}
                      </span>
                    </h2>
                    <h2 className="flex">
                      &#10761;2 &#61;{" "}
                      <span className="ms-auto">RM {fnbPay.totalFnBSales}</span>
                    </h2>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <h2>
                {initialValue.totalBeforeDiscount} &#45; &#91;DIS&#93;
                {initialValue.discount} &#61;
              </h2>
              <h2 className="text-end">RM {initialValue.totalTableSales}</h2>
            </div>
            <div className="border-b-2 border-dashed border-black py-4"></div>
          </div>
          <div className="text-lg pt-4 flex">
            <h1>Total</h1>
            <h1 className="mx-auto">{initialValue.totalTableSales}</h1>
          </div>
          <div className="capitalize text-center pt-10">
            <h1>Thank You For Visit</h1>
            <h1>Please Come Again</h1>
          </div>
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
          <AddDiscount
            tableSalesId={initialValue.id}
            tableDiscount={initialValue.discount}
          />
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Total </h2>
          <h2 className="flex text-2xl font-semibold">
            RM
            <span className="w-36 text-end ms-2 px-4">
              {initialValue.totalTableSales}
            </span>
          </h2>
        </div>
      </div>
      <div className="divider"></div>
      <CustomerPay
        tableSalesId={initialValue.id}
        totalTableSales={initialValue.totalTableSales}
      />
    </div>
  );
};

export default FormToPay;
