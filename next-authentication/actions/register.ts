"use server"

import { RegisterSchema, RegisterType } from "@/schemas";

export const register = async (values: RegisterType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields" }
  }

  return { success: "Account created" }
}
