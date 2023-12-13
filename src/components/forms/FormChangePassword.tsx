import React from "react";
import { IoIosSave } from "react-icons/io";

const FormChangePassword = () => {
  return (
    <div className="w-full my-auto px-4">
      <div className="w-full space-y-6">
        <div className="w-1/2 pe-2 space-y-2">
          <label className="text-neutral-700">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered !border-neutral-200 w-full"
            disabled
          />
        </div>
        <div className="w-1/2 pe-2 space-y-2">
          <label className="text-neutral-700">Current Password</label>
          <input
            type="password"
            placeholder="Current Password"
            className="input input-bordered w-full"
          />
        </div>
        <div className="divider py-8"></div>
        <div className="flex space-x-4">
          <div className="w-1/2 space-y-2">
            <label className="text-neutral-700">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="text-neutral-700">Comfirm Password</label>
            <input
              type="password"
              placeholder="Comfirm Password"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="py-8">
          <button className="flex mx-auto btn btn-neutral px-14">
            <IoIosSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormChangePassword;
