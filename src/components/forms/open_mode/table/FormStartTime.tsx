import { TableSalesValues } from "@/types/table/table-sales";
import { TableCardValues } from "@/types/table/table-card";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineTimer, MdOutlineNotStarted } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

interface TAbleDataProps {
  table_Id: number;
  tableName: string;
  //   setModalOpen: (open: boolean) => boolean | void;
}

const FormStartTime: FC<TAbleDataProps> = ({ table_Id, tableName }) => {
  // set formdata
  const [note, setNote] = useState<string>("");

  // handlesubmit
  const { register, handleSubmit } = useForm<TableSalesValues>();

  // handle change
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setNote(value);
  };

  // onsubmit
  const onSubmit: SubmitHandler<TableSalesValues> = async (
    formData: TableSalesValues
  ) => {
    formData = { tableId: table_Id, note };
    // console.log(formData);
    try {
      const response = await axios.post("/api/open_mode/tableSales", formData);
      if (response.status === 200) {
        setNote("");
        location.reload();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{tableName}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label>Note</label>
          <TextareaAutosize
            {...register("note")}
            name="note"
            minRows={3}
            className="textarea textarea-bordered text-black"
            placeholder="note"
            value={note}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <span className="font-mono text-4xl space-x-2">
            <span>00</span>h<span>00</span>m<span>00</span>s
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="w-full">
            <button type="submit" className="btn btn-error w-full">
              Start <MdOutlineNotStarted />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormStartTime;
