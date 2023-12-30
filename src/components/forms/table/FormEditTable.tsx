import { TableValues } from "@/types/table/table";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosSave, IoMdClose } from "react-icons/io";

interface EditTAbleDataProps {
  tableId: number;
  initialValue: TableValues;
  setModalOpen: (open: boolean) => boolean | void;
}

const FormEditTable: FC<EditTAbleDataProps> = ({
  tableId,
  initialValue,
  setModalOpen,
}) => {
  // set data
  const [formData, setFormData] = useState<TableValues>({
    name: initialValue.name,
  });

  // handlesubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TableValues>();

  // onchange
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // onsubmit
  const onSubmit: SubmitHandler<TableValues> = async (
    formData: TableValues
  ) => {
    // console.log(formData);
    // console.log(tableId);
    try {
      const response = await axios.put(`/api/table/${tableId}`, formData);
      if (response.status === 200) {
        alert("Changes Updated");
        setFormData({
          name: "",
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
        <h1 className="text-xl font-semibold">Edit Table</h1>
      </div>
      <div className="w-full space-y-4">
        <div className="flex flex-col w-full pe-2 space-y-2">
          <label className="text-neutral-700">Table Name</label>
          <input
            {...register("name", {
              required: "This field is required.",
            })}
            type="text"
            name="name"
            placeholder="Table Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="text-error ms-4 mt-4">{errors.name.message}</span>
          )}
        </div>
        <div className="flex pt-8 space-x-4 justify-end">
          <span
            onClick={() => setModalOpen(false)}
            className="flex btn btn-error"
          >
            <IoMdClose /> Cancel
          </span>
          <button type="submit" className="flex btn btn-neutral">
            <IoIosSave /> Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormEditTable;
