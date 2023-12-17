import Image from "next/image";
import FormSignin from "../components/forms/FormSignin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="flex min-h-screen">
        <div className="flex w-5/12 text-black">
          <FormSignin />
        </div>
        <div className="w-7/12">
          <Image
            src="/images/home-bg-1.jpg"
            priority={true}
            width="1500"
            height="1000"
            alt="IMAGE"
            className="h-full object-cover object-left shadow-md pointer-events-none select-none"
          />
        </div>
      </div>
    );
  } else {
    redirect("/admin");
  }
}
