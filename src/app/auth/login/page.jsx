"use client";

import React, { useState, useEffect } from "react";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Requirement: Dynamic Browser Tab Titles
  useEffect(() => {
    document.title = "StudyNook – Login";
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      toast.error(error.message || "Invalid email or password");
    }

    if (data) {
      toast.success("Signin successful");

      // Forces a refresh of the server-side auth state before moving
      setTimeout(() => {
        window.location.href = "/"; // Forces a clean state refresh upon landing home
      }, 1000);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      toast.error("Google authentication failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gray-50/50 dark:bg-zinc-900">
      <div className="text-center mb-6">
        {/* Uniform Headings across Auth Layouts */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sign in to your StudyNook account to manage your bookings.
        </p>
      </div>

      <Card className="w-full max-w-md p-8 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-md bg-white dark:bg-zinc-950 flex flex-col gap-5">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            <Input placeholder="Enter Your Email" className="mt-1" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Fixed the variable syntax error by wrapping relative in a string literal */}
          <div className="relative w-full">
            <TextField
              isRequired
              name="password"
              type={isShowPassword ? "text" : "password"}
              className="w-full"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  placeholder="Enter Your Password"
                  className="w-full pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 z-10 flex items-center h-full"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <FaEye size={16} />
                  ) : (
                    <FaEyeSlash size={16} />
                  )}
                </span>
              </div>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>
          </div>

          <Button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition-colors mt-2"
            type="submit"
          >
            Login
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-2">
          <Separator className="flex-1" />
          <span className="whitespace-nowrap text-xs text-gray-400 uppercase tracking-wider">
            Or sign in with
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
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-cyan-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
