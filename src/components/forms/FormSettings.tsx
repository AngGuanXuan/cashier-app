import React from 'react';
import { IoIosSave } from "react-icons/io";

const FormSettings = () => {
  return (
    <div className="w-full my-auto px-4">
        <div className="w-full space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Company Details</h2>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2 space-y-2">
                    <label className="text-neutral-700">Company Name</label>
                    <input type="text" placeholder="Company Name" className="input input-bordered w-full" />
                </div>
                <div className="w-1/2 space-y-2">
                    <label className="text-neutral-700">Company Email</label>
                    <input type="email" placeholder="Company Email" className="input input-bordered w-full" />
                </div>
            </div>
            <div className="w-1/2 pe-2 space-y-2">
                <label className="text-neutral-700">Company Phone No.</label>
                <input type="email" placeholder="Company Phone No." className="input input-bordered w-full" />
            </div>
            <div className="divider py-8"></div> 
            <div>
                <h3 className="text-lg font-medium">Company Address</h3>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2 space-y-2">
                    <label className="text-neutral-700">Address line 1</label>
                    <input type="text" placeholder="Address Line 1" className="input input-bordered w-full" />
                </div>
                <div className="w-1/2 space-y-2">
                    <label className="text-neutral-700">Address line 2</label>
                    <input type="text" placeholder="Address Line 2" className="input input-bordered w-full" />
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2 space-y-2">
                    <label className="text-neutral-700">City</label>
                    <input type="text" placeholder="City" className="input input-bordered w-full" />
                </div>
                <div className="w-1/2 space-y-2">
                    <label className="text-neutral-700">State</label>
                    <select className="select select-bordered w-full">
                        <option disabled selected>State</option>
                        <option>Johor</option>
                        <option>Selangor</option>
                    </select>
                </div>
            </div>
            <div className="w-1/2 pe-2 space-y-2">
                <label className="text-neutral-700">Poscode</label>
                <input type="text" placeholder="Poscode" className="input input-bordered w-full" />
            </div>
            <div className="divider py-8"></div> 
            <div>
                <h3 className="text-lg font-medium">To save this settings, please enter your password</h3>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2 space-y-2">
                    <label className="text-neutral-700">Username</label>
                    <input type="text" placeholder="User" className="input input-bordered !border-neutral-200 w-full" disabled />
                </div>
                <div className="w-1/2 space-y-2">
                    <label className="text-neutral-700">Password</label>
                    <input type="Password" placeholder="password" className="input input-bordered w-full" />
                </div>
            </div>
            <div className="py-8">
                <button className="flex mx-auto btn btn-neutral px-14"><IoIosSave /> Save Changes</button>
            </div>
            
        </div>
    </div>
  );
};

export default FormSettings;