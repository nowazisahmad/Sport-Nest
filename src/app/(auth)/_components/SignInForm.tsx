"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import PasswordInput from "./PasswordInput";

const SignInForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setSubmitting(true);
    setError("");
    try {
      const { data, error } = await signIn.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (error) throw new Error(error.message);

      toast.add({
        title: `Welcome back, ${data.user.name}!`,
        type: "success",
      });
      router.push("/");
    } catch (err) {
      setError(
        (err instanceof Error && err.message) ||
          "Something went wrong. Please try again.",
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to book facilities and manage your bookings.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </Field>

          {error && <FieldError>{error}</FieldError>}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting && <Spinner />}
            {submitting ? "Signing in..." : "Sign In"}
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SignInForm;
