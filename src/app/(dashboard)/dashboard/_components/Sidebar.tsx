"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Building2, CalendarCheck, CirclePlus } from "lucide-react";
import { cn } from "cn";
import Logo from "@/components/shared/Logo";

const sidebarItems = [
  { label: "Add Facility", href: "/dashboard/add-facility", icon: CirclePlus },
  { label: "My Bookings", href: "/dashboard/my-bookings", icon: CalendarCheck },
  { label: "My Facilities", href: "/dashboard/my-facilities", icon: Building2 },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-5">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Dashboard
        </p>

        <ul className="flex flex-col gap-1">
          {sidebarItems.map(({ label, href, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {active && (
                    <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary" />
                  )}
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground group-hover:bg-background group-hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
