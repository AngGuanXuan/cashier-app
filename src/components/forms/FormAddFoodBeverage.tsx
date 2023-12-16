import { FC } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";

interface ModalProps {
  setModalOpen: (open: boolean) => boolean | void;
}

const FormAddFoodBeverage: FC<ModalProps> = ({ setModalOpen }) => {
  return (
    <form className="p-8 space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Add Food or Beverage</h1>
      </div>
      <div className="w-full space-y-6">
        <div className="flex space-x-4">
          <div className="flex flex-col w-6/12 pe-2 space-y-2">
            <label className="text-neutral-700">Food or Beverage Name</label>
            <input
              type="text"
              name="fnb_name"
              placeholder="Food or Beverage Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col w-6/12 pe-2 space-y-2">
            <label className="text-neutral-700">Food or Beverage Type</label>
            <select className="select select-bordered w-full">
              <option disabled selected>
                Choose...
              </option>
              <option value="Food">Food</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col w-6/12 pe-2 space-y-2">
            <label className="text-neutral-700">Food or Beverage Price</label>
            <span className="label-text-alt">RM</span>
            <input
              type="text"
              name="fnb_price"
              placeholder="Food or Beverage Price"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex pt-8 space-x-4 justify-end">
          <span
            onClick={() => setModalOpen(false)}
            className="flex btn btn-error"
          >
            <IoMdClose /> Cancel
          </span>
          <button className="flex btn btn-neutral">
            <IoMdAdd /> Add Food or Beverage
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormAddFoodBeverage;
