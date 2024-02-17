import axios, { AxiosError } from "axios";
import React, { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface addDiscountProps {
  FnBIndvSalesId: number;
  FnBIndvSalesDiscount: string;
}
type DiscountValues = {
  FnBIndvSalesId: number;
  FnBIndvSalesDiscount: string;
};

const AddDiscountFnBIndvSales: FC<addDiscountProps> = ({
  FnBIndvSalesId,
  FnBIndvSalesDiscount,
}) => {
  // set formdata
  const [formData, setFormData] = useState<DiscountValues>({
    FnBIndvSalesId: FnBIndvSalesId,
    FnBIndvSalesDiscount: FnBIndvSalesDiscount,
  });

  // handlesubmit
  const { register, handleSubmit } = useForm<DiscountValues>();

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
  const onSubmit: SubmitHandler<DiscountValues> = async (
    formData: DiscountValues
  ) => {
    formData.FnBIndvSalesId = FnBIndvSalesId;
    formData.FnBIndvSalesDiscount = parseFloat(
      formData.FnBIndvSalesDiscount
    ).toFixed(2);

    // console.log(formData);

    try {
      const response = await axios.put(
        "/api/open_mode/fnbSales/individual",
        formData
      );
      if (response.status === 200) {
        setFormData({
          FnBIndvSalesId: FnBIndvSalesId,
          FnBIndvSalesDiscount: FnBIndvSalesDiscount,
        });
        alert("discount Added.");
        location.reload();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4">
        <button type="submit" className="btn btn-neutral">
          Discount
        </button>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-semibold">RM</h2>
          <input
            {...register("FnBIndvSalesDiscount")}
            name="FnBIndvSalesDiscount"
            type="number"
            min={0}
            placeholder="Discount Given (RM)"
            className="input input-bordered rounded-sm text-center w-36"
            value={formData.FnBIndvSalesDiscount}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default AddDiscountFnBIndvSales;
