import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(){
    const session = await auth();
    const data = await prisma.$queryRaw`Select MONTH(created_at) as month, SUM(expense) from Expense Where id=1 groupBy month`
    return NextResponse.json(data)
}