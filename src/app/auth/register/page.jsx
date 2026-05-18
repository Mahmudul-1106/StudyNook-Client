"use client";

import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();

  // Dynamic Title Implementation
  useEffect(() => {
    document.title = "StudyNook – Register";
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Authentication Request
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (error) {
      // Replaced default alert with project-compliant toast notification
      toast.error(error.message || "Registration failed. Please try again.");
    }

    if (data) {
      toast.success("Registration successful! Please login.");

      // Delay to ensure state settles and user sees the confirmation toast
      setTimeout(() => {
        router.refresh();
        router.push("/auth/login"); // Pointing to the public login endpoint
      }, 1500);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
      // Google authentication natively signs users in directly and forwards to Home
      toast.success("Welcome to StudyNook!");
    } catch (err) {
      toast.error("Google authentication failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gray-50/50 dark:bg-zinc-900">
      <div className="text-center mb-6">
        {/* Main heading style configured consistently across pages */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join StudyNook to list, search, and book premium study rooms.
        </p>
      </div>

      <Card className="w-full max-w-md p-8 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-md bg-white dark:bg-zinc-950 flex flex-col gap-5">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </Label>
            <Input placeholder="Enter your full name" className="mt-1" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input placeholder="john@example.com" className="mt-1" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Project requirement: Image URL text field is required */}
          <TextField isRequired name="image" type="url" className="w-full">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Image URL
            </Label>
            <Input
              placeholder="https://images.unsplash.com/your-avatar"
              className="mt-1"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </Label>
            <Input placeholder="••••••••" className="mt-1" />
            <Description className="text-xs text-gray-500 mt-1 block">
              Must be at least 6 characters with 1 uppercase and 1 lowercase
              letter.
            </Description>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <Button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition-colors mt-2"
            type="submit"
          >
            Register
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-2">
          <Separator className="flex-1" />
          <span className="whitespace-nowrap text-xs text-gray-400 uppercase tracking-wider">
            Or sign up with
          </span>
          <Separator className="flex-1" />
        </div>

        <Button
          onClick={handleGoogleSignin}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900 font-medium py-2 rounded-lg transition-colors"
        >
          <FcGoogle className="text-lg" /> Continue with Google
        </Button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-cyan-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUpPage;
