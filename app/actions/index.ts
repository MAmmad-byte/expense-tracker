"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export async function doCredentialsLogin(formdata: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formdata.get("email"),
      password: formdata.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    const someError = error as CredentialsSignin;
    return {error:someError.code};
  }
}
