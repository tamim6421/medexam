"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    setSaving(true);
    try {
      const token = Cookies.get("TOKEN_LOGIN");
      await axios.post(
        `${BASE_URL}/member/change-password`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: { TOKEN_MEMBER: token },
        }
      );
      setSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/95 rounded-2xl shadow-xl border border-blue-100 p-8"
      >
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Change Password
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-emerald-600 text-sm text-center">
            {success}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 text-sm font-medium">
            Old Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1 text-sm font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow transition text-base"
        >
          {saving ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}