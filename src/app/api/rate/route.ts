import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const rate = await prisma.rate.findMany();

        return NextResponse.json(rate, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch rate data"}, {status: 500});
    }
}

export async function POST(req: Request) {
    try{

        const { name, rateperhour, selected } = await req.json();

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