import { UserRole } from "@prisma/client"
import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
  code: z.optional(z.string())
})

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name required"
  }),
  email: z.string().email({
    message: "Email required"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  })
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  })
})

export const SettingSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  isTwoFactorEnabled: z.optional(z.boolean())
}).refine((data) => {
  if (data.password && !data.newPassword) return false;
  if (!data.password && data.newPassword) return false;

  return true;
}, {
  message: "Enter both password fields"
})

export type LoginType = z.infer<typeof LoginSchema>
export type RegisterType = z.infer<typeof RegisterSchema>
export type ResetType = z.infer<typeof ResetSchema>
export type NewPasswordType = z.infer<typeof NewPasswordSchema>
export type SettingType = z.infer<typeof SettingSchema>
