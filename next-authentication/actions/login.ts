"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginType } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (values: LoginType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email) {
    return { error: "User does not exists" }
  }
  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { success: "Confirmation email sent" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    // that's in the offical document, don't blame me
    // signin wouldn't redirect if this line is deleted
    throw error;
  }

  return { success: "Login Successful" };
};
