import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto">
      <div className="flex  justify-between text-center gap-4">
        <p className="font-bold text-5xl">
          <Link href="/dashboard">Invoicipedia</Link>
        </p>
      </div>
      <div>
        {
          <Button asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
        }
      </div>
    </main>
  );
}
