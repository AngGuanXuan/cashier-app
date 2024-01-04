import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{

        const { tableId , note , operateTimeId } = await req.json();

        const table_sales = await prisma.tableSales.create({
            data: {
                tableId , 
                note , 
                operateTimeId , 
                hourSpend:"0" , 
                tableRateSales: "0.00" , 
                totalFnBSales: "0.00" , 
                totalTableSales: "0.00" , 
                discount: "0.00",
                customerPay: "0.00",
                balance: "0.00"
            }
        });

        const table_status = await prisma.table.update({
            where: {
                id: tableId,
            },
            data: {
                statusId: 2
            }
        });

        return NextResponse.json(table_sales&&table_status, {status: 200});
    }

    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}

export async function PUT(req: Request) {
    try{
        const { id , tableId , note , timeDif } = await req.json();

        // get rate
        const Operaterate = await prisma.operateTime.findFirst({
            where: { 
                mode: "open",
            },
            select: {
                rate: true
            }
        });

        // if price not exist
        if(!Operaterate) {
            return NextResponse.json({operateTime: null, message: "rate not exist"}, {status: 409});
        };

        const totalPrice = parseInt(timeDif) * parseFloat(Operaterate.rate);

        // get totalFnBsales
        const getTotalFnBSales = await prisma.tableSales.findFirst({
            where: { 
                id: id,
            },
            select: {
                totalFnBSales: true
            }
        });

        // if total fnb sales not exist
        if(!getTotalFnBSales) {
            return NextResponse.json({operateTime: null, message: "total fnb sales not exist"}, {status: 409});
        };

        const totalFnBSalesPrice = parseFloat(getTotalFnBSales.totalFnBSales);
        const totalTablePrice = totalPrice + totalFnBSalesPrice;

        const tableSales = await prisma.tableSales.update({
            where: {
                id: id
            },
            data: {
                note: note,
                hourSpend: timeDif.toString(),
                tableRateSales: totalPrice.toFixed(2).toString(),
                totalTableSales: totalTablePrice.toFixed(2).toString(),
            },
        });

        const table_status = await prisma.table.update({
            where: {
                id: tableId,
            },
            data: {
                statusId: 3
            }
        });

        return NextResponse.json({tableSales: tableSales , table: table_status}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
    
}