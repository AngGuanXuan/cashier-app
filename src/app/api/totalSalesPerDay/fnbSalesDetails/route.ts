import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{

        // get op time id 
        const getLatestOpTime = await prisma.operateTime.findFirst({
            where: {
                mode: "closed"
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        // if op time not exist
        if(!getLatestOpTime) {
            return NextResponse.json({foodBeverage: null, message: "Operate time not found."}, {status: 409});
        };

        const fnBSales = await prisma.fnBSales.groupBy({
            by: ['foodBeverageId'],
            where: {
                operateTimeId: getLatestOpTime.id,
            },
             _sum: {
                amount: true,
            },
        });

        return NextResponse.json(fnBSales, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch data"}, {status: 500});
    }
}