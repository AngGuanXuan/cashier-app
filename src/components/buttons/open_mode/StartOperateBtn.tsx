"use client";
import Modal from "@/components/Modal";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";

const StartOperateBtn = () => {
  // modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // confirm start
  const start_operate = async () => {
    try {
      const response = await axios.post("/api/open_mode/startTime");

      if (response.status === 200) {
        location.replace("/open_mode");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-error text-white font-bold hover:shadow-md"
      >
        <FaPowerOff />
        Operate Now
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <h3 className="font-bold text-lg">Operate Mode</h3>
        <p className="py-4">Are you sure you want to start cashier now?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={() => setModalOpen(false)} className="btn">
            Close
          </button>
          <button onClick={() => start_operate()} className="btn btn-secondary">
            <FaPowerOff />
            Start Now
          </button>
        </div>
      </Modal>
    </>
  );
};

export default StartOperateBtn;
