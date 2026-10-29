import { Suspense } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        {/* usePathname may suspend on dynamic routes when cacheComponents is on */}
        <Suspense fallback={null}>
          <NavLinks className="hidden md:flex" />
        </Suspense>

        <div className="flex items-center gap-2">
          <Link
            href="/facilities"
            className={buttonVariants({
              size: "lg",
              className: "hidden px-4 sm:inline-flex",
            })}
          >
            Book Now
          </Link>
          <UserMenu />
          <Suspense fallback={null}>
            <MobileNav />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
