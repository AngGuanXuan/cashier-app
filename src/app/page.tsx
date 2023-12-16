import Image from "next/image";
import FormSignin from "../components/forms/FormSignin";

export default async function Home() {
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
}
