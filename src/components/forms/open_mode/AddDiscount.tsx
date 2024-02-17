import axios, { AxiosError } from "axios";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface addDiscountProps {
  tableSalesId: number;
  tableDiscount: string;
}
type DiscountValues = {
  tableSalesId: number;
  discount: string;
};

const AddDiscount: FC<addDiscountProps> = ({ tableSalesId, tableDiscount }) => {
  // set formdata
  const [formData, setFormData] = useState<DiscountValues>({
    tableSalesId: tableSalesId,
    discount: tableDiscount,
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
    formData.tableSalesId = tableSalesId;
    formData.discount = parseFloat(formData.discount).toFixed(2);

    // console.log(formData);

    try {
      const response = await axios.put(
        "/api/open_mode/tableSales/payDiscount",
        formData
      );
      if (response.status === 200) {
        setFormData({
          tableSalesId: tableSalesId,
          discount: tableDiscount,
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
            {...register("discount")}
            name="discount"
            type="number"
            min={0}
            placeholder="Discount Given (RM)"
            className="input input-bordered rounded-sm text-center w-36"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default AddDiscount;
