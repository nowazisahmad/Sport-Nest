"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, CirclePlus } from "lucide-react";
import FacilityCard from "@/components/shared/FacilityCard";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { authClient, useSession } from "@/lib/auth-client";
import { TFacility } from "@/types/facility.types";

const MyFacilities = () => {
  const { data: session, isPending } = useSession();
  const [facilities, setFacilities] = useState<TFacility[] | null>(null);
  const [error, setError] = useState(false);

  const email = session?.user.email;

  useEffect(() => {
    if (!email) return;

    // Ignore a stale response if the user changes before it arrives.

    authClient
      .token()
      .then(({ data, error: tokenError }) => {
        if (tokenError) throw tokenError;
        return fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my-facilities/${encodeURIComponent(email)}`,
          { headers: { Authorization: `Bearer ${data.token}` } },
        );
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load facilities");
        return res.json();
      })
      .then((data: TFacility[]) => setFacilities(data))
      .catch(() => {
        setError(true);
      });

    // return () => {
    //   ignore = true;
    // };
  }, [email]);

  if (isPending || (email && !facilities && !error)) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="h-20 w-20" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6 md:p-10">
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyTitle className="text-lg">
              You&apos;re not signed in
            </EmptyTitle>
            <EmptyDescription>
              Sign in to see the facilities you&apos;ve listed.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/signin" className={buttonVariants()}>
              Sign In
            </Link>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Facilities</h1>
          <p className="mt-1 text-muted-foreground">
            {facilities && facilities.length > 0
              ? `You have listed ${facilities.length} ${facilities.length === 1 ? "facility" : "facilities"}.`
              : "Manage the venues you've listed on SportsNest."}
          </p>
        </div>
        <Link href="/dashboard/add-facility" className={buttonVariants()}>
          <CirclePlus /> Add Facility
        </Link>
      </div>

      {error ? (
        <p className="mt-10 text-center text-destructive">
          Could not load your facilities. Please try again later.
        </p>
      ) : facilities && facilities.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {facilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      ) : (
        <Empty className="mt-8 border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Building2 />
            </EmptyMedia>
            <EmptyTitle className="text-lg">No facilities yet</EmptyTitle>
            <EmptyDescription>
              List your first venue so players can discover and book it.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/dashboard/add-facility" className={buttonVariants()}>
              <CirclePlus /> Add Facility
            </Link>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};

export default MyFacilities;
