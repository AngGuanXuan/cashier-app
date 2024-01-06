import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try{

        const { tableSalesId , customerPay , balance } = await req.json();

        // get all table sales data
        const getAllTableSales = await prisma.tableSales.findFirst({
            where: { 
                id: tableSalesId,
            },
            select: {
                tableId: true,
                operateTimeId: true,
                tableRateSales: true,
                totalFnBSales: true,
                totalTableSales: true,
                discount: true,
            }
        });

        // if total table sales not exist
        if(!getAllTableSales) {
            return NextResponse.json({operateTime: null, message: "total table sales not exist"}, {status: 409});
        };

        let operateTimeId = getAllTableSales.operateTimeId;

        if(operateTimeId == null) {
            operateTimeId = 0;
        }

        // update daily sales
        const updateDailySales = await prisma.operateTime.update({
            where: {
                id: operateTimeId,
            },
            data: {
                totalTableSales: getAllTableSales.totalTableSales,
                totalFnBSales: getAllTableSales.totalFnBSales,
                totalDaySales: getAllTableSales.totalTableSales,
                TotalDiscount: getAllTableSales.discount,
            },
        });

        const tableSales = await prisma.tableSales.update({
            where: {
                id: tableSalesId
            },
            data: {
                customerPay: customerPay,
                balance: balance,
                paid: true
            },
        });

         let tableId = getAllTableSales.tableId;

        if(tableId == null) {
            tableId = 0;
        }

        // update table status
        const table_status = await prisma.table.update({
            where: {
                id: tableId,
            },
            data: {
                statusId: 1
            }
        });

        return NextResponse.json({operateTime: updateDailySales , tableSales: tableSales , table: table_status}, { status: 200})

    }
    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}