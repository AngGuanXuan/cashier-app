import { foodBeverageValues } from "@/types/food-beverage";
import { FnBCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdAdd, IoMdClose } from "react-icons/io";

interface ModalProps {
  setModalOpen: (open: boolean) => boolean | void;
}

const FormAddFoodBeverage: FC<ModalProps> = ({ setModalOpen }) => {
  // get category
  const { data: dataCategory, isLoading } = useQuery<FnBCategory[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axios.get("/api/foodbeverage/category");
      return response.data;
    },
  });

  const [formData, setFormData] = useState<foodBeverageValues>({
    name: "",
    price: "",
    CategoryId: 1,
  });

  // handlesubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<foodBeverageValues>();

  // onchange
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle select change
  const handleselectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, CategoryId: parseInt(value) });
    console.log(value);
    formData.CategoryId = parseInt(value);
  };

  // handlepricechange
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name } = e.target;
    const value = parseFloat(e.target.value)?.toFixed(2);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // onsubmit
  const onSubmit: SubmitHandler<foodBeverageValues> = async (
    formData: foodBeverageValues
  ) => {
    console.log(formData);
    try {
      const response = await axios.post("/api/foodbeverage", formData);
      if (response.status === 200) {
        if (formData.CategoryId == 1) {
          alert("Food Added");
        } else {
          alert("Beverage Added");
        }
        setFormData({
          name: "",
          price: "",
          CategoryId: 1,
        });
        setModalOpen(false);
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
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Add Food or Beverage</h1>
      </div>
      <div className="w-full space-y-6">
        <div className="flex space-x-4">
          <div className="flex flex-col w-6/12 pe-2 space-y-2">
            <label className="text-neutral-700">Food or Beverage Name</label>
            <input
              {...register("name", {
                required: "This field is required.",
              })}
              type="text"
              name="name"
              placeholder="Food or Beverage Name"
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
          <div className="flex flex-col w-6/12 pe-2 space-y-2">
            <label className="text-neutral-700">Food or Beverage Type</label>
            <select
              {...register("CategoryId", {
                required: "Select one state",
              })}
              name="CategoryId"
              className="select select-bordered w-full"
              value={formData.CategoryId}
              onChange={handleselectChange}
            >
              {dataCategory?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.CategoryId && (
              <span className="text-error ms-4 mt-4">
                {errors.CategoryId.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col w-6/12 pe-2 space-y-2">
            <label className="text-neutral-700">Food or Beverage Price</label>
            <span className="label-text-alt">RM</span>
            <input
              {...register("price", {
                required: "This field is required.",
              })}
              type="number"
              name="price"
              placeholder="Food or Beverage Price"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={handlePriceChange}
            />
            {errors.price && (
              <span className="text-error ms-4 mt-4">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex pt-8 space-x-4 justify-end">
          <span
            onClick={() => setModalOpen(false)}
            className="flex btn btn-error"
          >
            <IoMdClose /> Cancel
          </span>
          <button type="submit" className="flex btn btn-neutral">
            <IoMdAdd /> Add Food or Beverage
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormAddFoodBeverage;
