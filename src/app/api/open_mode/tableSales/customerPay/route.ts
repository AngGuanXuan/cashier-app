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

        // get all table sales data
        const oriDailySales = await prisma.operateTime.findFirst({
            where: {
                id: operateTimeId,
            },
            select: {
                totalTableSales: true,
                totalFnBSales: true,
                totalDaySales: true,
                TotalDiscount: true,
            },
        });
        // if total table sales not exist
        if(!oriDailySales) {
            return NextResponse.json({operateTime: null, message: "operate time table sales not exist"}, {status: 409});
        };

        const updatedTotalTableSales = parseFloat(oriDailySales.totalTableSales) + parseFloat(getAllTableSales.tableRateSales);
        const updatedTotalFnBSales = parseFloat(oriDailySales.totalFnBSales) + parseFloat(getAllTableSales.totalFnBSales)
        const updatedTotalDaySales = parseFloat(oriDailySales.totalDaySales) + parseFloat(getAllTableSales.totalTableSales)
        const updatedTotalDiscount = parseFloat(oriDailySales.TotalDiscount) + parseFloat(getAllTableSales.discount)

        // update daily sales
        const updateDailySales = await prisma.operateTime.update({
            where: {
                id: operateTimeId,
            },
            data: {
                totalTableSales: updatedTotalTableSales.toFixed(2).toString(),
                totalFnBSales: updatedTotalFnBSales.toFixed(2).toString(),
                totalDaySales: updatedTotalDaySales.toFixed(2).toString(),
                TotalDiscount: updatedTotalDiscount.toFixed(2).toString(),
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