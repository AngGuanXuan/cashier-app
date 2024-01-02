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

        const tableSales = await prisma.tableSales.findFirst({
            where: {
                tableId: parseInt(params.id)
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                Table: true
            }
        });

        return NextResponse.json(tableSales, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch data"}, {status: 500});
    }
}

export async function PUT(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        
        const { note } = await req.json();

        const tableSales = await prisma.tableSales.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                note: note
            },
        });

        return NextResponse.json({tableSales: tableSales}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
    
}