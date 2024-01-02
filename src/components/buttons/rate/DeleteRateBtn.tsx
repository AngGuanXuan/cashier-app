import Modal from "@/components/modal/Modal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface DeleteRateProps {
  rateId: number;
  rateName: string;
}

const DeleteRateBtn: FC<DeleteRateProps> = ({ rateId, rateName }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { mutate: deleteRate } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/rate/${rateId}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      setModalOpen(false);
      location.reload();
    },
  });

  return (
    <>
      {" "}
      <button onClick={() => setModalOpen(true)} className="btn btn-secondary">
        <FaTrashAlt />
        Delete
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="space-y-10">
          <h1 className="text-xl text-center font-semibold">
            Are you sure you want to delete {rateName}?
          </h1>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setModalOpen(false)}
              className="btn btn-secondary"
            >
              <IoMdClose />
              Cancel
            </button>
            <button onClick={() => deleteRate()} className="btn btn-error">
              <FaTrashAlt /> Delete {rateName}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRateBtn;
