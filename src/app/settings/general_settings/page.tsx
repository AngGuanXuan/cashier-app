import React from "react";
import Header from "@/components/layouts/Header";
import FormSettings from "@/components/forms/FormSettings";

const SettingsPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto mt-4 py-8 space-y-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">General Settings</h1>
        </div>

        <div>
          <FormSettings />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
