import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;

export async function getAuthToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      return data?.token || null;
    }
  } catch (err) {
    console.warn("Could not fetch auth token:", err);
  }
  return null;
}
