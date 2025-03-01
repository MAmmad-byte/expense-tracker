import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {genSalt, hash} from "bcrypt-ts"
import { signIn } from "@/auth";

export async function POST(request: NextRequest){

    const body =  await request.json();
    const validate = registerSchema.safeParse(body)
    if(!validate.success){
        return NextResponse.json(validate.error.format(), {status:400})
    }
    const user = await prisma.user.findUnique({where: {email:validate.data.email}})
    if(user){
        return NextResponse.json("User with this email already exist", {status:400})
    }
    const salt = await genSalt(10)
    const hashPassword = await hash(validate.data.password, salt)
    const response = await prisma.user.create({data:{
        name: validate.data.name,
        email: validate.data.email,
        password: hashPassword
    }});
    return NextResponse.json({email: response.email})
}

     const registerSchema = z.object({
       name: z.string().min(3).max(55),
       email: z.string().email(),
       password: z.string().min(4).max(20)
     })