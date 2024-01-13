"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Rate } from "@prisma/client";
import { format } from "date-fns";
import EditRateBtn from "../buttons/rate/EditRateBtn";
import DeleteRateBtn from "../buttons/rate/DeleteRateBtn";

const ListofRates = () => {
  const { data: ratedata, isLoading } = useQuery<Rate[]>({
    queryKey: ["rate"],
    queryFn: async () => {
      const response = await axios.get("/api/rate");
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
    <div className="overflow-x-auto">
      <table className="table text-lg">
        {/* head */}
        <thead>
          <tr className="text-md">
            <th></th>
            <th>Name</th>
            <th>Rate Before 5&#58;00 p.m.</th>
            <th>Rate After 5&#58;00 p.m.</th>
            <th>Selected</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ratedata?.map((rates) => (
            <tr key={rates.id}>
              <th>{rates.id}</th>
              <th>{rates.name}</th>
              <td>{rates.ratebefore5}</td>
              <td>{rates.rateafter5}</td>
              <td>{rates.selected.toString()}</td>
              <td>{format(rates.createdAt, "dd/LL/yyyy HH:mm:ss")}</td>
              <td>{format(rates.updatedAt, "dd/LL/yyyy HH:mm:ss")}</td>
              <td className="space-y-2">
                <EditRateBtn rateId={rates.id} />
                <DeleteRateBtn rateId={rates.id} rateName={rates.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListofRates;
