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
        const rate = await prisma.rate.findFirst({
            where: {
                id: parseInt(params.id)
            }
        });

        return NextResponse.json(rate, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch rate data"}, {status: 500});
    }
}

export async function PUT(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        const { name, ratebefore5, rateafter5 , selected } = await req.json();

        const rate = await prisma.rate.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                name: name, 
                ratebefore5: ratebefore5,
                rateafter5: rateafter5,
                selected: selected
            },
        });

        return NextResponse.json({rate: rate}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
}

export async function DELETE(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        await prisma.rate.delete({
            where: {
                id: parseInt(params.id)
            }
        });

        return new Response(null, {status: 204})
    }
    catch(error){
        return NextResponse.json({message: "could not delete rate data"}, {status: 500});
    }
}