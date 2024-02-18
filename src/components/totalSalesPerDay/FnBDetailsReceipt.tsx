import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import GetFnBDetailsReceipt from "../getdata/fnbDetails/GetFnBDetailsReceipt";

interface FnBSalesDetailsProps {
  opTimeId: number;
}
type fnbSalesDetailsValues = {
  _sum: {
    amount: number;
  };
  foodBeverageId: number;
};

const FnBDetailsReceipt: FC<FnBSalesDetailsProps> = ({ opTimeId }) => {
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
      {fnbSalesDetailsData?.map((fnbDetails) => (
        <p key={fnbDetails.foodBeverageId}>
          <GetFnBDetailsReceipt
            fnbId={fnbDetails.foodBeverageId}
            fnbAmount={fnbDetails._sum.amount}
          />
        </p>
      ))}
    </div>
  );
};

export default FnBDetailsReceipt;
