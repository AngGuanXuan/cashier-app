import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try{

        const { tableSalesId , discount } = await req.json();

        // get totalTablesales
        const getTotalTableSales = await prisma.tableSales.findFirst({
            where: { 
                id: tableSalesId,
            },
            select: {
                totalTableSales: true
            }
        });

        // if total table sales not exist
        if(!getTotalTableSales) {
            return NextResponse.json({operateTime: null, message: "total table sales not exist"}, {status: 409});
        };

        const totalFnBSalesPrice = parseFloat(getTotalTableSales.totalTableSales);
        const newTotalFnBSalesPrice = totalFnBSalesPrice - parseFloat(discount);

        const tableSales = await prisma.tableSales.update({
            where: {
                id: tableSalesId
            },
            data: {
                totalTableSales: newTotalFnBSalesPrice.toFixed(2).toString(),
                discount: discount,
            },
        });

        return NextResponse.json({tableSales: tableSales}, { status: 200})

    }
    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}