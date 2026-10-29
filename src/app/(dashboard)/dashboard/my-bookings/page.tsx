"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { CalendarX, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authClient, useSession } from "@/lib/auth-client";
import { TBooking } from "@/types/booking.types";

const formatPrice = (amount: number) => `৳${amount.toLocaleString("en-US")}`;

const formatHour = (hour: number) =>
  `${hour % 12 || 12}:00 ${hour % 24 < 12 ? "AM" : "PM"}`;

// "07:00" + 3 hours -> "7:00 AM – 10:00 AM"
const formatTimeRange = (startTime: string, hours: number) => {
  const start = Number(startTime.split(":")[0]);
  return `${formatHour(start)} – ${formatHour(start + hours)}`;
};

const statusVariant = (status: string) => {
  switch (status) {
    case "confirmed":
      return "default";
    case "cancelled":
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

const MyBookings = () => {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState<TBooking[] | null>(null);
  const [error, setError] = useState(false);

  const email = session?.user.email;

  useEffect(() => {
    if (!email) return;

    authClient
      .token()
      .then(({ data, error: tokenError }) => {
        if (tokenError) throw tokenError;
        return fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities/booking/${encodeURIComponent(email)}`,
          { headers: { Authorization: `Bearer ${data.token}` } },
        );
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load bookings");
        return res.json();
      })
      .then((data: TBooking[]) => setBookings(data))
      .catch(() => {
        setError(true);
      });
  }, [email]);

  if (isPending || (email && !bookings && !error)) {
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
              Sign in to see the facilities you&apos;ve booked.
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
          <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
          <p className="mt-1 text-muted-foreground">
            {bookings && bookings.length > 0
              ? `You have ${bookings.length} ${bookings.length === 1 ? "booking" : "bookings"}.`
              : "Track the facilities you've reserved on SportsNest."}
          </p>
        </div>
        <Link href="/facilities" className={buttonVariants()}>
          <Search /> Browse Facilities
        </Link>
      </div>

      {error ? (
        <p className="mt-10 text-center text-destructive">
          Could not load your bookings. Please try again later.
        </p>
      ) : bookings && bookings.length > 0 ? (
        <div className="mt-8 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Facility</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Players</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-4 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="pl-4 font-medium">
                    <Link
                      href={`/facilities/${booking.facilityId}`}
                      className="hover:text-primary hover:underline"
                    >
                      {booking.facilityName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {format(parseISO(booking.date), "EEE, MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div>
                      {formatTimeRange(booking.startTime, booking.hours)}
                    </div>
                    <div className="text-muted-foreground">
                      {booking.hours} hour{booking.hours > 1 ? "s" : ""}
                    </div>
                  </TableCell>
                  <TableCell>{booking.players}</TableCell>
                  <TableCell>
                    <Badge
                      variant={statusVariant(booking.status)}
                      className="capitalize"
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-4 text-right font-semibold text-primary">
                    {formatPrice(booking.totalPrice)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Empty className="mt-8 border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarX />
            </EmptyMedia>
            <EmptyTitle className="text-lg">No bookings yet</EmptyTitle>
            <EmptyDescription>
              Find a venue you like and reserve your first slot.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/facilities" className={buttonVariants()}>
              <Search /> Browse Facilities
            </Link>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};

export default MyBookings;
