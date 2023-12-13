"use client";
import { FaGoogle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/navigation";

const FormSignin = () => {

  return (
    <div className="w-full my-auto px-12 space-y-8">
        <div>
            <h1 className='text-3xl font-bold'>Sign In Now</h1>
        </div>
        <div className="flex flex-col justify-center space-y-2">
            <label className="text-neutral-700">Sign in with</label>
            <button className="btn btn-outline">Sign in with google <FaGoogle /></button>
        </div>
        <div className="divider divider-neutral">OR continue with</div>
        <div>
            <form className="space-y-8">
                <div className="space-y-2">
                    <label className="text-neutral-700">Username</label>
                    <input type="text" placeholder="Username" className="input input-bordered w-full" />
                </div>
                <div className="space-y-2">
                    <label className="text-neutral-700">Password</label>
                    <input type="password" placeholder="Password" className="input input-bordered w-full" />
                </div>
                <button className="btn btn-neutral px-14"><BiLogIn /> Sign In</button>
            </form>
        </div>
    </div>
  );
};

export default FormSignin;