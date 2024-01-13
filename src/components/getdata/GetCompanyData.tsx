"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import FormSettings from "../forms/FormSettings";

const GetCompanyData = () => {
  // get company data
  const { data: companydata, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const response = await axios.get("/api/company");
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

  return <FormSettings initialValue={companydata} />;
};

export default GetCompanyData;
