"use server"

import { getUserByEmail } from "@/data/user"
import { sendPasswordResetTokenEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { ResetSchema, ResetType } from "@/schemas"
import { db } from "@/lib/db"

export const reset = async (values: ResetType) => {
  const validateFields = ResetSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Entered fields" }
  }

  const { email } = validateFields.data
  const user = await getUserByEmail(email)

  if (!user) {
    return { error: "Email not found" }
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetTokenEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: "Reset mail sent!" }
}
