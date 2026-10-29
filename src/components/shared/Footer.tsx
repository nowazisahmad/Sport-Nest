import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "All Facilities", href: "/facilities" },
    ],
  },
  {
    title: "Popular Sports",
    links: [
      { label: "Football", href: "/facilities" },
      { label: "Basketball", href: "/facilities" },
      { label: "Tennis", href: "/facilities" },
      { label: "Badminton", href: "/facilities" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto grid gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Discover and book the best sports facilities near you, from turfs
            and courts to pools and gyms.
          </p>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 font-semibold">{group.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> +880 1700-000000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> support@sportsnest.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2026 SportsNest. All rights reserved.
      </div>
    </footer>
  );
}
