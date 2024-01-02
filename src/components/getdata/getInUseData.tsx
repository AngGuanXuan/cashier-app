import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import FormInUse from "../forms/open_mode/table/FormInUse";
import FormFnBSales from "../forms/open_mode/FormFnBSales";
import FormToPay from "../forms/open_mode/FormToPay";
import { OperateTime } from "@prisma/client";

interface TableInUseProps {
  table_Id: number;
  tableName: string;
  tableStatusId: number;
  timeData: OperateTime;
}

const getInUseData: FC<TableInUseProps> = ({
  table_Id,
  tableName,
  timeData,
  tableStatusId,
}) => {
  // get table sales list
  const { data: tableSalesData, isLoading } = useQuery({
    queryKey: ["tableSales"],
    queryFn: async () => {
      const response = await axios.get(`/api/open_mode/tableSales/${table_Id}`);
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
    <div>
      {tableStatusId == 2 ? (
        <>
          <FormInUse tableName={tableName} initialValue={tableSalesData} />
          <div className="divider"></div>
          <FormFnBSales tableSalesId={tableSalesData.id} />
        </>
      ) : (
        <FormToPay
          tableName={tableName}
          timeRate={timeData.rate}
          initialValue={tableSalesData}
        />
      )}
    </div>
  );
};

export default getInUseData;
