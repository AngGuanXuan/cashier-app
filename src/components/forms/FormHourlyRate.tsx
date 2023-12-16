import { FC } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";

interface ModalProps {
  setModalOpen: (open: boolean) => boolean | void;
}

const FormHourlyRate: FC<ModalProps> = ({ setModalOpen }) => {
  return (
    <form className="p-8 space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Add Hourly Rate</h1>
      </div>
      <div className="w-full space-y-4">
        <div className="flex flex-col w-full pe-2 space-y-2">
          <label className="text-neutral-700">Hourly Rate</label>
          <span className="label-text-alt">RM</span>
          <input
            type="text"
            name="hourly_rate"
            placeholder="Hourly Rate"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex pt-8 space-x-4 justify-end">
          <span
            onClick={() => setModalOpen(false)}
            className="flex btn btn-error"
          >
            <IoMdClose /> Cancel
          </span>
          <button className="flex btn btn-neutral">
            <IoMdAdd /> Add Hourly Rate
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormHourlyRate;
