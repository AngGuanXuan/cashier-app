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
        const foodBeverage = await prisma.foodBeverage.findFirst({
            where: {
                id: parseInt(params.id)
            }
        });

        return NextResponse.json(foodBeverage, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch food or beverage data"}, {status: 500});
    }
}

export async function PUT(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        const { name, price, CategoryId } = await req.json();

        const foodBeverage = await prisma.foodBeverage.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                name: name, 
                price: price,
                CategoryId: parseInt(CategoryId)
            },
        });

        return NextResponse.json({foodBeverage: foodBeverage}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
    
}

export async function DELETE(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        await prisma.foodBeverage.delete({
            where: {
                id: parseInt(params.id)
            }
        });

        return new Response(null, {status: 204})
    }
    catch(error){
        return NextResponse.json({message: "could not delete food or beverage data"}, {status: 500});
    }
}