import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(3).max(55),
    category: z.string(),
    expense:z.coerce.number().min(1),
    description: z.string().max(5000).optional().default("")
})
export async function POST(request: NextRequest){
    const session = await auth();
    const body =  await request.json();
    const validate = schema.safeParse(body)
    if(!validate.success){
        return NextResponse.json(validate.error.format(), {status:400})
    }

    const expense = await prisma.expense.create({
        data:{
            title: validate.data.title,
            category: validate.data.category,
            expense:validate.data.expense,
            description:validate.data.description,
            userid:Number(session?.user?.id)
        }
    })

    return NextResponse.json(expense)
}
export async function GET(){
    const session = await auth();
    const expense = await prisma.expense.findMany({
        where:{userid:Number(session?.user?.id)}
    });

    return NextResponse.json(expense)
}