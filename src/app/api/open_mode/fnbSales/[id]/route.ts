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
                tableSalesId: parseInt(params.id),
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
                tableSalesId: parseInt(params.id),
                foodBeverageId: parseInt(foodBeverageId), 
                amount: parseInt(amount),
                totalFnBSales: unitFnBSales.toFixed(2).toString(),
            },
        });

        // get total fnb sales from table sales
        const tableSales = await prisma.tableSales.findFirst({
            where: { 
                id: parseInt(params.id),
            },
            select: {
                totalFnBSales: true
            }
        });

        // if total fnb sales not exist
        if(!tableSales) {
            return NextResponse.json({foodBeverage: null, message: "fnb sales not exist"}, {status: 409});
        };

        const oriTotalfnbSales = parseFloat(tableSales.totalFnBSales);
        const totalFnBSales = oriTotalfnbSales + unitFnBSales;

        const updateTotalFnBSales = await prisma.tableSales.update({
            where: { 
                id: parseInt(params.id),
            },
            data: {
                totalFnBSales: totalFnBSales.toFixed(2).toString(),
            },
        });


        return NextResponse.json({fnBSales: fnBSales, tableSales: updateTotalFnBSales}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
    
}

export async function PUT(req: Request, context: ContextProps) {
    try{
        const {params} = context;
        const { amount , totalFnBSales , tableSalesId } = await req.json();

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
        const tableSales = await prisma.tableSales.findFirst({
            where: { 
                id: parseInt(tableSalesId),
            },
            select: {
                totalFnBSales: true
            }
        });

        // if total fnb sales not exist
        if(!tableSales) {
            return NextResponse.json({foodBeverage: null, message: "table total fnb sales not exist"}, {status: 409});
        };

        const oriTotalfnbSales = parseFloat(tableSales.totalFnBSales);
        const beforeUpdateTotalFnBSales = oriTotalfnbSales - oriUnitFnBSales;

        const updateDeductTotalFnBSales = await prisma.tableSales.update({
            where: { 
                id: parseInt(tableSalesId),
            },
            data: {
                totalFnBSales: beforeUpdateTotalFnBSales.toFixed(2).toString(),
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

        const UpdatedTotalFnBSales =  beforeUpdateTotalFnBSales + parseFloat(totalFnBSales);


        const updateNewTotalFnBSales = await prisma.tableSales.update({
            where: { 
                id: parseInt(tableSalesId),
            },
            data: {
                totalFnBSales: UpdatedTotalFnBSales.toFixed(2).toString(),
            },
        });
        

        return NextResponse.json({tableSales: updateDeductTotalFnBSales , fnBSales: fnBSales , updateNewTotalFnBSales}, { status: 200})

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
                tableSalesId: true,
                totalFnBSales: true
            }
        });

        // if price not exist
        if(!unitTotalFnBPrice) {
            return NextResponse.json({foodBeverage: null, message: "table total fnb sales not exist"}, {status: 409});
        };

        const unitTotalFnBSales = parseFloat(unitTotalFnBPrice.totalFnBSales);
        let getTableSalesId = unitTotalFnBPrice?.tableSalesId;

        if(getTableSalesId == null) {
            getTableSalesId = 0;
        }

        // get total fnb sales from table sales
        const tableSales = await prisma.tableSales.findFirst({
            where: { 
                id: getTableSalesId,
            },
            select: {
                totalFnBSales: true
            }
        });

        // if total fnb sales not exist
        if(!tableSales) {
            return NextResponse.json({foodBeverage: null, message: "table total fnb sales not exist"}, {status: 409});
        };

        const beforeTotalFnBSales = parseFloat(tableSales.totalFnBSales);
        const newTotalFnBSales = beforeTotalFnBSales - unitTotalFnBSales;

        const updatedTotalFnBSales = await prisma.tableSales.update({
            where: { 
                id: getTableSalesId,
            },
            data: {
                totalFnBSales: newTotalFnBSales.toFixed(2).toString(),
            },
        });

        await prisma.fnBSales.delete({
            where: {
                id: parseInt(params.id)
            }
        });

        updatedTotalFnBSales;

        return new Response(null, {status: 204})
    }
    catch(error){
        return NextResponse.json({message: "could not delete FnB Sales data"}, {status: 500});
    }
}