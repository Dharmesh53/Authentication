import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ['latin'], weight: ['600']
})

export default function Home() {
  return (
    <main className={cn("flex h-full flex-col items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-400", font.className)}>
      <div className="space-y-6 text-center">
        <h1 className={"text-6xl font-semibold text-white drop-shadow-sm"}>🔐 Auth Service</h1>
        <p className="text-white text-lg">A small step towards mind fuck</p>
        <div>
          <LoginButton>
            <Button size={"lg"} variant={"secondary"}>Sign In</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
