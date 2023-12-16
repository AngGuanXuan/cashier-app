"use client";
import { FaGoogle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { SignInValues } from "@/types/sign-in-values";
import $ from "jquery";

const FormSignin = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<SignInValues>({
    username: "",
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
      username: formData.username,
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
    <div className="w-full my-auto px-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Sign In Now</h1>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <label className="text-neutral-700">Sign in with</label>
        <button className="btn btn-outline" disabled>
          Sign in with google <FaGoogle />
        </button>
        <div className="badge badge-accent mx-auto">Coming Soon</div>
      </div>
      <div className="divider divider-neutral">OR continue with</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <label className="text-neutral-700">Username</label>
            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && errors.username.type === "required" && (
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
          <button type="submit" className="btn btn-neutral px-14">
            <BiLogIn /> Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormSignin;
