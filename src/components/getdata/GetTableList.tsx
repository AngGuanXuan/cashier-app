import { TableCardValues } from "@/types/table/table-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdTableRestaurant } from "react-icons/md";
import Modal from "../modal/Modal";
import { FC, useState } from "react";
import FormStartTime from "../forms/open_mode/table/FormStartTime";
import { OperateTime } from "@prisma/client";
import GetInUseData from "./getInUseData";
import OpenModeModal from "../modal/OpenModeModal";

interface timeDataProps {
  timeData: OperateTime;
}

const GetTableList: FC<timeDataProps> = ({ timeData }) => {
  // get table list
  const { data: tabledata, isLoading } = useQuery<TableCardValues[]>({
    queryKey: ["table"],
    queryFn: async () => {
      const response = await axios.get("/api/table");
      return response.data;
    },
  });

  // modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // table id
  const [tableId, setTableId] = useState<number>(1);
  // table name
  const [tableName, setTableName] = useState<string>("");
  // table status
  const [tableStatusId, settableStatus] = useState<number>(1);

  //   open modal
  const open_modal = (id: number, name: string, statusId: number) => {
    setTableId(id);
    settableStatus(statusId);
    setTableName(name);
    // console.log(tableId, tableName, tableStatusId);

    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex">
        <span className="loading loading-ring loading-lg mx-auto"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {tabledata?.map((table) => (
        <div
          key={table.id}
          className={`btn w-full h-fit rounded-none px-0 ${
            table.Status.id == 1
              ? "bg-neutral-200"
              : table.Status.id == 2
              ? "btn-accent"
              : "bg-yellow-300 border border-yellow-300 hover:bg-yellow-300/80 hover:border-yellow-300/80"
          }`}
          onClick={() => open_modal(table.id, table.name, table.Status.id)}
        >
          <div className="card w-full text-primary-content">
            <div className="card-body w-full space-y-2">
              <h2 className="card-title">{table.name}</h2>
              <h3 className="card-title text-lg items">
                <span className="text-sm font-medium text-neutral-600">
                  Status:
                </span>{" "}
                {table.Status.name}
              </h3>
              <div className="card-actions">
                <button className="btn btn-outline btn-default w-full">
                  <MdTableRestaurant />
                  Select Table
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="text-black">
        {tableStatusId == 1 ? (
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <FormStartTime
              table_Id={tableId}
              tableName={tableName}
              timeData={timeData}
            />
          </Modal>
        ) : tableStatusId == 2 ? (
          <OpenModeModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <GetInUseData
              table_Id={tableId}
              tableName={tableName}
              timeData={timeData}
              tableStatusId={tableStatusId}
            />
          </OpenModeModal>
        ) : (
          <OpenModeModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <GetInUseData
              table_Id={tableId}
              tableName={tableName}
              timeData={timeData}
              tableStatusId={tableStatusId}
            />
          </OpenModeModal>
        )}
      </div>
    </div>
  );
};

export default GetTableList;
