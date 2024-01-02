import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const table_list = await prisma.table.findMany({
            include: {
                Status: true,
            },
        });

        return NextResponse.json(table_list, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch rate data"}, {status: 500});
    }
}

export async function POST(req: Request) {
    try{

        const { name } = await req.json();

        // check if name exist
        const nameExist = await prisma.table.findUnique({
            where: { name: name }
        })
        if(nameExist) {
            return NextResponse.json({table: null, message: "table already exist"}, {status: 409});
        }

        const table_list = await prisma.table.create({
            data: {
                name,
                statusId: 1,
            }
        });

        return NextResponse.json(table_list, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}