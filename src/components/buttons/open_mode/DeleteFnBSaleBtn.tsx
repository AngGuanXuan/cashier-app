import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { IoTrashSharp } from "react-icons/io5";

interface FnBSalesIdProps {
  fnbSalesId: number;
}

const DeleteFnBSaleBtn: FC<FnBSalesIdProps> = ({ fnbSalesId }) => {
  const { mutate: deleteFnBSales } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/open_mode/fnbSales/${fnbSalesId}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      alert("deleted");
      location.reload();
    },
  });

  return (
    <button onClick={() => deleteFnBSales()} className="btn btn-error">
      <IoTrashSharp />
    </button>
  );
};

export default DeleteFnBSaleBtn;
