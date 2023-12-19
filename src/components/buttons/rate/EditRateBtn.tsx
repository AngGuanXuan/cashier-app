import { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../../Modal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Rate } from "@prisma/client";
import FormEditRate from "../../forms/rate/FormEditRate";
import { RateValues } from "@/types/rate";

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
        <span className="loading loading-spinner loading-lg mx-auto"></span>
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
