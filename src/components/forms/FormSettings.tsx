"use client";
import { CompanyDetailsValues } from "@/types/company-details";
import React, { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosSave } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { State } from "@prisma/client";
import axios from "axios";

interface FormSettingsProps {
  initialValue?: CompanyDetailsValues;
}

const FormSettings: FC<FormSettingsProps> = ({ initialValue }) => {
  // handlesubmit for error
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyDetailsValues>({
    defaultValues: initialValue,
  });

  // set data
  const [formData, setFormData] = useState<CompanyDetailsValues>({
    name: initialValue?.name ? initialValue.name : "",
    email: initialValue?.email ? initialValue.email : "",
    phone_no: initialValue?.phone_no ? initialValue.phone_no : "",
    address_1: initialValue?.address_1 ? initialValue.address_1 : "",
    address_2: initialValue?.address_2 ? initialValue.address_2 : "",
    city: initialValue?.city ? initialValue.city : "",
    stateId: initialValue?.stateId ? initialValue.stateId : 2,
    posCode: initialValue?.posCode ? initialValue.posCode : "",
  });

  // on input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleselectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, stateId: parseInt(value) });
    console.log(value);
    formData.stateId = parseInt(value);
  };

  const { data: dataStates } = useQuery<State[]>({
    queryKey: ["states"],
    queryFn: async () => {
      const response = await axios.get("/api/state");
      return response.data;
    },
  });

  // on submit form
  const onSubmit: SubmitHandler<CompanyDetailsValues> = async (
    formData: CompanyDetailsValues
  ) => {
    console.log(formData);
    try {
      const response = await axios.put("/api/company", formData);

      if (response.status === 200) {
        alert("Company details Updated");
        setFormData({
          name: initialValue?.name ? initialValue.name : "",
          email: initialValue?.email ? initialValue.email : "",
          phone_no: initialValue?.phone_no ? initialValue.phone_no : "",
          address_1: initialValue?.address_1 ? initialValue.address_1 : "",
          address_2: initialValue?.address_2 ? initialValue.address_2 : "",
          city: initialValue?.city ? initialValue.city : "",
          stateId: initialValue?.stateId ? initialValue.stateId : 2,
          posCode: initialValue?.posCode ? initialValue.posCode : "",
        });
        location.reload();
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div className="w-full my-auto px-4">
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="space-y-6"
        >
          <div>
            <h2 className="text-xl font-semibold">Company Details</h2>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <label className="text-neutral-700">Company Name</label>
              <input
                {...register("name", {
                  required: "This field is required.",
                })}
                type="text"
                name="name"
                placeholder="Company Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="text-error ms-4 mt-4">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="w-1/2 space-y-2">
              <label className="text-neutral-700">Company Email</label>
              <input
                type="email"
                name="email"
                placeholder="Company Email"
                className="input input-bordered !border-neutral-200 w-full"
                value={formData.email}
                disabled
              />
            </div>
          </div>
          <div className="w-1/2 pe-2 space-y-2">
            <label className="text-neutral-700">Company Phone No.</label>
            <input
              {...register("phone_no", {
                required: "This field is required.",
              })}
              type="text"
              name="phone_no"
              placeholder="Company Phone No."
              className="input input-bordered w-full"
              value={formData.phone_no}
              onChange={handleChange}
            />
            {errors.phone_no && (
              <span className="text-error ms-4 mt-4">
                {errors.phone_no.message}
              </span>
            )}
          </div>
          <div className="divider py-8"></div>
          <div>
            <h3 className="text-lg font-medium">Company Address</h3>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <label className="text-neutral-700">Address line 1</label>
              <input
                {...register("address_1", {
                  required: "This field is required.",
                })}
                type="text"
                name="address_1"
                placeholder="Address Line 1"
                className="input input-bordered w-full"
                value={formData.address_1}
                onChange={handleChange}
              />
              {errors.address_1 && (
                <span className="text-error ms-4 mt-4">
                  {errors.address_1.message}
                </span>
              )}
            </div>
            <div className="w-1/2 space-y-2">
              <label className="text-neutral-700">Address line 2</label>
              <input
                {...register("address_2")}
                type="text"
                name="address_2"
                placeholder="Address Line 2"
                className="input input-bordered w-full"
                value={formData.address_2}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <label className="text-neutral-700">City</label>
              <input
                {...register("city", {
                  required: "This field is required.",
                })}
                type="text"
                name="city"
                placeholder="City"
                className="input input-bordered w-full"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="text-error ms-4 mt-4">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="w-1/2 space-y-2">
              <label className="text-neutral-700">State</label>
              <select
                {...register("stateId", {
                  required: "Select one state",
                })}
                name="stateId"
                className="select select-bordered w-full"
                value={formData.stateId}
                onChange={handleselectChange}
              >
                {dataStates?.map((states) => (
                  <option key={states.id} value={states.id}>
                    {states.name}
                  </option>
                ))}
              </select>
              {errors.stateId && (
                <span className="text-error ms-4 mt-4">
                  {errors.stateId.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-1/2 pe-2 space-y-2">
            <label className="text-neutral-700">Poscode</label>
            <input
              {...register("posCode", {
                required: "This field is required.",
              })}
              type="text"
              name="posCode"
              placeholder="Poscode"
              className="input input-bordered w-full"
              value={formData.posCode}
              onChange={handleChange}
            />
            {errors.posCode && (
              <span className="text-error ms-4 mt-4">
                {errors.posCode.message}
              </span>
            )}
          </div>
          <div className="divider py-8"></div>
          {/* <div>
            <h3 className="text-lg font-medium">
              To save this settings, please enter your password
            </h3>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <label className="text-neutral-700">Username</label>
              <input
                type="text"
                placeholder="User"
                className="input input-bordered !border-neutral-200 w-full"
                disabled
              />
            </div>
            <div className="w-1/2 space-y-2">
              <label className="text-neutral-700">Password</label>
              <input
                type="Password"
                placeholder="password"
                className="input input-bordered w-full"
              />
            </div>
          </div> */}
          <div className="py-8">
            <button
              type="submit"
              className="flex mx-auto btn btn-neutral px-14"
            >
              <IoIosSave /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSettings;
