import { cn } from "cn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-12 max-w-2xl text-center", className)}>
      <p className="mb-2 text-sm font-semibold tracking-wider text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
