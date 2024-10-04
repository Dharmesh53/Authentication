"use server"

import { LoginSchema, LoginType } from "@/schemas";

export const login = async (values: LoginType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields" }
  }

  return { success: "Email sent" }
}
