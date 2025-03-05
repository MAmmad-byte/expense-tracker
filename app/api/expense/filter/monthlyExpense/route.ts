import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface MonthlyExpense {
  total: string;
  date: string;
}
const json = (param: any): any => {
    return JSON.stringify(
      param,
      (key, value) => (typeof value === "bigint" ? Number(value) : value) // return everything else unchanged
    );
  };

export async function GET() {
  try {
    
    const session = await auth();
    const data = await prisma.$queryRaw
    <MonthlyExpense[]>
    `select SUM(expense) as total ,  to_char(created_at,'Mon-YY') as date  FROM "Expense" WHERE userid = ${Number(session?.user?.id)}
    GROUP BY date ORDER BY date Desc;`;
    const obj = json(data);
    return NextResponse.json(JSON.parse(obj));
  } catch (error) {
    return NextResponse.json(error);
  }
}
