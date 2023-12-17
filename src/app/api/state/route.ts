import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const states = await prisma.state.findMany();

        return NextResponse.json(states, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch state"}, {status: 500});
    }
}