import { foodBeverageAllValues } from "@/types/foodBeverage/food-beverage-all";
import { foodBeverageAddSalesValues } from "@/types/foodBeverage/food-beverage-sales-add";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";

const StartFnB_Individual = () => {
  // set formdata
  const [formData, setFormData] = useState<foodBeverageAddSalesValues>({
    foodBeverageId: 1,
    amount: 1,
  });

  // handlesubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<foodBeverageAddSalesValues>();

  // handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // get fnb list
  const { data: fnBData, isLoading: fnbDataLoading } = useQuery<
    foodBeverageAllValues[]
  >({
    queryKey: ["foodbeverage"],
    queryFn: async () => {
      const response = await axios.get("/api/foodbeverage");
      return response.data;
    },
  });

  // onsubmit
  const onSubmit: SubmitHandler<foodBeverageAddSalesValues> = async (
    formData: foodBeverageAddSalesValues
  ) => {
    // console.log(formData);

    try {
      const response = await axios.post(
        "/api/open_mode/fnbSales/individual",
        formData
      );
      if (response.status === 200) {
        setFormData({
          foodBeverageId: 1,
          amount: 1,
        });
        alert("FnB Individually added");
        location.reload();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      console.error(error);
    }
  };

  if (fnbDataLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <label>Add Individual Food &amp; Beverage Order</label>
      <div className="items-end text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <div className="flex flex-row space-x-2">
            <div className="w-2/4 flex flex-col">
              <select
                {...register("foodBeverageId", {
                  required: "Select one Food or Beverage",
                })}
                name="foodBeverageId"
                defaultValue={""}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select ...
                </option>
                {fnBData?.map((fnb) => (
                  <option key={fnb.id} value={fnb.id}>
                    {fnb.name} - {fnb.Category.name} - {fnb.price}
                  </option>
                ))}
              </select>
            </div>

            <input
              {...register("amount")}
              name="amount"
              type="number"
              min={1}
              className="input input-bordered w-1/4"
              value={formData.amount}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-neutral w-1/4">
              Add <IoIosAddCircle />
            </button>
          </div>
          {errors.foodBeverageId && (
            <span className="text-error ms-4 mt-4">
              {errors.foodBeverageId.message}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default StartFnB_Individual;
