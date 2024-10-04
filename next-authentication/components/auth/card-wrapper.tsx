"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Header } from "./header"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google";
import { Social } from "./social"
import { BackButton } from "./back-button"

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface CardWrapperProps {
  children: ReactNode
  headerLabel: string,
  backButtonLabel: string,
  backButtonHref: string,
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className={cn("w-[400px] shadow-md", font.className)}>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial &&
        <CardFooter>
          <Social />
        </CardFooter>
      }
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
