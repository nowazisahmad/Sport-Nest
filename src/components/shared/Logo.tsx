import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Trophy className="size-5" />
      </span>
      Sports<span className="text-primary">Nest</span>
    </Link>
  );
}
