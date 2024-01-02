import { foodBeverageAllValues } from "@/types/foodBeverage/food-beverage-all";
import { IoFastFood } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FC, useState } from "react";
import { foodBeverageSalesValues } from "@/types/foodBeverage/food-beverage-sales";
import { foodBeverageAddSalesValues } from "@/types/foodBeverage/food-beverage-sales-add";
import { SubmitHandler, useForm } from "react-hook-form";
import DeleteFnBSaleBtn from "@/components/buttons/open_mode/DeleteFnBSaleBtn";
import AmountInput from "@/components/input/AmountInput";

interface FnBSalesProps {
  tableSalesId: number;
}

const FormFnBSales: FC<FnBSalesProps> = ({ tableSalesId }) => {
  // get fnb sales list
  const { data: fnBSalesData, isLoading } = useQuery<foodBeverageSalesValues[]>(
    {
      queryKey: ["fnbSales"],
      queryFn: async () => {
        const response = await axios.get(
          `/api/open_mode/fnbSales/${tableSalesId}`
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

  // onsubmit
  const onSubmit: SubmitHandler<foodBeverageAddSalesValues> = async (
    formData: foodBeverageAddSalesValues
  ) => {
    console.log(formData);

    try {
      const response = await axios.post(
        `/api/open_mode/fnbSales/${tableSalesId}`,
        formData
      );
      if (response.status === 200) {
        setFormData({
          foodBeverageId: 1,
          amount: 1,
        });
        alert("added");
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
    <>
      <div className="flex flex-col space-y-2">
        <label>Food &amp; Beverage Order</label>
        <div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Price &#40;RM&#41;</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fnBSalesData?.map((fnbSales) => (
                <tr key={fnbSales.id}>
                  {/* <th>{fnbSales.id}</th> */}
                  <th>{fnbSales.FoodBeverage.name}</th>
                  <td>{fnbSales.FoodBeverage.price}</td>
                  <td>
                    <AmountInput
                      fnbSalesId={fnbSales.id}
                      fnbSalesAmount={fnbSales.amount}
                      fnbPrice={fnbSales.FoodBeverage.price}
                      tableSalesId={tableSalesId}
                    />
                  </td>
                  <td>
                    <DeleteFnBSaleBtn fnbSalesId={fnbSales.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-2">
        <label>Add Ons</label>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-row space-x-4 items-end">
            <div className="w-2/4 flex flex-col">
              {errors.foodBeverageId && (
                <span className="text-error ms-4 mt-4">
                  {errors.foodBeverageId.message}
                </span>
              )}
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
              Add <IoFastFood />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormFnBSales;
