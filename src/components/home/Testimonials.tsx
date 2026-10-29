import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export default function Testimonials() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Athletes Say"
          description="Thousands of players book their games with SportsNest every week."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-xl border bg-card p-6">
              <Quote className="mb-4 size-8 text-primary/40" />
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={
                      i < t.rating
                        ? "size-4 fill-amber-400 text-amber-400"
                        : "size-4 text-muted-foreground/40"
                    }
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials(t.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
