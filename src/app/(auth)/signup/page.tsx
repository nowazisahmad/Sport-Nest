import type { Metadata } from "next";
import SignUpForm from "../_components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | SportsNest",
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
