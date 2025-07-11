"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/lib/api";

// Constants
const PHONE_REGEX = /^01\d{9}$/;
const COOKIE_EXPIRY_DAYS = 2;
const REDIRECT_DELAY = 100;

// Form validation rules
const validationRules = {
  phone: {
    required: "Phone number is required",
    pattern: {
      value: PHONE_REGEX,
      message: "Enter a valid Bangladeshi phone number",
    },
  },
  password: {
    required: "Password is required",
    minLength: { value: 6, message: "At least 6 characters" },
  },
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Login handler
  const onSubmit = async (data) => {
    setLoadingBtn(true);
    
    try {
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("password", data.password);

      const response = await axios.post(
        `${BASE_URL}/member/login`,
        formData
      );

      if (response.status === 200 && response.data.TOKEN_MEMBER) {
        // Set token in cookie
        Cookies.set("TOKEN_LOGIN", response.data.TOKEN_MEMBER, { 
          expires: COOKIE_EXPIRY_DAYS 
        });

        // Save user info in localStorage
        if (response.data.member_info) {
          localStorage.setItem("user-info", JSON.stringify(response.data.member_info));
        }

        toast.success("Login Successful");
        
        // Redirect after successful login
        setTimeout(() => {
          window.location.href = "/";
        }, REDIRECT_DELAY);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoadingBtn(false);
    }
  };

  // Helper function to get input className
  const getInputClassName = (fieldName) => {
    const baseClasses = "appearance-none block w-full px-4 py-3 rounded-lg border bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition";
    return `${baseClasses} ${errors[fieldName] ? "border-red-400" : "border-gray-200"}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 md:p-10 border border-blue-100 relative">
        {/* Decorative blob */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-200 opacity-30 rounded-full blur-2xl z-0" />
        
        <h1 className="text-3xl font-extrabold text-center text-emerald-700 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sign in to your account
        </p>
        
        <form
          className="space-y-6 relative z-10"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone", validationRules.phone)}
              className={getInputClassName("phone")}
              placeholder="01XXXXXXXXX"
            />
            {errors.phone && (
              <span id="phone-error" className="text-red-600 text-xs" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>
          
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password", validationRules.password)}
                className={getInputClassName("password")}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-emerald-500 transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4-9-7s4-7 9-7c1.13 0 2.21.19 3.22.54" />
                    <path d="M15 12a3 3 0 0 1-3 3" />
                    <path d="M2 2l20 20" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="text-red-600 text-xs" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loadingBtn}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg shadow-lg transition-all text-base focus:outline-none focus:ring-2 focus:ring-emerald-300"
            aria-describedby={loadingBtn ? "loading-text" : undefined}
          >
            {loadingBtn ? "Signing In..." : "Sign In"}
          </button>
          {loadingBtn && (
            <div id="loading-text" className="sr-only">Loading, please wait...</div>
          )}
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}