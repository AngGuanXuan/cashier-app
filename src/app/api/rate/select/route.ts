import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const rate = await prisma.rate.findMany({
           orderBy: 
            {
                selected: 'desc',
            }
        });

        return NextResponse.json(rate, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch rate data"}, {status: 500});
    }
}

export async function PUT(req: Request) {
    try{
        const { id } = await req.json();

        const rateFalse = await prisma.rate.updateMany({
            data: {
                selected: false
            },
        });

        const rateSelect = await prisma.rate.update({
            where: {
                id: parseInt(id)
            },
            data: {
                selected: true
            },
        });

        return NextResponse.json(rateFalse&&rateSelect, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: 'Something went wrong!'}, {status: 500});
    }
}