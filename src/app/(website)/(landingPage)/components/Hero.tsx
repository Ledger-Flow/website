import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="from-background via-background to-muted/30 bg-linear-to-b pt-32 pb-20">
      <section className="wrapper max-w-4xl text-center text-balance">
        {/* Announcement Badge */}
        <span className="bg-muted/50 border-border mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-md">
          <span className="bg-accent size-2.5 rounded-full" />

          <span className="text-muted-foreground text-sm">
            Now available for Nigerian SMEs
          </span>
        </span>

        {/* Heading */}
        <h1 className="text-foreground mb-6 text-5xl font-bold md:text-6xl">
          From invoice to insight.
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl leading-relaxed">
          Manage invoices, inventory, and taxes seamlessly, and turn everyday
          transactions into actionable insights.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={"/auth"}
            className="bg-primary group transition-300 flex items-center justify-center gap-2 rounded-full px-8 py-3 font-medium text-white hover:opacity-90"
          >
            Get Started for Free{" "}
            <MoveRight className="transition-300 size-4.5 group-hover:translate-x-1" />
          </Link>

          <Link
            href={"#"}
            className="border-border text-foreground hover:bg-muted transition-300 rounded-full border px-8 py-3 font-medium"
          >
            Learn More
          </Link>
        </div>

        {/* Hero Image Placeholder */}
        <div className="border-border bg-muted/50 mt-16 flex aspect-video items-center justify-center overflow-hidden rounded-lg border">
          <div className="text-center">
            <div className="mb-4 text-6xl">📊</div>
            <p className="text-muted-foreground">
              Business dashboard illustration
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
