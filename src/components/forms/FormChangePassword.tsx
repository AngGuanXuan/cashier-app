"use client";
import { PasswordValues } from "@/types/change-password";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoIosSave } from "react-icons/io";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

const FormChangePassword = () => {
  const [formData, setFormData] = useState<PasswordValues>({
    newpassword: "",
    confirmpassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordValues>();

  const onSubmit: SubmitHandler<PasswordValues> = async (
    formData: PasswordValues
  ) => {
    if (formData.newpassword === formData.confirmpassword) {
      try {
        const response = await axios.put("/api/user", formData);

        if (response.status === 200) {
          alert("password Updated");
          setFormData({
            newpassword: "",
            confirmpassword: "",
          });
        }
      } catch (error) {
        alert(error);
        console.error(error);
      }
    } else {
      alert("Password not same!");
    }
    console.log(formData);
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <div className="divider py-8"></div>
        <div className="flex space-x-4">
          <div className="w-1/2 space-y-2">
            <label className="text-neutral-700">New Password</label>
            <input
              {...register("newpassword", {
                required: "This field is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at Least 8 characters.",
                },
              })}
              type="password"
              name="newpassword"
              placeholder="New Password"
              value={formData.newpassword}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.newpassword && (
              <span className="text-error ms-4 mt-4">
                {errors.newpassword.message}
              </span>
            )}
          </div>
          <div className="w-1/2 space-y-2">
            <label className="text-neutral-700">Comfirm Password</label>
            <input
              {...register("confirmpassword", {
                required: "This field is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at Least 8 characters.",
                },
              })}
              type="password"
              name="confirmpassword"
              placeholder="Comfirm Password"
              value={formData.confirmpassword}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.confirmpassword && (
              <span className="text-error ms-4 mt-4">
                {errors.confirmpassword.message}
              </span>
            )}
          </div>
        </div>
        <div className="py-8">
          <button type="submit" className="flex mx-auto btn btn-neutral px-14">
            <IoIosSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormChangePassword;
