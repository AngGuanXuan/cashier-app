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

export async function POST(req: Request) {
    try{

        const { name, rateperhour, selected } = await req.json();

        // check if rate exist
        const nameExist = await prisma.rate.findUnique({
            where: { name: name }
        })

        if(nameExist) {
            return NextResponse.json({rate: null, message: "rate already exist"}, {status: 409});
        }

        const rate = await prisma.rate.create({
            data: {
                name, rateperhour , selected 
            }
        });

        return NextResponse.json(rate, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}