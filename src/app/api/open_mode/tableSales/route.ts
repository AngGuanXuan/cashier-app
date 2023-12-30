import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{

        const { tableId , note } = await req.json();

        const table_sales = await prisma.tableSales.create({
            data: {
                tableId , note
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