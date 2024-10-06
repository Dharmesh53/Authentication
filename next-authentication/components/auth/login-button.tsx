"use client"

import { useRouter } from "next/navigation"

interface LoginButtonProps {
  children: React.ReactNode,
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild }: LoginButtonProps) => {

  const router = useRouter();

  const handleSubmit = () => {
    router.push("/auth/login")
  }

  // TODO: implement modal
  if (mode === "modal") {
    return (
      <span>
      </span>
    )
  }

  return (
    <span className="cursor-pointer" onClick={handleSubmit}>{children}</span>
  )
}
