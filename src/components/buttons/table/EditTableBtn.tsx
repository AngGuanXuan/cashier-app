import Modal from "@/components/Modal";
import FormEditTable from "@/components/forms/table/FormEditTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";

interface EditTableProps {
  tableId: number;
}

const EditTableBtn: FC<EditTableProps> = ({ tableId }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["table", tableId],
    queryFn: async () => {
      const response = await axios.get(`/api/table/${tableId}`);
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
        <FormEditTable
          tableId={tableId}
          initialValue={data}
          setModalOpen={setModalOpen}
        />
      </Modal>
    </>
  );
};

export default EditTableBtn;
