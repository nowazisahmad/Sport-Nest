import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TFacility } from "@/types/facility.types";

export default function FacilityCard({ facility }: { facility: TFacility }) {
  const {
    _id,
    id,
    name,
    sport,
    image,
    location,
    pricePerHour,
    capacity,
    rating,
    reviews,
  } = facility;

  const facilityId = _id || id;

  return (
    <Card className="group pt-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {/* Image URLs are user-submitted and can be on any host, so skip the
            optimizer (it only accepts hosts listed in next.config remotePatterns). */}
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3">{sport}</Badge>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          {rating !== undefined && (
            <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {rating}
              {reviews !== undefined && (
                <span className="text-muted-foreground">({reviews})</span>
              )}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-1.5 text-muted-foreground">
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
      </CardContent>

      <CardFooter className="mt-auto justify-between border-t py-4">
        <p>
          <span className="text-xl font-bold text-primary">
            ৳{Number(pricePerHour).toLocaleString("en-US")}
          </span>
          <span className="text-muted-foreground"> / hour</span>
        </p>
        <Link
          href={`/facilities/${facilityId}`}
          className={buttonVariants({ size: "sm" })}
        >
          Book Now
        </Link>
      </CardFooter>
    </Card>
  );
}
