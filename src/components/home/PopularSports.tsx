import Image from "next/image";
import Link from "next/link";
import { popularSports } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function PopularSports() {
  return (
    <section id="popular-sports" className="scroll-mt-16 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Popular Sports"
          title="What Do You Want to Play Today?"
          description="Pick a sport and discover top-rated venues around you."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {popularSports.map((sport) => (
            <Link
              key={sport.id}
              href="/facilities"
              className="group relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <Image
                src={sport.image}
                alt={sport.name}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{sport.name}</h3>
                <p className="text-sm text-white/75">
                  {sport.facilities} facilities
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}