"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/lib/api";

export default function UpdateProfile() {
  const params = useParams();
  const userId = params.id;
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("TOKEN_LOGIN");
        if (!token) {
          router.push("/login");
          return;
        }
        const res = await axios.get(`${BASE_URL}/member/profile`, {
          headers: { TOKEN_MEMBER: token },
        });
        if (res.data && res.data.member_info && String(res.data.member_info.id) === userId) {
          setProfile(res.data.member_info);
        }
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, router]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = Cookies.get("TOKEN_LOGIN");
      await axios.post(
        `${BASE_URL}/member/profile/update`,
        {
          id: profile.id,
          member_name: profile.member_name,
          bangla_name: profile.bangla_name,
          phone: profile.phone,
          email: profile.email,
          current_address: profile.current_address,
          permanet_address: profile.permanet_address,
        },
        {
          headers: { TOKEN_MEMBER: token },
        }
      );
      router.push("/profile");
    } catch (err) {
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
          <div className="text-base text-gray-600 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl p-12 border border-blue-100 relative"
      >
        <h2 className="text-3xl font-extrabold text-emerald-700 mb-8 text-center">
          Update Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="member_name"
              value={profile.member_name || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Bangla Name</label>
            <input
              type="text"
              name="bangla_name"
              value={profile.bangla_name || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Current Address</label>
            <input
              type="text"
              name="current_address"
              value={profile.current_address || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Permanent Address</label>
            <input
              type="text"
              name="permanet_address"
              value={profile.permanet_address || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 rounded-lg font-semibold shadow transition text-lg"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}