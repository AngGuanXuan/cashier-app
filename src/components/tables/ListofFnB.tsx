import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const ListofFnB = () => {
  return (
    <div className="overflow-x-auto">
        <table className="table text-lg">
            {/* head */}
            <thead>
            <tr className="text-md">
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
            <tr >
                <th>1</th>
                <th>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <Image
                                    src="/images/food&beverage/100_plus.jpg"
                                    width="800"
                                    height="800"
                                    alt="100_plus"
                                    className="h-full object-cover object-left shadow-md pointer-events-none select-none"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">100 Plus</div>
                        </div>
                    </div>
                </th>
                <td>RM 3.00</td>
                <td>12 December 2023</td>
                <td>12 December 2023</td>
                <td className="space-x-2">
                    <Link href="" className="btn btn-neutral"><FaEdit />Edit</Link>
                    <Link href="" className="btn btn-secondary"><FaTrashAlt />Delete</Link>
                </td>
            </tr>
            {/* row 2 */}
            <tr >
                <th>1</th>
                <th>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <Image
                                    src="/images/food&beverage/cocacola.jpg"
                                    width="522"
                                    height="522"
                                    alt="cocacola"
                                    className="h-full object-cover object-left shadow-md pointer-events-none select-none"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">Coca Cola</div>
                        </div>
                    </div>
                </th>
                <td>RM 3.00</td>
                <td>12 December 2023</td>
                <td>12 December 2023</td>
                <td className="space-x-2">
                    <Link href="" className="btn btn-neutral"><FaEdit />Edit</Link>
                    <Link href="" className="btn btn-secondary"><FaTrashAlt />Delete</Link>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
  );
};

export default ListofFnB;