"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/api";
import { toast } from "react-toastify";
import axios from "axios";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const registerMember = async (data) => {
    const formData = new FormData();
    formData.append("member_name", data.member_name.trim());
    formData.append("phone", data.phone.trim());
    formData.append("email", data.email.trim().toLowerCase());
    formData.append("password", data.password);

    try {
      const response = await axios.post(
        `${BASE_URL}/member/registration`,
        formData,
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      console.log("Registration response:", response);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Registration error:", error);
      
      // Handle different types of errors
      if (error.code === 'ECONNABORTED') {
        return { 
          success: false, 
          message: "Request timeout. Please check your internet connection and try again." 
        };
      }
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `Registration failed (${error.response.status})`;
        return { success: false, message: errorMessage };
      }
      
      if (error.request) {
        // Network error
        return { 
          success: false, 
          message: "Network error. Please check your internet connection and try again." 
        };
      }
      
      return { 
        success: false, 
        message: "An unexpected error occurred. Please try again." 
      };
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await registerMember(data);
   
      
      if (result.success) {
        toast.success("Registration successful! Please check your email for verification.");
        reset();
        // Optionally redirect to login page after a delay
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-10 md:p-16 border border-blue-100 relative">
        {/* Decorative blob */}
        <div className="absolute -top-8 -right-8 w-44 h-40 bg-emerald-200 opacity-30 rounded-full blur-2xl z-0" />
        <h2 className="text-4xl font-extrabold text-center text-emerald-700 mb-2">Create Your Account</h2>
        <p className="text-center text-gray-500 mb-8 text-lg">Register to join Med Exam Pass</p>
        
        <form className="space-y-7 relative z-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="member_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              id="member_name"
              type="text"
              {...register("member_name", { 
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
                maxLength: { value: 50, message: "Name must be less than 50 characters" }
              })}
              className={`appearance-none block w-full px-4 py-3 rounded-lg border ${
                errors.member_name ? "border-red-400" : "border-gray-200"
              } bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition`}
              placeholder="Your full name"
              autoComplete="name"
            />
            {errors.member_name && (
              <span className="text-red-600 text-xs mt-1 block">{errors.member_name.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(\+880|880|0)?1[3-9]\d{8}$/,
                  message: "Enter a valid Bangladeshi phone number (e.g., 01XXXXXXXXX)",
                },
              })}
              className={`appearance-none block w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-400" : "border-gray-200"
              } bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition`}
              placeholder="01XXXXXXXXX"
              autoComplete="tel"
            />
            {errors.phone && (
              <span className="text-red-600 text-xs mt-1 block">{errors.phone.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`appearance-none block w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-400" : "border-gray-200"
              } bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition`}
              placeholder="you@email.com"
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-red-600 text-xs mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  maxLength: { value: 128, message: "Password must be less than 128 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                  }
                })}
                className={`appearance-none block w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-400" : "border-gray-200"
                } bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition`}
                placeholder="Create a strong password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-emerald-500 transition-colors"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4-9-7s4-7 9-7c1.13 0 2.21.19 3.22.54" />
                    <path d="M15 12a3 3 0 0 1-3 3" />
                    <path d="M2 2l20 20" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-600 text-xs mt-1 block">{errors.password.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value, formValues) => 
                    value === formValues.password || "Passwords do not match"
                })}
                className={`appearance-none block w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword ? "border-red-400" : "border-gray-200"
                } bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition`}
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-emerald-500 transition-colors"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4-9-7s4-7 9-7c1.13 0 2.21.19 3.22.54" />
                    <path d="M15 12a3 3 0 0 1-3 3" />
                    <path d="M2 2l20 20" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-600 text-xs mt-1 block">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all text-base focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-base text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}