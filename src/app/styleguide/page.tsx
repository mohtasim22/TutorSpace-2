import type { Metadata } from "next";
import { CalendarX2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = { title: "Styleguide · TutorSpace" };

const swatches = [
  ["Board", "bg-background", "#0F1714"],
  ["Band", "bg-band", "#131D19"],
  ["Surface", "bg-card", "#1A2721"],
  ["Raised", "bg-raised", "#2A3A32"],
  ["Chalk yellow", "bg-primary", "#F4D35E"],
  ["Success", "bg-success", "#8EE0A8"],
  ["Warning", "bg-warning", "#FFB37A"],
  ["Red chalk", "bg-destructive", "#F0736A"],
] as const;

// Sample rows, only to show the table style
const classes = [
  { day: "Tue 21", time: "6:00 pm", title: "Elasticity of demand", seats: "3 / 5", status: "Open" },
  { day: "Thu 23", time: "10:00 am", title: "HSC Macroeconomics revision", seats: "1 / 1", status: "Full" },
  { day: "Sat 25", time: "6:00 pm", title: "Market structures", seats: "0 / 8", status: "Open" },
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[1.375rem] font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-10 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Logo />
        <span className="text-sm font-bold tracking-widest text-primary">CHALKBOARD</span>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight">Design system</h1>

      <Section title="Colours">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {swatches.map(([name, className, hex]) => (
            <div key={name} className="rounded-xl bg-card p-3">
              <div className={`h-12 rounded-lg border ${className}`} />
              <p className="mt-2 font-semibold">{name}</p>
              <p className="text-sm text-muted-foreground tabular-nums">{hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-4xl font-extrabold tracking-tight">
            Bricolage Grotesque for headings
          </p>
          <p>Hanken Grotesk for everything else.</p>
          <p className="text-muted-foreground">Muted text for secondary details.</p>
          <p className="font-heading text-2xl font-bold tabular-nums">6:00 pm · ৳900</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Book a seat</Button>
          <Button variant="secondary">Read summary</Button>
          <Button variant="soft">Practice quiz</Button>
          <Button variant="outline">View profile</Button>
          <Button variant="ghost">Not now</Button>
          <Button variant="destructive">Cancel class</Button>
          <Button variant="link">Forgot password?</Button>
          <Button disabled>Full</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge variant="warning">Seat held</Badge>
          <Badge variant="success">Paid</Badge>
          <Badge>Refund processing</Badge>
          <Badge variant="destructive">Cancelled</Badge>
          <Badge variant="secondary">Expired</Badge>
          <Badge variant="outline">Full</Badge>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid max-w-md gap-5">
          <Field>
            <FieldLabel htmlFor="sg-email">Email</FieldLabel>
            <Input id="sg-email" type="email" placeholder="you@example.com" />
          </Field>
          <Field data-invalid="true">
            <FieldLabel htmlFor="sg-phone">Phone</FieldLabel>
            <Input id="sg-phone" type="tel" defaultValue="0171" aria-invalid="true" />
            <FieldError>Enter an 11-digit Bangladeshi number.</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="sg-note">Note for the tutor</FieldLabel>
            <Textarea id="sg-note" placeholder="What would you like to cover?" />
            <FieldDescription>Optional. Only your tutor sees this.</FieldDescription>
          </Field>
        </div>
      </Section>

      <Section title="Card">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Supply &amp; demand</CardTitle>
            <CardDescription>Mehedi Hasan · 6:00 to 7:00 pm</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <span className="font-heading text-xl font-bold tabular-nums">৳900</span>
            <Badge variant="success">3 seats left</Badge>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Book a seat</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Table">
        <div className="rounded-xl bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Day</TableHead>
                <TableHead className="px-4">Class</TableHead>
                <TableHead className="px-4">Seats</TableHead>
                <TableHead className="px-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((c) => (
                <TableRow key={c.day}>
                  <TableCell className="px-4 text-muted-foreground tabular-nums">
                    {c.day} · {c.time}
                  </TableCell>
                  <TableCell className="px-4 font-semibold">{c.title}</TableCell>
                  <TableCell className="px-4 tabular-nums">{c.seats}</TableCell>
                  <TableCell className="px-4">
                    <Badge variant={c.status === "Full" ? "outline" : "success"}>{c.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section title="Empty state">
        <Empty className="bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarX2 aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle className="text-lg font-bold">No classes yet</EmptyTitle>
            <EmptyDescription>Book a seat in a class and it will show up here.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="secondary">Find a tutor</Button>
          </EmptyContent>
        </Empty>
      </Section>
    </main>
  );
}
