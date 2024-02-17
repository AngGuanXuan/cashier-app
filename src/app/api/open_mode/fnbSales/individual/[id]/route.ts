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

        const fnBSales = await prisma.fnBSales.findMany({
            where: {
                fnBSalesIndvidualId: parseInt(params.id),
            },
            include: {
                FoodBeverage: true,
            }
        });

        return NextResponse.json(fnBSales, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: "could not fetch data"}, {status: 500});
    }
}

export async function POST(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        const { foodBeverageId , amount } = await req.json();

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

        const fnBSales = await prisma.fnBSales.create({
            data: {
                fnBSalesIndvidualId: parseInt(params.id),
                foodBeverageId: parseInt(foodBeverageId),
                amount: parseInt(amount),
                totalFnBSales: unitFnBSales.toFixed(2).toString(),
            }
        });

        // get fnb Individual ori total price
        const oriTotalFnBIndvPrice = await prisma.fnBSalesIndvidual.findUnique({
            where: { 
                id: parseInt(params.id),
            },
            select: {
                totalBeforeDiscount: true,
                totalIndvFnBSales: true,
            }
        });

        // if price not exist
        if(!oriTotalFnBIndvPrice) {
            return NextResponse.json({foodBeverage: null, message: "total price not exist"}, {status: 409});
        };
        const oriUnitFnBIndvSales = parseFloat(oriTotalFnBIndvPrice.totalBeforeDiscount);

        const updatedUnitFnBIndvSales = oriUnitFnBIndvSales + unitFnBSales;


        const fnBSalesIndvidual = await prisma.fnBSalesIndvidual.update({
            where: { 
                id: parseInt(params.id),
            },
            data: {
                totalBeforeDiscount: updatedUnitFnBIndvSales.toFixed(2).toString(),
                totalIndvFnBSales: updatedUnitFnBIndvSales.toFixed(2).toString(),
            },
        });

        return NextResponse.json({fnBSales: fnBSales , fnBSalesIndvidual: fnBSalesIndvidual}, { status: 200});
    }
    catch(error){
        return NextResponse.json({message: "Something went wrong!"}, {status: 500});
    }
}

export async function PUT(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        const { amount , totalFnBSales , FnBIndvSalesId } = await req.json();

        // get fnb ori total price
        const oriTotalFnBPrice = await prisma.fnBSales.findUnique({
            where: { 
                id: parseInt(params.id),
            },
            select: {
                totalFnBSales: true
            }
        });

        // if price not exist
        if(!oriTotalFnBPrice) {
            return NextResponse.json({foodBeverage: null, message: "total price not exist"}, {status: 409});
        };
        const oriUnitFnBSales = parseFloat(oriTotalFnBPrice.totalFnBSales);

        // get total fnb sales from table sales
        const FnBIndividualSales = await prisma.fnBSalesIndvidual.findFirst({
            where: { 
                id: parseInt(FnBIndvSalesId),
            },
            select: {
                totalBeforeDiscount: true,
                totalIndvFnBSales: true,
            }
        });

        // if total fnb Individual sales not exist
        if(!FnBIndividualSales) {
            return NextResponse.json({foodBeverage: null, message: "FnB Individual total fnb sales not exist"}, {status: 409});
        };

        const oriTotalfnbIndividualSales = parseFloat(FnBIndividualSales.totalBeforeDiscount);
        const beforeUpdateTotalFnBIndvSales = oriTotalfnbIndividualSales - oriUnitFnBSales;

        const updateDeductTotalFnBIndvSales = await prisma.fnBSalesIndvidual.update({
            where: { 
                id: parseInt(FnBIndvSalesId),
            },
            data: {
                totalBeforeDiscount: beforeUpdateTotalFnBIndvSales.toFixed(2).toString(),
                totalIndvFnBSales: beforeUpdateTotalFnBIndvSales.toFixed(2).toString(),
            },
        });

        const fnBSales = await prisma.fnBSales.update({
            where: {
                id: parseInt(params.id),
            },
            data: {
                amount: amount,
                totalFnBSales: totalFnBSales
            },
        });

        const UpdatedTotalFnBIndvSales =  beforeUpdateTotalFnBIndvSales + parseFloat(totalFnBSales);


        const updateNewTotalFnBIndvSales = await prisma.fnBSalesIndvidual.update({
            where: { 
                id: parseInt(FnBIndvSalesId),
            },
            data: {
                totalBeforeDiscount: UpdatedTotalFnBIndvSales.toFixed(2).toString(),
                totalIndvFnBSales: UpdatedTotalFnBIndvSales.toFixed(2).toString(),
            },
        });
        

        return NextResponse.json({fnBSalesIndvidual: updateDeductTotalFnBIndvSales , fnBSales: fnBSales , updateNewTotalFnBIndvSales}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
    
}

export async function DELETE(req: Request, context: ContextProps) {
    try{
        const {params} = context;

        // get fnb total price
        const unitTotalFnBPrice = await prisma.fnBSales.findUnique({
            where: { 
                id: parseInt(params.id),
            },
            select: {
                fnBSalesIndvidualId: true,
                totalFnBSales: true
            }
        });

        // if price not exist
        if(!unitTotalFnBPrice) {
            return NextResponse.json({foodBeverage: null, message: "table total fnb sales not exist"}, {status: 409});
        };

        const unitTotalFnBSales = parseFloat(unitTotalFnBPrice.totalFnBSales);
        let getFnBSalesIndvidualId = unitTotalFnBPrice?.fnBSalesIndvidualId;

        if(getFnBSalesIndvidualId == null) {
            getFnBSalesIndvidualId = 0;
        }

        // get total fnb sales from fnb Individual sales
        const tableSales = await prisma.fnBSalesIndvidual.findFirst({
            where: { 
                id: getFnBSalesIndvidualId,
            },
            select: {
                totalBeforeDiscount: true,
                totalIndvFnBSales: true,
            }
        });

        // if total fnb Individual sales not exist
        if(!tableSales) {
            return NextResponse.json({foodBeverage: null, message: "table total fnb sales not exist"}, {status: 409});
        };

        const beforeTotalFnBIndvSales = parseFloat(tableSales.totalBeforeDiscount);
        const newTotalFnBIndvSales = beforeTotalFnBIndvSales - unitTotalFnBSales;

        const updatedTotalFnBIndvSales = await prisma.fnBSalesIndvidual.update({
            where: { 
                id: getFnBSalesIndvidualId,
            },
            data: {
                totalBeforeDiscount: newTotalFnBIndvSales.toFixed(2).toString(),
                totalIndvFnBSales: newTotalFnBIndvSales.toFixed(2).toString(),
            },
        });

        await prisma.fnBSales.delete({
            where: {
                id: parseInt(params.id)
            }
        });

        updatedTotalFnBIndvSales;

        return new Response(null, {status: 204})
    }
    catch(error){
        return NextResponse.json({message: "could not delete FnB Sales data"}, {status: 500});
    }
}