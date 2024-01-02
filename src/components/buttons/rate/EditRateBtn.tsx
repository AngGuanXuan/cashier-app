import { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../../modal/Modal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FormEditRate from "../../forms/rate/FormEditRate";

interface EditRateProps {
  rateId: number;
}

const EditRateBtn: FC<EditRateProps> = ({ rateId }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["rate", rateId],
    queryFn: async () => {
      const response = await axios.get(`/api/rate/${rateId}`);
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
        <FormEditRate
          rateId={rateId}
          initialValue={data}
          setModalOpen={setModalOpen}
        />
      </Modal>
    </>
  );
};

export default EditRateBtn;
