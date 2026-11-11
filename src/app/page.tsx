import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-4 py-16 sm:px-8">
      <Logo />
      <h1 className="text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
        Sit in a real class.{" "}
        <span className="text-primary underline decoration-4 underline-offset-8">From home.</span>
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        TutorSpace 2.0 is being rebuilt. Sign-in and dashboards arrive in the next stages.
      </p>
      <div>
        <Button asChild size="lg">
          <Link href="/styleguide">See the design system</Link>
        </Button>
      </div>
    </main>
  );
}
