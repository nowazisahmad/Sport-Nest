"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { TFacility } from "@/types/facility.types";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Hourly start times from 6:00 AM to 10:00 PM.
const timeSlots = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 6;
  return {
    value: `${String(hour).padStart(2, "0")}:00`,
    label: `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`,
  };
});

const durations = [1, 2, 3, 4];

const formatPrice = (amount: number) => `৳${amount.toLocaleString("en-US")}`;

const BookingForm = ({ facility }: { facility: TFacility }) => {
  const { data: session, isPending } = useSession();
  const [hours, setHours] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const pricePerHour = Number(facility.pricePerHour);
  const capacity = facility.capacity ? Number(facility.capacity) : undefined;
  const totalPrice = pricePerHour * hours;
  const today = format(new Date(), "yyyy-MM-dd");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const booking = {
      facilityId: facility._id,
      facilityName: facility.name,
      date: formData.get("date"),
      startTime: formData.get("startTime"),
      hours,
      players: Number(formData.get("players")),
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      photo: session?.user?.image || undefined,
      totalPrice,
      status: "pending",
    };

    setSubmitting(true);
    try {
      let token = "";
      try {
        const tokenRes = await authClient.token();
        token = tokenRes.data?.token || "";
      } catch (tokenErr) {
        console.warn("Could not retrieve auth token:", tokenErr);
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

      const result = await fetch(
        `${serverUrl}/facilities/booking`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(booking),
        },
      );
      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || data.error || "Booking failed");
      }

      if (!data.acknowledged) throw new Error("Booking was not saved");

      toast.add({
        title: "Booking placed successfully",
        description: `${facility.name} on ${booking.date} at ${booking.startTime} for ${hours} hour${hours > 1 ? "s" : ""}.`,
        type: "success",
      });
      form.reset();
      setHours(1);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Booking failed";
      console.log(message, "error");

      toast.add({
        title: message,
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(pricePerHour)}
          </span>
          <span className="text-muted-foreground"> / hour</span>
        </CardTitle>
        <CardDescription>Pick a date and time slot to reserve.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              {/* "today" can differ between the server and the browser's
                  timezone, so don't warn when min doesn't match on hydration. */}
              <Input
                id="date"
                name="date"
                type="date"
                min={today}
                suppressHydrationWarning
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
                <NativeSelect
                  id="startTime"
                  name="startTime"
                  defaultValue=""
                  className="w-full"
                  required
                >
                  <NativeSelectOption value="" disabled>
                    Select
                  </NativeSelectOption>
                  {timeSlots.map((slot) => (
                    <NativeSelectOption key={slot.value} value={slot.value}>
                      {slot.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>

              <Field>
                <FieldLabel htmlFor="hours">Duration</FieldLabel>
                <NativeSelect
                  id="hours"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full"
                >
                  {durations.map((duration) => (
                    <NativeSelectOption key={duration} value={duration}>
                      {duration} hour{duration > 1 ? "s" : ""}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="players">Players</FieldLabel>
              <Input
                id="players"
                name="players"
                type="number"
                min={1}
                max={capacity}
                step={1}
                placeholder="10"
                required
              />
              {capacity !== undefined && (
                <FieldDescription>
                  Up to {capacity} players allowed.
                </FieldDescription>
              )}
            </Field>

            <FieldSeparator>Your details</FieldSeparator>

            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={session?.user?.name || ""}
                readOnly
                placeholder="e.g. Rafiq Hasan"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={session?.user?.email || ""}
                readOnly
                placeholder="you@example.com"
                required
              />
            </Field>

            <Avatar>
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <div>
                <p className="font-medium">Total</p>
                <p className="text-muted-foreground">
                  {formatPrice(pricePerHour)} × {hours} hour
                  {hours > 1 ? "s" : ""}
                </p>
              </div>
              <p className="text-xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting}
            >
              {submitting && <Spinner />}
              {submitting ? "Booking..." : "Book Now"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
