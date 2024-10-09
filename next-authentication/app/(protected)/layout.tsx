import { cn } from "@/lib/utils"
import { Navbar } from "./_components/navbar"
import { Poppins } from "next/font/google"

const font = Poppins({
  subsets: ['latin'], weight: ['500']
})

const ProtectedLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className={cn("h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-400", font.className)}>
      <Navbar />
      {children}
    </div>
  )
}

export default ProtectedLayout
