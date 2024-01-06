import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
     try{
        const startTime = await prisma.operateTime.findFirst({
            where: {
                mode: "open"
            }
        });

        return NextResponse.json(startTime, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch data"}, {status: 500});
    }
}

export async function POST() {
    try{

        // // get rate
        const Operaterate = await prisma.rate.findFirst({
            where: { 
                selected: true,
            },
            select: {
                rateperhour: true
            }
        });

        // if price not exist
        if(!Operaterate) {
            return NextResponse.json({operateTime: null, message: "rate not exist"}, {status: 409});
        };

        const startTime = await prisma.operateTime.create({
            data: {
                mode: "open",
                rate: Operaterate.rateperhour,
                totalTableSales: "0.00",
                totalFnBSales: "0.00",
                TotalDiscount: "0.00",
                totalDaySales: "0.00",
            },
        });

        return NextResponse.json(startTime, {status: 200});
    }

    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}

export async function PUT(req: Request) {
    try{
        const { id } = await req.json();

        const mode = await prisma.operateTime.update({
            where: {
                id: id,
            },
            data: {
                mode: "closed",
            }
        });

        return NextResponse.json({mode: mode}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
}