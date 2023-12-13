import React from 'react';
import Header from '@/components/layouts/Header';
import Link from 'next/link';
import { IoMdAdd } from "react-icons/io";
import ListofRates from '@/components/ListofRates';

const HourlyRate = () => {
  return (
    <>
        <Header />
        <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
             <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-semibold">List Of Hourly Rate</h1>
                <Link href="" className="btn btn-neutral font-bold"><IoMdAdd /> Add Hourly Rate</Link>
            </div>
            <ListofRates />
        </div>
    </>
  );
};

export default HourlyRate;