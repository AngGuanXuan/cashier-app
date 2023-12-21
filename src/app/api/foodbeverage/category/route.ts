import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const category = await prisma.fnBCategory.findMany();

        return NextResponse.json(category, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch category"}, {status: 500});
    }
}