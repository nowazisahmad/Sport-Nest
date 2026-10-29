import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
          <div className="absolute -top-16 -left-16 size-56 rounded-full bg-white/10" />
          <div className="absolute -right-10 -bottom-20 size-64 rounded-full bg-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Book Your Next Game?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/85">
              Join thousands of athletes who find, book and play at the best
              facilities in town. Your next match is just a few clicks away.
            </p>
            <Link
              href="/facilities"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "mt-8 h-11 px-6 text-base",
              })}
            >
              Book a Facility <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
