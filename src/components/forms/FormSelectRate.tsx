"use client";
import { Rate } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosSave } from "react-icons/io";

type RateSelectedValues = {
  id: string;
};

const FormSelectRate = () => {
  const [formData, setFormData] = useState<RateSelectedValues>({
    id: "",
  });

  // handlesubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RateSelectedValues>();

  // handle select change
  const handleselectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, id: value });
    // console.log(value);
    formData.id = value;
  };

  // get rate
  const { data: dataRate, isLoading } = useQuery<Rate[]>({
    queryKey: ["rate"],
    queryFn: async () => {
      const response = await axios.get("/api/rate/select");
      return response.data;
    },
  });

  // on submit form
  const onSubmit: SubmitHandler<RateSelectedValues> = async (
    formData: RateSelectedValues
  ) => {
    // console.log(formData);
    try {
      const response = await axios.put("/api/rate/select", formData);
      if (response.status === 200) {
        alert("Rate Updated");
        setFormData({
          id: "",
        });
        location.reload();
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-4">
      <select
        {...register("id", {
          required: "Select one rate",
        })}
        name="id"
        className="select select-info w-full"
        value={formData.id}
        onChange={handleselectChange}
      >
        {dataRate?.map((rate) => (
          <option key={rate.id} value={rate.id}>
            {rate.name} &#8211; &#160; Before 5pm &#58; RM
            {rate.ratebefore5} &#160; &#8596; &#160; After 5pm &#58; RM
            {rate.rateafter5}
          </option>
        ))}
      </select>
      {errors.id && (
        <span className="text-error ms-4 mt-4">{errors.id.message}</span>
      )}
      <button type="submit" className="btn btn-neutral w-full">
        <IoIosSave />
        Save Changes
      </button>
    </form>
  );
};

export default FormSelectRate;
