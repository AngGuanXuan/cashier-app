"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import FormSettings from "../forms/FormSettings";

const GetCompanyData = () => {
  // get ori data
  const { data: companydata, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const response = await axios.get("/api/company");
      return response.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return <FormSettings initialValue={companydata} />;
};

export default GetCompanyData;
