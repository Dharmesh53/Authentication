"use client"

import { logout } from "@/actions/logout"

interface LogoutButtonProps {
  children: React.ReactNode,
}

export const LogoutButton = ({
  children,
}: LogoutButtonProps) => {

  const handleSubmit = () => {
    logout()
  }

  return (
    <span className="cursor-pointer" onClick={handleSubmit}>{children}</span>
  )
}
