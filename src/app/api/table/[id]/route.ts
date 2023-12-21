import prisma from "@/lib/db";
import { NextResponse } from "next/server";

interface ContextProps {
    params: {
        id: string
    }
}

export async function GET(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        const table = await prisma.table.findFirst({
            where: {
                id: parseInt(params.id)
            }
        });

        return NextResponse.json(table, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch table data"}, {status: 500});
    }
}

export async function PUT(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        const { name } = await req.json();

        const table = await prisma.table.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                name: name, 
            },
        });

        return NextResponse.json({table: table}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
    
}

export async function DELETE(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        await prisma.table.delete({
            where: {
                id: parseInt(params.id)
            }
        });

        return new Response(null, {status: 204})
    }
    catch(error){
        return NextResponse.json({message: "could not delete table data"}, {status: 500});
    }
}