"use client";

import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export default function SlotsPage() {
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Fetch all slots (across all courses, or you can filter by course if you want)
  const fetchSlots = useCallback(async () => {
    setSlotsLoading(true);
    try {
      const token = Cookies.get("TOKEN_LOGIN");
      const res = await fetch(
        `${BASE_URL}/slot-list?sortField=id&sortDirection=desc&perPage=100&page=1&SlotByGroup=1`,
        {
          headers: { "TOKEN_MEMBER": token },
        }
      );
      const data = await res.json();
      setSlots(Array.isArray(data.data) ? data.data : []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-10 px-2 md:px-4">
      <div className="max-w-5xl mx-auto bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-0 md:p-10">
        <h2 className="text-3xl font-extrabold text-emerald-700 mb-10 text-center">
          All Slots
        </h2>
        {slotsLoading ? (
          <div className="text-center text-gray-500 py-8">Loading slots...</div>
        ) : slots.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No slots found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="bg-emerald-50 border border-emerald-100 rounded-xl shadow p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-emerald-700">
                    Slot #{slot.id}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      slot.status === "1"
                        ? "bg-emerald-200 text-emerald-800"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {slot.status === "1" ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="text-gray-700 text-sm mb-2">
                  <span className="font-semibold">Slot Number:</span>{" "}
                  <span className="font-mono">{slot.slot_number}</span>
                </div>
                <div className="text-gray-600 text-xs mb-2">
                  <span className="font-semibold">Created:</span>{" "}
                  {slot.created_at
                    ? new Date(slot.created_at).toLocaleString()
                    : "N/A"}
                </div>
                <div className="text-gray-600 text-xs mb-2">
                  <span className="font-semibold">Updated:</span>{" "}
                  {slot.updated_at
                    ? new Date(slot.updated_at).toLocaleString()
                    : "N/A"}
                </div>
                {slot.sub_sub_category_ids && (
                  <div className="text-xs text-gray-500 mt-2">
                    <span className="font-semibold">Sub-Subcategories:</span>{" "}
                    {Array.isArray(slot.sub_sub_category_ids)
                      ? slot.sub_sub_category_ids.join(", ")
                      : slot.sub_sub_category_ids}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}