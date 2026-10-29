"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) return <Skeleton className="size-9 rounded-full" />;

  if (!session) {
    return (
      <Link
        href="/signin"
        className={buttonVariants({
          variant: "outline",
          size: "lg",
          className: "px-4",
        })}
      >
        Sign In
      </Link>
    );
  }

  const { user } = session;

  const handleSignOut = async () => {
    await signOut();
    toast.add({ title: "Signed out", type: "success" });
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <Avatar size="lg">
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <span className="sr-only">Open user menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col">
            <span className="truncate text-sm text-foreground">
              {user.name}
            </span>
            <span className="truncate font-normal">{user.email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard/my-bookings")}>
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
