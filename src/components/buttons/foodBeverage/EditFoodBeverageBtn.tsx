import Modal from "@/components/Modal";
import FormEditFoodBeverage from "@/components/forms/foodBeverage/FormEditFoodBeverage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";

interface EditFnBProps {
  fnbId: number;
}

const EditFoodBeverageBtn: FC<EditFnBProps> = ({ fnbId }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["foodbeverage", fnbId],
    queryFn: async () => {
      const response = await axios.get(`/api/foodbeverage/${fnbId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn btn-neutral">
        <FaEdit />
        Edit
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <FormEditFoodBeverage
          fnbId={fnbId}
          initialValue={data}
          setModalOpen={setModalOpen}
        />
      </Modal>
    </>
  );
};

export default EditFoodBeverageBtn;
