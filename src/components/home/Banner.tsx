import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, MapPin, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { bannerImage } from "@/lib/data";

const stats = [
  { icon: MapPin, value: "200+", label: "Facilities" },
  { icon: Users, value: "15k+", label: "Athletes" },
  { icon: CalendarCheck, value: "50k+", label: "Bookings" },
];

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={bannerImage}
        alt="Floodlit stadium at night"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />

      <div className="container mx-auto px-4 py-24 text-white sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary ring-1 ring-primary/40">
            Book. Play. Repeat.
          </span>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Find &amp; Book the Perfect{" "}
            <span className="text-primary">Sports Facility</span>
          </h1>
          <p className="mt-6 text-lg text-white/80">
            Turfs, courts, pools and gyms near you. Check real-time
            availability, compare prices and lock in your slot in seconds.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/facilities"
              className={buttonVariants({ size: "lg", className: "h-11 px-6 text-base" })}
            >
              Explore Facilities <ArrowRight />
            </Link>
            <Link
              href="#popular-sports"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "h-11 border-white/40 bg-white/10 px-6 text-base text-white hover:bg-white/20 hover:text-white",
              })}
            >
              Browse Sports
            </Link>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <Icon className="mb-2 size-5 text-primary" />
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-bold">{value}</dd>
                <dd className="text-sm text-white/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
