"use client";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../Modal";
import FormAddFoodBeverage from "../forms/FormAddFoodBeverage";

const AddFoodBeverageBtn = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-neutral font-bold"
      >
        <IoMdAdd /> Add Food or Beverage
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <FormAddFoodBeverage setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default AddFoodBeverageBtn;
