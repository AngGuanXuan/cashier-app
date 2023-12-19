"use client";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../Modal";
import FormAddHourlyRate from "../../forms/rate/FormAddRate";

const AddHourlyRateBtn = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-neutral font-bold"
      >
        <IoMdAdd /> Add Hourly Rate
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <FormAddHourlyRate setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default AddHourlyRateBtn;
