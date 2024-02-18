import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{

        const fnBSalesIndvidual = await prisma.fnBSalesIndvidual.findFirst({
            where: {
                paid: false,
            },
            include: {
                FnBSales: {
                    include: {
                        FoodBeverage: true,
                    }
                },
            }
        });

        return NextResponse.json(fnBSalesIndvidual, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch data"}, {status: 500});
    }
}

export async function POST(req: Request) {
    try{

        const { foodBeverageId , amount } = await req.json();

        // get operate Time data
        const getOpTime = await prisma.operateTime.findFirst({
            where: { 
                mode: 'open',
            }
        });

        // if price not exist
        if(!getOpTime) {
            return NextResponse.json({foodBeverage: null, message: "Operate Time not exist"}, {status: 409});
        };
        const opTimeId = getOpTime.id;

        // get price
        const fnbPrice = await prisma.foodBeverage.findUnique({
            where: { 
                id: parseInt(foodBeverageId),
            },
            select: {
                price: true
            }
        });

        // if price not exist
        if(!fnbPrice) {
            return NextResponse.json({foodBeverage: null, message: "price not exist"}, {status: 409});
        };

        const unitFnBSales = parseInt(amount) * parseFloat(fnbPrice.price);

        const fnBSalesIndvidualCount = await prisma.fnBSalesIndvidual.count();

         const fnBSalesIndvidual = await prisma.fnBSalesIndvidual.create({
            data: {
                id: fnBSalesIndvidualCount + 1,
                operateTimeId: opTimeId,
                totalBeforeDiscount: unitFnBSales.toFixed(2).toString(),
                discount: "0.00",
                totalIndvFnBSales: unitFnBSales.toFixed(2).toString(),
                customerPay: "0.00",
                balance: "0.00"
            }
        });

        const fnBSales = await prisma.fnBSales.create({
            data: {
                operateTimeId: opTimeId,
                fnBSalesIndvidualId: fnBSalesIndvidualCount + 1,
                foodBeverageId: parseInt(foodBeverageId),
                amount: parseInt(amount),
                totalFnBSales: unitFnBSales.toFixed(2).toString(),
            }
        });

        return NextResponse.json({fnBSales: fnBSales , fnBSalesIndvidual: fnBSalesIndvidual}, { status: 200});
    }
    catch(error){
        return NextResponse.json({message: "Something went wrong!"}, {status: 500});
    }
}

export async function PUT(req: Request) {
    try{

        const { FnBIndvSalesId , FnBIndvSalesDiscount } = await req.json();

        // get totalTablesales
        const getTotalFnBIndvSales = await prisma.fnBSalesIndvidual.findFirst({
            where: { 
                id: FnBIndvSalesId,
            },
            select: {
                discount: true,
                totalIndvFnBSales: true,
            }
        });

        // if total table sales not exist
        if(!getTotalFnBIndvSales) {
            return NextResponse.json({operateTime: null, message: "total table sales not exist"}, {status: 409});
        };

        // ori total sales plus back ori discount
        const totalFnBIndvSalesPrice = parseFloat(getTotalFnBIndvSales.totalIndvFnBSales) + parseFloat(getTotalFnBIndvSales.discount);
        
        const newTotalFnBIndvSalesPrice = totalFnBIndvSalesPrice - parseFloat(FnBIndvSalesDiscount);

        const fnBSalesIndividual = await prisma.fnBSalesIndvidual.update({
            where: {
                id: FnBIndvSalesId
            },
            data: {
                totalIndvFnBSales: newTotalFnBIndvSalesPrice.toFixed(2).toString(),
                discount: FnBIndvSalesDiscount,
            },
        });

        return NextResponse.json({fnBSalesIndividual: fnBSalesIndividual}, { status: 200})

    }
    catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500});
    }
}

