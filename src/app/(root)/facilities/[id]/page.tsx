import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { TFacility } from "@/types/facility.types";
import BookingForm from "./_components/BookingForm";

// Shared by generateMetadata and the page so the facility is fetched once per request.
const getFacility = cache(async (id: string): Promise<TFacility | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  // The server answers an unknown id with an empty body, which isn't valid JSON.
  return res.json().catch(() => null);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const facility = await getFacility(id);

  return {
    title: `${facility?.name ?? "Facility Not Found"} | SportsNest`,
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const facility = await getFacility(id);

  if (!facility) notFound();

  const { name, sport, image, location, capacity, description, rating, reviews } =
    facility;

  return (
    <section className="container mx-auto px-4 py-12">
      <Link
        href="/facilities"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "mb-6 -ml-2.5",
        })}
      >
        <ArrowLeft />
        All Facilities
      </Link>

      <div className="grid items-start gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            {/* Image URLs are user-submitted and can be on any host, so skip the
                optimizer (it only accepts hosts listed in next.config remotePatterns). */}
            <Image
              src={image}
              alt={name}
              fill
              unoptimized
              preload
              className="object-cover"
            />
          </div>

          <div>
            <Badge>{sport}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {location}
              </p>
              {capacity !== undefined && (
                <p className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  Up to {capacity} players
                </p>
              )}
              {rating !== undefined && (
                <p className="flex items-center gap-1.5">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-foreground">{rating}</span>
                  {reviews !== undefined && <span>({reviews} reviews)</span>}
                </p>
              )}
            </div>
          </div>

          {description && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold">About this facility</h2>
              <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">
                {description}
              </p>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24">
          <BookingForm facility={facility} />
        </aside>
      </div>
    </section>
  );
};

export default page;
