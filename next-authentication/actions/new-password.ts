"use server"

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { NewPasswordSchema, NewPasswordType } from "@/schemas"

export const setNewPassword = async (
  values: NewPasswordType,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token!" }
  }

  const validatedFields = NewPasswordSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }

  const { password } = validatedFields.data

  const passwordToken = await getPasswordResetTokenByToken(token);
  if (!passwordToken) {
    return { error: "Token not found!" }
  }

  const hasExpired = new Date(passwordToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token expired" }
  }

  const user = await getUserByEmail(passwordToken.email);
  if (!user) {
    return { error: "Email does not exists" }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword }
  })

  await db.passwordResetToken.delete({
    where: { id: passwordToken.id }
  })

  return { success: "Password changed successfully" }
}
