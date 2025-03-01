import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth(async function middleware(req) {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
})

export const config = {
  matcher: "/",
};
