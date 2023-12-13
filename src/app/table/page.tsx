import Header from '@/components/layouts/Header';
import ListofTables from '@/components/ListofTables';
import Link from 'next/link';
import { IoMdAdd } from "react-icons/io";
import React from 'react';


const page = () => {
  return (
    <>
        <Header />
        <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-semibold">List Of Table</h1>
                <Link href="" className="btn btn-neutral font-bold"><IoMdAdd /> Add Table</Link>
            </div>
            <ListofTables />
        </div>
    </>
  );
};

export default page;