"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import EditTableBtn from "../buttons/table/EditTableBtn";
import DeleteTableBtn from "../buttons/table/DeleteTableBtn";

const ListofTables = () => {
  const { data: tabledata, isLoading } = useQuery<Table[]>({
    queryKey: ["table"],
    queryFn: async () => {
      const response = await axios.get("/api/table");
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
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tabledata?.map((table) => (
            <tr key={table.id}>
              <th>{table.id}</th>
              <th>{table.name}</th>
              <td>{format(table.createdAt, "dd/LL/yyyy HH:mm:ss")}</td>
              <td>{format(table.updatedAt, "dd/LL/yyyy HH:mm:ss")}</td>
              <td className="space-x-2">
                <EditTableBtn tableId={table.id} />
                <DeleteTableBtn tableId={table.id} tableName={table.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListofTables;
