import prisma from "@/prisma/client";
import { NextResponse } from "next/server";



export async function GET(){
    try {
        const response = await prisma.expenseCategory.findMany({
            select:{id:true, title:true}
        })
        
        return NextResponse.json(response, {status:200})
        
    } catch (error) {
        return NextResponse.json("Unable to fetch Categories." + error, {status:500})   
    }
}