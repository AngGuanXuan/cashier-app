import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const foodbeverage = await prisma.foodBeverage.findMany({
           select: {
            id: true,
            name: true,
            price: true,
            FnBCategory: true,
            createdAt: true,
            updatedAt: true,
           }
        });

        return NextResponse.json(foodbeverage, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch food or beverage data"}, {status: 500});
    }
}

export async function POST(req: Request) {
    try{

        const { name, price, CategoryId } = await req.json();

        // check if fnb exist
        const nameExist = await prisma.foodBeverage.findUnique({
            where: { name: name }
        });

        if(nameExist) {
            return NextResponse.json({rate: null, message: "food or beverage already exist"}, {status: 409});
        };

        const foodbeverage = await prisma.foodBeverage.create({
            data: {
                name, 
                price, 
                fnBCategoryId: parseInt(CategoryId)
            }
        });

        return NextResponse.json(foodbeverage, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}