"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
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

// Better Auth's default minimum password length.
const MIN_PASSWORD_LENGTH = 8;

const SignUpForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    if (password !== formData.get("confirmPassword")) {
      setPasswordMismatch(true);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      // Better Auth signs the new user in automatically.
      const { data, error } = await signUp.email({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        image: formData.get("photo") as string,
        password,
      });

      if (error) throw new Error(error.message);

      toast.add({
        title: `Welcome to SportsNest, ${data.user.name}!`,
        description: "Your account has been created.",
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
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Join SportsNest to start booking your favourite venues.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
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
              placeholder="you@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="photo">Photo</FieldLabel>
            <Input
              id="photo"
              name="photo"
              type="text"
              accept="image/*"
              placeholder="https://example.com/photo.jpg"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="••••••••"
              minLength={MIN_PASSWORD_LENGTH}
              onChange={() => setPasswordMismatch(false)}
              required
            />
            <FieldDescription>
              At least {MIN_PASSWORD_LENGTH} characters.
            </FieldDescription>
          </Field>

          <Field data-invalid={passwordMismatch}>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={passwordMismatch}
              onChange={() => setPasswordMismatch(false)}
              required
            />
            {passwordMismatch && (
              <FieldError>Passwords do not match.</FieldError>
            )}
          </Field>

          {error && <FieldError>{error}</FieldError>}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting && <Spinner />}
            {submitting ? "Creating account..." : "Sign Up"}
          </Button>

          <FieldDescription className="text-center">
            Already have an account? <Link href="/signin">Sign in</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SignUpForm;
