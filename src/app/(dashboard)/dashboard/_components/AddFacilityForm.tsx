"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { popularSports } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { authClient, getAuthToken, useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

export type NewFacility = {
  name: string;
  sport: string;
  image: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  description: string;
};

const AddFacilityForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { data: session, isPending } = useSession();

  if (isPending)
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="h-20 w-20" />
      </div>
    );

  const user = session?.user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const facility = Object.fromEntries(formData.entries());

    setSubmitting(true);
    try {
      let token = await getAuthToken();
      if (!token) {
        try {
          const tokenRes = await authClient.token();
          token = tokenRes.data?.token || "";
        } catch {}
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

      const result = await fetch(`${serverUrl}/facilities`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...facility,
          pricePerHour: Number(facility.pricePerHour),
          capacity: Number(facility.capacity),
          creatorEmail: user?.email,
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || data.error || "Failed to add facility");
      }

      if (data.acknowledged || data.insertedId) {
        toast.add({
          title: "Facility added successfully",
          description: "Your facility has been added to the platform.",
          type: "success",
        });
        form.reset();
        setSubmitted(true);
        router.push("/dashboard/my-facilities");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.add({
        title: message,
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Add a New Facility</CardTitle>
        <CardDescription>
          List your venue so players can discover and book it.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} onChange={() => setSubmitted(false)}>
          <FieldGroup>
            <div className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name">Facility Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Green Field Arena"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="sport">Sport Type</FieldLabel>
                <NativeSelect
                  id="sport"
                  name="sport"
                  defaultValue=""
                  className="w-full"
                  required
                >
                  <NativeSelectOption value="" disabled>
                    Select a sport
                  </NativeSelectOption>
                  {popularSports.map((sport) => (
                    <NativeSelectOption key={sport.id} value={sport.name}>
                      {sport.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="image">Image URL</FieldLabel>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/facility.jpg"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Gulshan, Dhaka"
                required
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="pricePerHour">
                  Price Per Hour (৳)
                </FieldLabel>
                <Input
                  id="pricePerHour"
                  name="pricePerHour"
                  type="number"
                  min={1}
                  placeholder="2500"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="capacity">Capacity (Players)</FieldLabel>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="22"
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe the surface, amenities, lighting, parking..."
                className="min-h-28"
                required
              />
            </Field>

            {submitted && (
              <p className="flex items-center gap-2 text-sm text-green-600">
                <CircleCheck className="size-4" />
                Facility added successfully.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full md:w-fit"
              disabled={submitting}
            >
              {submitting && <Spinner />}
              {submitting ? "Adding Facility..." : "Add Facility"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddFacilityForm;
