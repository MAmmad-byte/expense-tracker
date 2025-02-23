import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/client";
import { compare } from "bcrypt-ts";
import { NextResponse } from "next/server";

interface CredentialsInterface {
  email: string;
  password: string;
}
class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      // credentials: {
      //   email: {},
      //   password: {},
      // },
      authorize: async (credentials: Partial<CredentialsInterface>) => {
        if (credentials == null) return null;
        let user = null;

        user = await prisma.user.findUnique({
          select: { email: true, password: true },
          where: { email: credentials.email },
        });
        if (user) {
          const passCheck = await compare(
            credentials.password || "",
            user.password
          );
          if (!passCheck) {
            // return NextResponse.json("Invalid email or Password!", {status:401})

            throw new InvalidLoginError("Password incorrect");
            // throw new Error("Password incorrect");
          }
        } else {
          // throw new Error("Email not found");
          throw new InvalidLoginError("Email not found");
        }

        return user;
      },
    }),
  ],
});
