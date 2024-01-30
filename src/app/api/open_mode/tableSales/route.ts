import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{

        const { tableId , note , operateTimeId } = await req.json();

        // get sales rate
         const OperateRate = await prisma.operateTime.findFirst({
            where: { 
                mode: "open",
            },
            include: {
                Rate: true
            }
        });

        // if rate not exist
        if(!OperateRate) {
            return NextResponse.json({operateTime: null, message: "rate not exist"}, {status: 409});
        };

        // get current time
        // for testing : "2022-01-14 18:13:00"
        const currentTime = new Date().getHours();
        let getRate = OperateRate.Rate?.ratebefore5;

        if(currentTime <= 6 ) {
            getRate = OperateRate.Rate?.rateafter5;
        }

        if(currentTime >= 17 ) {
            getRate = OperateRate.Rate?.rateafter5;
        }

        const table_sales = await prisma.tableSales.create({
            data: {
                tableId , 
                note , 
                operateTimeId , 
                timeSpend:"0" , 
                salesRate: getRate ? getRate : "0.00",
                tableRateSales: "0.00" , 
                totalFnBSales: "0.00" , 
                totalBeforeDiscount: "0.00",
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
                statusId: 2,
                LatestTableSalesTime: new Date(),
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
        const getTime = new Date();
        const { id , tableId , note , timeDif } = await req.json();

        // get rate
        const getSalesRate = await prisma.tableSales.findFirst({
            where: { 
                id: id,
            },
            select: {
                salesRate: true
            }
        });

        // if rate not exist
        if(!getSalesRate) {
            return NextResponse.json({operateTime: null, message: "rate not exist"}, {status: 409});
        };

        // change rate hr to min
        let ratePerMinute = parseFloat(getSalesRate.salesRate) / 60;

        const totalPrice = parseInt(timeDif) * ratePerMinute;
        const totalRateSalesPrice = Math.ceil(totalPrice * 10) / 10;

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
        const totalTablePrice = totalRateSalesPrice + totalFnBSalesPrice;
        const roundedTotalTablePrice = Math.ceil(totalTablePrice * 10) / 10;

        const tableSales = await prisma.tableSales.update({
            where: {
                id: id
            },
            data: {
                note: note,
                tableStopTime: getTime,
                timeSpend: timeDif.toString(),
                tableRateSales: totalRateSalesPrice.toFixed(2).toString(),
                totalBeforeDiscount: roundedTotalTablePrice.toFixed(2).toString(),
                totalTableSales: roundedTotalTablePrice.toFixed(2).toString(),
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