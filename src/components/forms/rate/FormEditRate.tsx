import { RateValues } from "@/types/rate/rate";
import axios from "axios";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosSave, IoMdClose } from "react-icons/io";

interface EditRateDataProps {
  rateId: number;
  initialValue: RateValues;
  setModalOpen: (open: boolean) => boolean | void;
}

const FormEditRate: FC<EditRateDataProps> = ({
  rateId,
  initialValue,
  setModalOpen,
}) => {
  // set data
  const [formData, setFormData] = useState<RateValues>({
    name: initialValue.name,
    ratebefore5: initialValue.ratebefore5,
    rateafter5: initialValue.rateafter5,
    selected: initialValue.selected,
  });

  // handlesubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RateValues>({
    defaultValues: {
      selected: initialValue.selected,
    },
  });

  // onchange
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handleratechange
  const handleRPHChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // onsubmit
  const onSubmit: SubmitHandler<RateValues> = async (formData: RateValues) => {
    formData.ratebefore5 = parseFloat(formData.ratebefore5)
      .toFixed(2)
      .toString();
    formData.rateafter5 = parseFloat(formData.rateafter5).toFixed(2).toString();
    console.log(formData);
    // console.log(rateId);
    try {
      const response = await axios.put(`/api/rate/${rateId}`, formData);
      if (response.status === 200) {
        alert("Changes Updated");
        setFormData({
          name: initialValue.name,
          ratebefore5: "0.00",
          rateafter5: "0.00",
          selected: initialValue.selected,
        });
        setModalOpen(false);
        location.reload();
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      className="p-8 space-y-8"
    >
      <div>
        <h1 className="text-xl font-semibold">Edit Hourly Rate</h1>
      </div>
      <div className="w-full space-y-6">
        <div className="flex flex-row space-x-4 items-end">
          <div className="flex flex-col w-1/2 pe-2 space-y-2">
            <label className="text-neutral-700 mb-6">Hourly Rate Name</label>
            <input
              {...register("name", {
                required: "This field is required.",
              })}
              type="text"
              name="name"
              placeholder="Hourly Rate Name"
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
        </div>
        <div className="flex flex-row space-x-4 items-end">
          <div className="flex flex-col w-1/2 pe-2 space-y-2">
            <label className="text-neutral-700">
              Rate Before 5&#58;00 p.m.
            </label>
            <span className="label-text-alt">RM</span>
            <input
              {...register("ratebefore5", {
                required: "This field is required.",
              })}
              type="number"
              name="ratebefore5"
              placeholder="Rate before 5"
              className="input input-bordered w-full"
              step="0.50"
              value={formData.ratebefore5}
              onChange={handleRPHChange}
            />
            {errors.ratebefore5 && (
              <span className="text-error ms-4 mt-4">
                {errors.ratebefore5.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-1/2 pe-2 space-y-2">
            <label className="text-neutral-700">Rate After 5&#58;00 p.m.</label>
            <span className="label-text-alt">RM</span>
            <input
              {...register("rateafter5", {
                required: "This field is required.",
              })}
              type="number"
              name="rateafter5"
              placeholder="Rate after 5"
              className="input input-bordered w-full"
              step="0.50"
              value={formData.rateafter5}
              onChange={handleRPHChange}
            />
            {errors.rateafter5 && (
              <span className="text-error ms-4 mt-4">
                {errors.rateafter5.message}
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
            <IoIosSave /> Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormEditRate;
