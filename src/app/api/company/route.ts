import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const company = await prisma.company.findFirst({
            where: {
                id: 1
            },
            include: {
                state: true,
            }
        });

        return NextResponse.json(company, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch company data"}, {status: 500});
    }
}

export async function PUT(req: Request) {
    try{
        const { name,
                email,
                phone_no,
                address_1,
                address_2,
                city,
                stateId,
                posCode, } = await req.json();

        const company = await prisma.company.update({
            where: {
                id: 1
            },
            data: {
                name: name,
                email:email ,
                phone_no: phone_no,
                address_1: address_1,
                address_2: address_2,
                city : city,
                stateId: parseInt(stateId),
                posCode: posCode,
            },
        });

        return NextResponse.json({company: company}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
    
}