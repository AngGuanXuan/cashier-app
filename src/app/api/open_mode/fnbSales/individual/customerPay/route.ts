import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try{

        const { FnBIndvSalesId , customerPay , balance } = await req.json();

        // get fnb individual sales data
        const getAllFnBIndvSales = await prisma.fnBSalesIndvidual.findFirst({
            where: { 
                id: FnBIndvSalesId,
            },
            select: {
                operateTimeId: true,
                totalIndvFnBSales: true,
                discount: true,
            }
        });

        // if fnb individual sales not exist
        if(!getAllFnBIndvSales) {
            return NextResponse.json({operateTime: null, message: "total table sales not exist"}, {status: 409});
        };

        let operateTimeId = getAllFnBIndvSales.operateTimeId;

        if(operateTimeId == null) {
            operateTimeId = 0;
        }

        // get all table sales data
        const oriDailySales = await prisma.operateTime.findFirst({
            where: {
                id: operateTimeId,
            },
        });
        // if total table sales not exist
        if(!oriDailySales) {
            return NextResponse.json({operateTime: null, message: "operate time sales not exist"}, {status: 409});
        };

        const updatedTotalFnBSales = parseFloat(oriDailySales.totalFnBSales) + parseFloat(getAllFnBIndvSales.totalIndvFnBSales)
        const updatedTotalDaySales = parseFloat(oriDailySales.totalDaySales) + parseFloat(getAllFnBIndvSales.totalIndvFnBSales)
        const updatedTotalDiscount = parseFloat(oriDailySales.TotalDiscount) + parseFloat(getAllFnBIndvSales.discount)

        // update daily sales
        const updateDailySales = await prisma.operateTime.update({
            where: {
                id: operateTimeId,
            },
            data: {
                totalFnBSales: updatedTotalFnBSales.toFixed(2).toString(),
                totalDaySales: updatedTotalDaySales.toFixed(2).toString(),
                TotalDiscount: updatedTotalDiscount.toFixed(2).toString(),
            },
        });

        const fnBSalesIndvidual = await prisma.fnBSalesIndvidual.update({
            where: {
                id: FnBIndvSalesId
            },
            data: {
                customerPay: customerPay,
                balance: balance,
                paid: true
            },
        });


        return NextResponse.json({operateTime: updateDailySales , fnBSalesIndvidual: fnBSalesIndvidual}, { status: 200})

    }
    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}