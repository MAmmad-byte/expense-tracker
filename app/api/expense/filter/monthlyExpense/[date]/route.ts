import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const session = await auth();
  const fromDate = new Date((await params).date)
  const toDate = new Date((await params).date);
  toDate.setMonth(toDate.getMonth() + 1)
  const expense = await prisma.expense.findMany({
      // select:{title},
      where:{userid:Number(session?.user?.id), AND:[{created_at:{gte:fromDate}},{created_at:{lt:toDate}}]},
      orderBy:{created_at:"desc"},
      include:{category:{select:{title:true}}}
  });

  return NextResponse.json(expense)
}