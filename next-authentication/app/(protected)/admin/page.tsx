"use client"

import { admin } from "@/actions/admin"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

const AdminPage = () => {
  const role = useCurrentRole()

  const onServerActionClick = () => {
    admin()
      .then(response => {
        if (response.success) {
          toast.success("Allowed server action")
        } else {
          toast.error("Forbidden server action")
        }
      })
  }

  const onApiRoteClick = () => {
    fetch("/api/admin")
      .then(response => {
        if (response.ok) {
          toast.success("Allowed API Route")
        } else {
          toast.error("Forbidden API Route")
        }
      })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Admin
        </p>
      </CardHeader>
      <CardContent className="space-y-4"  >
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Admin only API route</p>
            <Button onClick={onApiRoteClick}>Click to test</Button>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Admin only Server action</p>
            <Button onClick={onServerActionClick}>Click to test</Button>
          </div>
        </RoleGate>
      </CardContent>
    </Card>
  )
}

export default AdminPage
