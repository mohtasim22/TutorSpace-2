import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center font-heading text-[1.375rem] font-extrabold text-foreground"
    >
      tutor<span className="text-primary">space</span>
    </Link>
  );
}
