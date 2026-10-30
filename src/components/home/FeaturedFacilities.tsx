"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import FacilityCard from "@/components/shared/FacilityCard";
import SectionHeading from "./SectionHeading";
import { TFacility } from "@/types/facility.types";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

export default function FeaturedFacilities() {
  const { data: session, isPending } = useSession();
  const [facilities, setFacilities] = useState<TFacility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    // If no session (signed out), don't fetch facilities
    if (!session?.user) {
      setFacilities([]);
      setLoading(false);
      return;
    }

    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const serverUrl =
          process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${serverUrl}/facilities`);
        if (res.ok) {
          const data = await res.json();
          setFacilities(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch facilities:", res.status);
          setFacilities([]);
        }
      } catch (err) {
        console.error("Error fetching facilities:", err);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [session?.user?.email, isPending]);

  // If signed out, show sign-in message
  if (!isPending && !session?.user) {
    return (
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Featured Facilities"
            title="Top-Rated Venues Near You"
            description="Hand-picked facilities loved by our community of athletes."
          />
          <p className="mt-12 text-center text-muted-foreground">
            Please sign in to view featured facilities.
          </p>
        </div>
      </section>
    );
  }

  // Show loading spinner while auth or data is loading
  if (isPending || loading) {
    return (
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Featured Facilities"
            title="Top-Rated Venues Near You"
            description="Hand-picked facilities loved by our community of athletes."
          />
          <div className="mt-12 flex justify-center">
            <Spinner className="h-10 w-10" />
          </div>
        </div>
      </section>
    );
  }

  const shuffled = [...facilities].sort(() => 0.5 - Math.random());
  const displayFacilities = shuffled.slice(0, 6);

  return (
    <section className="bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Featured Facilities"
          title="Top-Rated Venues Near You"
          description="Hand-picked facilities loved by our community of athletes."
        />

        {displayFacilities.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            No facilities have been added yet.
          </p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayFacilities.map((facility) => (
                <FacilityCard
                  key={facility._id || facility.id}
                  facility={facility}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/facilities"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "px-5",
                })}
              >
                View All Facilities <ArrowRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
