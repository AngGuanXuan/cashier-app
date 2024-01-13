export type TableSalesAllValues = {
    id: number;
    Table: {
        id: number;
        name: string;
    };
    note: string;
    OperateTime: {
        id: number;
        rate: string;
    };
    tableStopTime: DateTime;
    timeSpend: string;
    salesRate: string;
    tableRateSales: string;
    totalFnBSales: string;
    totalBeforeDiscount: string;
    totalTableSales: string;
    discount: string;
    customerPay: string;
    balance: string;
    paid : boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}