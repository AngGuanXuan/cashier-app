import FormChangePassword from "@/components/forms/FormChangePassword";
import Header from "@/components/layouts/Header";

const change_password = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Change Password</h1>
        </div>
        <FormChangePassword />
      </div>
    </>
  );
};

export default change_password;
