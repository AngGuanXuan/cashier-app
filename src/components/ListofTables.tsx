import React from 'react';
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const ListofTables = () => {
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
            {/* row 1 */}
            <tr >
                <th>1</th>
                <th>Table 1</th>
                <td>12 December 2023</td>
                <td>12 December 2023</td>
                <td className="space-x-2">
                    <Link href="" className="btn btn-neutral"><FaEdit />Edit</Link>
                    <Link href="" className="btn btn-secondary"><FaTrashAlt />Delete</Link>
                </td>
            </tr>
            {/* row 2 */}
            <tr >
                <th>2</th>
                <th>Table 2</th>
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
  )
}

export default ListofTables