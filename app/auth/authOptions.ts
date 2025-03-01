import Credentials from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import { CredentialsSignin } from "next-auth";
import { NextAuthConfig } from "next-auth";
import { compare } from "bcrypt-ts";
class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}
interface CredentialsInterface {
  email: string;
  password: string;
}

const authOptions: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
    providers: [
        Credentials({
            authorize: async (credentials: Partial<CredentialsInterface>) => {
                if (!credentials) return null;
                let user = null;
                
                user = await prisma.user.findUnique({
                    select: { email: true, password: true, name: true, id:true },
                    where: { email: credentials.email },
                });
                if (user) {
                    const passCheck = await compare(
                        credentials.password || "",
                        user.password
                    );
                    if (!passCheck) {
                        throw new InvalidLoginError("Password incorrect");
                    }
                } else {
                    throw new InvalidLoginError("Email not found");
                }
                
                return {id:user.id.toString(), email:user.email, name:user.name};
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
          if (user) { 
            token.id = user.id
          }
          return token
        },
        session({ session, token }) {
          session.user.id = token.id as string
          return session
        }
      }
}

export default authOptions;
