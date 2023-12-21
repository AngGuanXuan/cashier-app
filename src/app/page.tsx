import FormSignin from "../components/forms/FormSignin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div
        className="hero min-h-screen bg-base-200"
        style={{
          backgroundImage: "url(/images/home-bg-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:ms-8 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 lg:px-0 px-8 text-justify text-last-center">
              Welcome to the cashier system. Please Login with your credentials
              to access the system.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <FormSignin />
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/admin");
  }
}
