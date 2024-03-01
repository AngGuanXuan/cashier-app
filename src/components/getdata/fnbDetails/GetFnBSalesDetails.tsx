import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";

interface FnBDetailsProps {
  fnbId: number;
  fnbAmount: number;
}

const GetFnBSalesDetails: FC<FnBDetailsProps> = ({ fnbId, fnbAmount }) => {
  // get fnb data
  const { data, isLoading } = useQuery({
    queryKey: ["foodbeverage", fnbId],
    queryFn: async () => {
      const response = await axios.get(`/api/foodbeverage/${fnbId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <th className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </th>
    );
  }

  return (
    <>
      <th>{data.name}</th>
      <td>RM {data.price}</td>
      <th>{fnbAmount} unit&#40;s&#41;</th>
      <td>RM {(parseFloat(data.price) * fnbAmount).toFixed(2)}</td>
    </>
  );
};

export default GetFnBSalesDetails;
