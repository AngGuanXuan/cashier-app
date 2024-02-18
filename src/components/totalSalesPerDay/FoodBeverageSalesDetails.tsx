import { foodBeverageAllValues } from "@/types/foodBeverage/food-beverage-all";
import { foodBeveragePayValues } from "@/types/foodBeverage/food-beverage-pay";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import GetFnBSalesDetails from "../getdata/fnbDetails/GetFnBSalesDetails";

interface FnBSalesDetailsProps {
  opTimeId: number;
}
type fnbSalesDetailsValues = {
  _sum: {
    amount: number;
  };
  foodBeverageId: number;
};

const FoodBeverageSalesDetails: FC<FnBSalesDetailsProps> = ({ opTimeId }) => {
  // get fnb sales details data
  const { data: fnbSalesDetailsData, isLoading: fnbDetailsLoading } = useQuery<
    fnbSalesDetailsValues[]
  >({
    queryKey: ["foodbeverage"],
    queryFn: async () => {
      const response = await axios.get("/api/totalSalesPerDay/fnbSalesDetails");
      return response.data;
    },
  });

  if (fnbDetailsLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>FnB id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount Sold</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {fnbSalesDetailsData?.map((fnbDetails) => (
            <tr key={fnbDetails.foodBeverageId}>
              <th>{fnbDetails.foodBeverageId}</th>
              <GetFnBSalesDetails
                fnbId={fnbDetails.foodBeverageId}
                fnbAmount={fnbDetails._sum.amount}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodBeverageSalesDetails;
