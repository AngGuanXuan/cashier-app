"use client";
import { FaGoogle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const FormSignin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const signIn = (data) => {
    console.log(data);
    router.push("/dashboard");
  };

  return (
    <div className="w-full my-auto px-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Sign In Now</h1>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <label className="text-neutral-700">Sign in with</label>
        <button className="btn btn-outline">
          Sign in with google <FaGoogle />
        </button>
      </div>
      <div className="divider divider-neutral">OR continue with</div>
      <div>
        <form
          onSubmit={handleSubmit(signIn)}
          method="POST"
          className="space-y-8"
        >
          <div className="space-y-2">
            <label className="text-neutral-700">Username</label>
            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full"
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
