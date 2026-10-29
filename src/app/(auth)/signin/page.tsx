import type { Metadata } from "next";
import SignInForm from "../_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | SportsNest",
};

const SignInPage = () => {
  return <SignInForm />;
};

export default SignInPage;
