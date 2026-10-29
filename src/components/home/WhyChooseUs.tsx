import { CalendarCheck, Clock, Headphones, ShieldCheck, Wallet, Search } from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: Search,
    title: "Easy Discovery",
    description: "Filter by sport, location and price to find the right venue fast.",
  },
  {
    icon: CalendarCheck,
    title: "Instant Booking",
    description: "See real-time slot availability and confirm your booking in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Facilities",
    description: "Every venue is vetted for quality, safety and accurate listings.",
  },
  {
    icon: Wallet,
    title: "Best Prices",
    description: "Transparent pricing with no hidden fees and exclusive member deals.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book early-morning or late-night slots that fit your routine.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is always here to help with bookings and changes.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Why Choose SportsNest"
          title="Everything You Need to Get in the Game"
          description="We take the hassle out of booking so you can focus on playing."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
