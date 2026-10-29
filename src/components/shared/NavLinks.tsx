"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "All Facilities", href: "/facilities" },
];

export default function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex gap-1", className)}>
      {navItems.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
