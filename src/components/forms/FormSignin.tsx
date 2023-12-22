"use client";
import { FaGoogle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { SignInValues } from "@/types/sign-in-values";

const FormSignin = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<SignInValues>({
    email: "",
    password: "",
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
  } = useForm<SignInValues>();

  const onSubmit: SubmitHandler<SignInValues> = async (
    formData: SignInValues
  ) => {
    const signInData = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    // console.log(signInData);

    if (signInData?.error) {
      alert(signInData.error);
      location.reload();
    } else {
      router.refresh();
      router.push("/admin");
    }
  };

  return (
    <div className="w-full my-auto space-y-8">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <label className="text-neutral-700">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && errors.email.type === "required" && (
              <span className="text-error ms-4 mt-4">
                This field is required
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-neutral-700">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-error ms-4 mt-4">
                This field is required
              </span>
            )}
          </div>
          <div>
            <button type="submit" className="btn btn-neutral px-14 mt-4 w-full">
              <BiLogIn /> Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSignin;
