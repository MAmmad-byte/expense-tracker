import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
    try {
      const session = await auth();
    const expense = await prisma.expense.findFirst({
      where: { id: Number(params.id) },
      include: { category: { select: { title: true } } },
    });
    if (expense) {
      if (expense.userid == Number(session?.user?.id)) {
        return NextResponse.json(expense);
      } else {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
    }
    return NextResponse.json("Not Found", { status: 400 });
  } catch (error) {
    return NextResponse.json("Failed to get Expense" + error, { status: 500 });
  }
}
