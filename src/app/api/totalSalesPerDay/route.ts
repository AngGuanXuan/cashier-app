import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
     try{
        const totalSales = await prisma.operateTime.findFirst({
            where: {
                mode: "closed"
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return NextResponse.json(totalSales, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch data"}, {status: 500});
    }
}