"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { foodBeverageAllValues } from "@/types/food-beverage-all";
import DeleteFoodBeverageBtn from "../buttons/foodBeverage/DeleteFoodBeverageBtn";
import EditFoodBeverageBtn from "../buttons/foodBeverage/EditFoodBeverageBtn";

const ListofFnB = () => {
  const { data: foodbeveragedata, isLoading } = useQuery<
    foodBeverageAllValues[]
  >({
    queryKey: ["foodbeverage"],
    queryFn: async () => {
      const response = await axios.get("/api/foodbeverage");
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
            <th>Price</th>
            <th>Category</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foodbeveragedata?.map((fnb) => (
            <tr key={fnb.id}>
              <th>{fnb.id}</th>
              <th>{fnb.name}</th>
              <td>{fnb.price}</td>
              <td>{fnb.Category.name}</td>
              <td>{format(fnb.createdAt, "dd/LL/yyyy HH:mm:ss")}</td>
              <td>{format(fnb.updatedAt, "dd/LL/yyyy HH:mm:ss")}</td>
              <td className="space-x-2">
                <EditFoodBeverageBtn fnbId={fnb.id} />
                <DeleteFoodBeverageBtn fnbId={fnb.id} fnbName={fnb.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListofFnB;
