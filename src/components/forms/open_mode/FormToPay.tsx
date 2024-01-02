import { foodBeveragePayValues } from "@/types/foodBeverage/food-beverage-pay";
import { TableSales } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";

interface TableToPayDataProps {
  tableName: string;
  timeRate: string;
  initialValue: TableSales;
}

const FormToPay: FC<TableToPayDataProps> = ({
  tableName,
  timeRate,
  initialValue,
}) => {
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
        <div className="p-2">
          <h2 className="font-semibold">Table Price</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="text-lg">
                <tr>
                  <th>Note</th>
                  <th>Hour&#40;s&#41;</th>
                  <th>Rate &#40;RM&#41;</th>
                  <th className="text-end">Amount &#40;RM&#41;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{initialValue.note}</td>
                  <td>{initialValue.hourSpend}</td>
                  <td>{timeRate}</td>
                  <th className="text-lg text-end">
                    {initialValue.tableRateSales}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-2">
          <h2 className="font-semibold">Food &amp; Beverage</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="text-lg">
                <tr>
                  <th>Name</th>
                  <th>Price &#40;RM&#41;</th>
                  <th>Amount</th>
                  <th className="text-end">Total &#40;RM&#41;</th>
                </tr>
              </thead>
              <tbody>
                {fnBSalesData?.map((fnbPay) => (
                  <tr key={fnbPay.id}>
                    <th>{fnbPay.FoodBeverage.name}</th>
                    <td>{fnbPay.FoodBeverage.price}</td>
                    <td>{fnbPay.amount}</td>
                    <td className="text-lg text-end">{fnbPay.totalFnBSales}</td>
                  </tr>
                ))}
                <tr className="border-t-2">
                  <th className="text-lg" colSpan={3}>
                    Food &amp; Beverage Total &#40;RM&#41;
                  </th>
                  <th className="text-lg text-end">
                    {initialValue.totalFnBSales}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Total &#40;RM&#41;</h2>
          <h2 className="text-2xl font-semibold">
            {initialValue.totalTableSales}
          </h2>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Discount &#40;RM&#41;</h2>
          <input
            type="text"
            placeholder="Discount"
            className="input input-bordered rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FormToPay;
