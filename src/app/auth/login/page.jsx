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
import { HiOutlineSparkles } from "react-icons/hi2";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const router = useRouter();

  // Dynamic Browser Tab Title
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
      const TOAST_DURATION = 2000; // 2 seconds

      // 1. Trigger the toast with an explicit duration match
      toast.success("Login Successful!", {
        duration: TOAST_DURATION,
      });

      // 2. Natively flush Next.js client-side cached route nodes right away
      router.refresh();

      // 3. Wait until the exact moment the toast finishes and disappears
      setTimeout(() => {
        router.push("/");
      }, TOAST_DURATION);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google authentication failed.");
    }
  };

  return (
    /* CRITICAL FIX: Added min-h-[calc(100vh-80px)] and flex-1 properties to prevent dark mode layout collapse */
    <div className="min-h-[calc(100vh-80px)] w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-50 via-slate-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black py-5 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden flex-1">
      {/* Decorative Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Editorial Heading Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/80 dark:bg-cyan-950/50 border border-cyan-200/50 dark:border-cyan-900/30 text-[#344E41] dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs backdrop-blur-xs">
            <HiOutlineSparkles className="text-sm text-[#344E41] dark:text-cyan-400 animate-pulse" />
            Secure Portal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            <span className="mr-1.5">
              Welcome Back <br /> Login to
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#588157] to-[#3A5A40] dark:from-cyan-400 dark:to-blue-400">
              StudyNook
            </span>
          </h1>
        </div>

        {/* Social Sign In Button */}
        <Button
          onClick={handleGoogleSignin}
          type="button"
          className="w-full flex items-center text-white justify-center gap-2 bg-linear-to-r from-[#588157] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#344E41] dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800  dark:hover:bg-zinc-800  dark:text-zinc-300 font-semibold py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <FcGoogle className="text-xl shrink-0" /> Continue with Google
        </Button>

        {/* Separator Layer */}
        <div className="flex py-5 justify-center items-center gap-3 my-1">
          <Separator className="flex-1  bg-slate-300 dark:bg-zinc-800" />
          <span className="whitespace-nowrap text-xxs text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold">
            Or Connect Via Registered Email
          </span>
          <Separator className="flex-1 bg-slate-300 dark:bg-zinc-800" />
        </div>

        {/* Dynamic Card Container matching project theme */}
        <Card className="w-full p-8 bg-[#DAD7CD] dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 flex flex-col gap-5 overflow-hidden">
          <Form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Field: Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full flex flex-col"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter your registered email.";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-800 dark:text-zinc-300 mb-1.5">
                Email Address
              </Label>
              <Input
                placeholder="Please enter your email"
                className="w-full bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 focus:border-cyan-500 transition-colors"
              />
              <FieldError className="text-xs text-red-500 mt-1 font-medium" />
            </TextField>

            {/* Field: Password */}
            <div className="w-full">
              <TextField
                isRequired
                name="password"
                type={isShowPassword ? "text" : "password"}
                className="w-full flex flex-col"
                validate={(value) => {
                  if (value.length < 6) {
                    return "Password must be at least 6 characters";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-semibold text-slate-800 dark:text-zinc-300 mb-1.5">
                  Password
                </Label>
                <div className="relative w-full">
                  <Input
                    placeholder="Please enter your password"
                    className="w-full pr-10 bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 focus:border-cyan-500 transition-colors"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 z-10 flex items-center justify-center"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <FaEye size={16} />
                    ) : (
                      <FaEyeSlash size={16} />
                    )}
                  </button>
                </div>
                <FieldError className="text-xs text-red-500 mt-1 font-medium" />
              </TextField>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-linear-to-r from-[#588157] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#344E41] dark:from-cyan-600 dark:to-cyan-700 dark:hover:from-cyan-700 dark:hover:to-cyan-800 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center cursor-pointer"
              type="submit"
            >
              Login
            </Button>
          </Form>

          {/* Switch Subtext Links */}
          <p className="text-center text-sm text-slate-600 dark:text-zinc-400 mt-2">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[#3A5A40] dark:text-cyan-400 hover:underline font-bold transition-colors"
            >
              Register Now
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
