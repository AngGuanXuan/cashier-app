import { TableSales } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegStopCircle, FaRegStickyNote } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

type tableSalesInUseValues = {
  note: string;
};

interface TableInUseProps {
  tableName: string;
  initialValue: TableSales;
}

function getDisplayTime() {
  return new Date();
}

const FormInUse: FC<TableInUseProps> = ({ tableName, initialValue }) => {
  // current time - open time
  const [openTime, setOpenTime] = useState<string>();

  // get time difference
  function getTimeDif() {
    const currentTime = getDisplayTime().getTime();
    const openTime = Date.parse(
      format(initialValue.createdAt, "EEE MMM d yyyy HH:mm:ss xx")
    );
    const timeDif = currentTime - openTime;

    // console.log(timeDif);

    return timeDif;
  }

  function getTimeDifRate() {
    const timeDif = getTimeDif();

    let seconds = Math.round(timeDif / 1000);
    let minutes = Math.round(seconds / 60);
    let hours = Math.round(minutes / 60);

    return minutes;
  }

  // change format for display
  function getTimeDifFormat() {
    const timeDif = getTimeDif();

    let seconds = Math.floor(timeDif / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    const timeSpend = hours + "h " + minutes + "m " + seconds + "s";

    return timeSpend;
  }

  // current time running
  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpenTime(getTimeDifFormat());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // set formdata
  const [formData, setFormData] = useState<tableSalesInUseValues>({
    note: initialValue.note,
  });

  // handlesubmit
  const { register, handleSubmit } = useForm<tableSalesInUseValues>();

  // handle change
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // onsubmit
  const onSubmit: SubmitHandler<tableSalesInUseValues> = async (
    formData: tableSalesInUseValues
  ) => {
    // console.log(formData);

    try {
      const response = await axios.put(
        `/api/open_mode/tableSales/${initialValue.id}`,
        formData
      );
      if (response.status === 200) {
        setFormData({
          note: initialValue.note,
        });
        location.reload();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      console.error(error);
    }
  };

  // onEndTime
  const EndTableTime = async () => {
    const StopData = {
      id: initialValue.id,
      tableId: initialValue.tableId,
      note: formData.note,
      timeDif: getTimeDifRate(),
    };

    // console.log(StopData);

    try {
      const response = await axios.put("/api/open_mode/tableSales", StopData);
      if (response.status === 200) {
        setFormData({
          note: initialValue.note,
        });
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
      <div className="flex justify-center">
        <span className="border-2 border-neutral rounded-box shadow-md text-neutral-content font-mono text-4xl p-4">
          {openTime}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label>Note</label>
          <TextareaAutosize
            {...register("note")}
            name="note"
            maxRows={3}
            className="textarea textarea-bordered text-black"
            placeholder="note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
        <div className="flex space-x-8">
          <div className="w-1/2">
            <button type="submit" className="btn btn-neutral w-full">
              Update Note <FaRegStickyNote />
            </button>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="w-1/2">
            <span onClick={EndTableTime} className="btn btn-success w-full">
              End Time <FaRegStopCircle />
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormInUse;
