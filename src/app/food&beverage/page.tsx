import React from 'react';
import Header from '@/components/layouts/Header';
import Link from 'next/link';
import { IoMdAdd } from "react-icons/io";
import ListofFnB from '@/components/ListofFnB';

const page = () => {
  return (
    <>
        <Header />
        <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
             <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-semibold">List Of Food &amp; Beverage</h1>
                <Link href="" className="btn btn-neutral font-bold"><IoMdAdd /> Add Food or Beverage</Link>
            </div>
            <ListofFnB />
        </div>
    </>
  );
};

export default page;