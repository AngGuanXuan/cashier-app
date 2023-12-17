import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function PUT(req: Request) {
    try{
        const session = await  getServerSession(authOptions);
        const { newpassword , comfirmpassword } = await req.json();
        const hashPassword = await hash(newpassword, 10);

        const users = await prisma.user.update({
            where: {
                username: session?.user.username
            },
            data: {
                password: hashPassword,
            },
        });

        return NextResponse.json({user: users}, { status: 200})

    }
    catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
    
}