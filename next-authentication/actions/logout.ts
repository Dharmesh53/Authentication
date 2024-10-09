"use server"

import { signOut } from "@/auth"

export const logout = async () => {
  // some server stuff like some query in database
  await signOut();
}
