import { foodBeveragePayValues } from "@/types/foodBeverage/food-beverage-pay";
import { TableSales } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import AddDiscount from "./AddDiscount";
import CustomerPay from "@/components/input/CustomerPay";

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
        <div className="py-2 px-10">
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
                  <th>{initialValue.hourSpend} Hour&#40;s&#41;</th>
                  <th>RM {timeRate}</th>
                  <th className="text-lg text-end">
                    RM {initialValue.tableRateSales}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-2 px-10">
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
                    <th>RM {fnbPay.FoodBeverage.price}</th>
                    <th>{fnbPay.amount}</th>
                    <td className="text-lg text-end">
                      RM {fnbPay.totalFnBSales}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2">
                  <th className="text-lg" colSpan={3}>
                    Food &amp; Beverage Total &#40;RM&#41;
                  </th>
                  <th className="text-lg text-end">
                    RM {initialValue.totalFnBSales}
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
            RM {initialValue.totalTableSales}
          </h2>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Discount Given &#40;RM&#41;</h2>
          <AddDiscount
            tableSalesId={initialValue.id}
            tableDiscount={initialValue.discount}
          />
        </div>
      </div>
      <div className="divider"></div>
      <CustomerPay
        totalTableSales={initialValue.totalTableSales}
        customerPay={initialValue.customerPay}
        salesBalance={initialValue.balance}
      />
    </div>
  );
};

export default FormToPay;
