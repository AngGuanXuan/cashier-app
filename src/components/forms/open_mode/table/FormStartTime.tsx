import { RateGlobalValues } from "@/types/rate/getRateGlobal";
import { TableSalesValues } from "@/types/table/table-sales";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineNotStarted } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

interface TableDataProps {
  table_Id: number;
  tableName: string;
  timeData: RateGlobalValues;
}

const FormStartTime: FC<TableDataProps> = ({
  table_Id,
  tableName,
  timeData,
}) => {
  // set note
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
    formData = { tableId: table_Id, note, operateTimeId: timeData.id };
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
