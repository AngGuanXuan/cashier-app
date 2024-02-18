import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";

interface FnBDetailsProps {
  fnbId: number;
  fnbAmount: number;
}

const GetFnBDetailsReceipt: FC<FnBDetailsProps> = ({ fnbId, fnbAmount }) => {
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
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <>
      <p>{data.name}</p>
      <p>{fnbAmount} unit&#40;s&#41;</p>
    </>
  );
};

export default GetFnBDetailsReceipt;
