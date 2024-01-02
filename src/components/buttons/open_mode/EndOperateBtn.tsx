import Modal from "@/components/modal/Modal";
import { OperateTime } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { FaStopCircle } from "react-icons/fa";

interface timeDataProps {
  timeData: OperateTime;
}

const EndOperateBtn: FC<timeDataProps> = ({ timeData }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const stop_operate = async () => {
    // console.log(timeData.id);
    try {
      const response = await axios.put("/api/open_mode/startTime", {
        id: timeData.id,
      });

      if (response.status === 200) {
        location.replace("/admin");
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
      <button onClick={() => setModalOpen(true)} className="btn btn-secondary">
        <FaStopCircle />
        End for Today
      </button>
      <div className="text-black absolute">
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <h3 className="font-bold text-lg">Operate Mode</h3>
          <p className="py-4">Are you sure you want to close cashier now?</p>
          <div className="flex justify-end space-x-4">
            <button onClick={() => setModalOpen(false)} className="btn">
              Close
            </button>
            <button
              onClick={() => stop_operate()}
              className="btn btn-secondary"
            >
              <FaStopCircle />
              Close Now
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EndOperateBtn;
