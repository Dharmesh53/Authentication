"use client"

import { ClimbingBoxLoader } from "react-spinners"
import { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || ""
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const onSubmit = useCallback(() => {
    if (!token || token) {
      setError("Missing Token");
    }

    newVerification(token)
      .then((data) => {
        setError(data?.error ?? "")
        setSuccess(data?.success ?? "")
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
      >
        <div className="flex items-center justify-center w-full">
          {!success && !error && <ClimbingBoxLoader />}
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
      </CardWrapper>
    </div>
  )
}
