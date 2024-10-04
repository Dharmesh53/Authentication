import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  })
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

export type LoginType = z.infer<typeof LoginSchema>

export type RegisterType = z.infer<typeof RegisterSchema>
