import DeleteFnBIndvBtn from "@/components/buttons/open_mode/DeleteFnBIndvBtn";
import AmountInputFnBIndv from "@/components/input/AmountInputFnBIndv";
import OpenModeModal from "@/components/modal/OpenModeModal";
import { foodBeverageAllValues } from "@/types/foodBeverage/food-beverage-all";
import { foodBeverageSalesValues } from "@/types/foodBeverage/food-beverage-sales";
import { foodBeverageAddSalesValues } from "@/types/foodBeverage/food-beverage-sales-add";
import { FnBSalesIndvidual } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import FormFnBIndvSales from "./FnBIndividualSales/FormFnBIndvSales";

interface FnBIndividualProps {
  initialValue: FnBSalesIndvidual;
}

const AddFnB_Individual: FC<FnBIndividualProps> = ({ initialValue }) => {
  // modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

  // get fnb sales list
  const { data: fnBSalesData, isLoading } = useQuery<foodBeverageSalesValues[]>(
    {
      queryKey: ["fnbSales"],
      queryFn: async () => {
        const response = await axios.get(
          `/api/open_mode/fnbSales/individual/${initialValue.id}`
        );
        return response.data;
      },
    }
  );

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
        `/api/open_mode/fnbSales/individual/${initialValue.id}`,
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

  if (isLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  } else if (fnbDataLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label>Current Food &amp; Beverage Order</label>
          <div>
            <table className="table">
              {/* head */}
              <thead className="text-slate-100">
                <tr>
                  <th>Name</th>
                  <th>Price &#40;RM&#41;</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {initialValue ? (
                  fnBSalesData?.map((fnbSales) => (
                    <tr key={fnbSales.id}>
                      {/* <th>{fnbSales.id}</th> */}
                      <th>{fnbSales.FoodBeverage.name}</th>
                      <td>{fnbSales.FoodBeverage.price}</td>
                      <td>
                        <AmountInputFnBIndv
                          fnbSalesId={fnbSales.id}
                          fnbSalesAmount={fnbSales.amount}
                          fnbPrice={fnbSales.FoodBeverage.price}
                          FnBIndvSalesId={initialValue.id}
                        />
                      </td>
                      <td>
                        <DeleteFnBIndvBtn fnbSalesId={fnbSales.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center font-medium text-slate-200"
                    >
                      Nothing here
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
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
                      {fnb.name} - {fnb.FnBCategory.name} - {fnb.price}
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

        <button
          className="btn btn-success w-full"
          onClick={() => setModalOpen(true)}
        >
          Checkout Food &amp; Beverage <IoFastFood />
        </button>
      </div>
      <div className="text-black">
        <OpenModeModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <FormFnBIndvSales FnBIndvSales={initialValue} />
        </OpenModeModal>
      </div>
    </div>
  );
};

export default AddFnB_Individual;
