import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import FacilityCard from "@/components/shared/FacilityCard";
import { featuredFacilities } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function FeaturedFacilities() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Featured Facilities"
          title="Top-Rated Venues Near You"
          description="Hand-picked facilities loved by our community of athletes."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFacilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/facilities"
            className={buttonVariants({ variant: "outline", size: "lg", className: "px-5" })}
          >
            View All Facilities <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
