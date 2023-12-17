import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { State } from "@prisma/client";

const ListofStates = () => {
  const { data } = useQuery<State[]>({
    queryKey: ["states"],
    queryFn: async () => {
      const response = await axios.get("/api/state");
      return response.data;
    },
  });

  return (
    <>
      <option disabled value="DEFAULT">
        State
      </option>
      {data?.map((states) => (
        <option key={states.name} value={states.name}>
          {states.name}
        </option>
      ))}
    </>
  );
};

export default ListofStates;
