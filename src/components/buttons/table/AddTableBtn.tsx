"use client";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../Modal";
import FormAddTable from "../../forms/table/FormAddTable";

const AddTableBtn = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-neutral font-bold"
      >
        <IoMdAdd /> Add Table
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <FormAddTable setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default AddTableBtn;
