import React from 'react';
import Header from "@/components/layouts/Header";

const page = () => {
  return (
    <>
    <Header />
    <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
    </div>
    </>
    
  );
};

export default page;