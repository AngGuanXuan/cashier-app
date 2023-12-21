import AddTableBtn from "@/components/buttons/table/AddTableBtn";
import Header from "@/components/layouts/Header";
import ListofTables from "@/components/lists/ListofTables";
import React, { useState } from "react";

const page = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">List Of Table</h1>
          <AddTableBtn />
        </div>
        <ListofTables />
      </div>
    </>
  );
};

export default page;
