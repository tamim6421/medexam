"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export default function SlotsPage() {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchSlots = useCallback(async (page = 1) => {
    setSlotsLoading(true);
    try {
      const token = Cookies.get("TOKEN_LOGIN");
      const res = await fetch(
        `${BASE_URL}/${id}/slot-list?sortField=id&sortDirection=desc&perPage=1&page=${page}&SlotByGroup=1`,
        {
          headers: { TOKEN_MEMBER: token },
        }
      );
      const data = await res.json();
      setSlots(Array.isArray(data.data) ? data.data : []);
      setCurrentPage(data.current_page || 1);
      setLastPage(data.last_page || 1);
      setTotal(data.total || 0);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchSlots(currentPage);
  }, [id, fetchSlots, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 px-4 py-10 flex flex-col md:flex-row gap-6">
      {/* Sidebar Pagination */}
      <aside className="w-full md:w-60 flex-shrink-0">
        <div className="bg-white border border-emerald-200 rounded-xl p-5 sticky top-10">
          <h3 className="text-lg font-semibold text-emerald-700 mb-4 text-center">
            Navigate Slots
          </h3>
          <div className="flex flex-row md:flex-col items-center md:items-stretch gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 w-full text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded disabled:bg-gray-300 transition"
            >
              &lt; Prev
            </button>
            <div className="flex flex-wrap justify-center gap-1">
              {getPageNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  disabled={num === currentPage}
                  className={`w-8 h-8 rounded-full text-sm font-bold transition ${
                    num === currentPage
                      ? "bg-emerald-500 text-white"
                      : "bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
              disabled={currentPage === lastPage}
              className="px-2 py-1 w-full text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded disabled:bg-gray-300 transition"
            >
              Next &gt;
            </button>
          </div>
          <div className="mt-4 text-xs text-center text-gray-500">
            Showing {slots.length} of {total} slots
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white border border-blue-100 rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
            Slots for Course #{id}
          </h2>

          {slotsLoading ? (
            <div className="text-center text-gray-500 py-20">
              Loading slot...
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              No slots found for this course.
            </div>
          ) : (
            <div className="space-y-6">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-5 transition hover:bg-emerald-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-emerald-700">
                      Slot #{slot.id}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        slot.status === "1"
                          ? "bg-emerald-200 text-emerald-800"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {slot.status === "1" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-1">
                    <strong>Slot Number:</strong> {slot.slot_number}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <strong>Created:</strong>{" "}
                    {slot.created_at
                      ? new Date(slot.created_at).toLocaleString()
                      : "N/A"}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <strong>Updated:</strong>{" "}
                    {slot.updated_at
                      ? new Date(slot.updated_at).toLocaleString()
                      : "N/A"}
                  </p>
                  {slot.sub_sub_category_ids && (
                    <p className="text-gray-500 text-sm mt-2">
                      <strong>Sub-Subcategories:</strong>{" "}
                      {Array.isArray(slot.sub_sub_category_ids)
                        ? slot.sub_sub_category_ids.join(", ")
                        : slot.sub_sub_category_ids}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
