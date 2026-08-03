"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const photo = formData.get("photo") as string;

    setIsSubmitting(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photo,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "Sign up failed. Please try again.");
      } else {
        toast.success("Signup successful! Please check your email to verify your account.");
        router.push("/");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      toast.error("Google sign in failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-center mt-8">Create Account</h1>
      <p className="text-center text-gray-500">Start your adventure with Wanderlast</p>

      <div className="max-w-md my-8 border shadow-sm rounded-md mx-auto p-5 space-y-3">
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          {/* name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Full Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          {/* email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email Address</Label>
            <Input placeholder="Enter your email" />
            <FieldError />
          </TextField>

          {/* photo URL */}
          <TextField name="photo" type="url">
            <Label>Photo URL</Label>
            <Input placeholder="Enter your photo URL (optional)" />
            <Description>Leave blank to use a default avatar</Description>
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Create a password" />
            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full rounded-md bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            <Check />
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>

        <div className="flex items-center gap-4 mt-3 w-full">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="text-center text-gray-500 whitespace-nowrap text-sm">Or sign up with</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        <Button
          variant="outline"
          isDisabled={isGoogleLoading}
          className="w-full flex items-center justify-center rounded-md gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          onClick={handleGoogleSignIn}
        >
          <FaGoogle />
          {isGoogleLoading ? "Redirecting..." : "Sign Up with Google"}
        </Button>

        <p className="font-semibold text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;