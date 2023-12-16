import FormChangePassword from "@/components/forms/FormChangePassword";
import FormSettings from "@/components/forms/FormSettings";
import Header from "@/components/layouts/Header";

const change_password = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">General Settings</h1>
        </div>
        <FormSettings />
      </div>
    </>
  );
};

export default change_password;
