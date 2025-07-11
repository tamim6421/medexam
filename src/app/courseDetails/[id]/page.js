"use client";

import { use, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BASE_URL, IMAGE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSubSubs, setSelectedSubSubs] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [questionCounts, setQuestionCounts] = useState({});
  const [activeTab, setActiveTab] = useState("categories");
const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("TOKEN_LOGIN");
        const res = await fetch(`${BASE_URL}/${id}/course-detail`, {
          headers: {
            TOKEN_MEMBER: token,
          },
        });
        const data = await res.json();
        setCourse(data.data);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  // Fetch slots for this course
  const fetchSlots = useCallback(async () => {
    setSlotsLoading(true);
    try {
      const token = Cookies.get("TOKEN_LOGIN");
      const res = await fetch(
        `${BASE_URL}/${id}/slot-list?sortField=id&sortDirection=desc&perPage=12&page=1&SlotByGroup=1`,
        {
          headers: { TOKEN_MEMBER: token },
        }
      );
      const data = await res.json();
      setSlots(Array.isArray(data.data) ? data.data : []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchSlots();
  }, [id, fetchSlots]);

  // Fetch question counts for all sub-subcategories
  useEffect(() => {
    const fetchAllQuestionCounts = async () => {
      if (!course) return;
      const token = Cookies.get("TOKEN_LOGIN");
      const allSubSubIds = [];
      course.categories.forEach((cat) =>
        cat.subcategories.forEach((sub) =>
          sub.subsubcategories.forEach((ssub) => allSubSubIds.push(ssub.id))
        )
      );
      const counts = {};
      await Promise.all(
        allSubSubIds.map(async (subSubId) => {
          try {
            const res = await fetch(
              `${BASE_URL}/${id}/question-number/${subSubId}`,
              { headers: { TOKEN_MEMBER: token } }
            );
            const data = await res.json();
            counts[subSubId] = typeof data.data === "number" ? data.data : 0;
          } catch {
            counts[subSubId] = 0;
          }
        })
      );
      setQuestionCounts(counts);
    };
    if (course) fetchAllQuestionCounts();
  }, [course, id]);

  const handleSubSubCheck = (subSubId) => {
    setSelectedSubSubs((prev) =>
      prev.includes(subSubId)
        ? prev.filter((id) => id !== subSubId)
        : [...prev, subSubId]
    );
  };

  const handleCreateSlot = async () => {
    setSlotLoading(true);
    try {
      const token = Cookies.get("TOKEN_LOGIN");
      const formData = new FormData();
      selectedSubSubs.forEach((id) =>
        formData.append("sub_sub_category_id[]", id)
      );
      const res = await fetch(`${BASE_URL}/${id}/slot-create`, {
        method: "POST",
        headers: {
          TOKEN_MEMBER: token,
        },
        body: formData,
      });
      const data = await res.json();
      if (typeof data.created_questions === "number") {
        toast.success(data.message || "Slot created successfully!");
        fetchSlots();
      } else {
        toast.error(data.message || "Failed to create slot. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSlotLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
          <div className="text-base text-gray-600 font-medium">
            Loading course details...
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="text-lg text-red-500">Course not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-10 px-2 md:px-4">
      <div className="max-w-5xl mx-auto bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-0 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/5 flex justify-center items-center">
            <img
              src={course.image ? `${IMAGE_URL}/${course.image}` : "/course-placeholder.svg"}
              alt={course.course_name}
              className="w-24 h-24 object-cover rounded-xl border border-emerald-100 shadow"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 mb-2">{course.course_name}</h1>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                #{course.serial}
              </span>
              {course.course_status === "1" ? (
                <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Active
                </span>
              ) : (
                <span className="bg-red-50 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
                  Inactive
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-gray-500 text-xs mb-2">
              <span><span className="font-semibold">Created:</span> {course.created_at ? new Date(course.created_at).toLocaleDateString() : "N/A"}</span>
              <span><span className="font-semibold">Updated:</span> {course.updated_at ? new Date(course.updated_at).toLocaleDateString() : "N/A"}</span>
            </div>
            <div className="text-gray-700 mt-2 text-sm">
              {course.description || (<span className="italic text-gray-400">No description available.</span>)}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex bg-gray-100 p-1 rounded-2xl shadow-inner">
            <button
              className={`flex-1 px-6 py-4 text-base font-semibold rounded-xl transition-all duration-300 relative ${
                activeTab === "categories"
                  ? "bg-white text-emerald-700 shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-emerald-600 hover:bg-white/50"
              }`}
              onClick={() => setActiveTab("categories")}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className={`w-5 h-5 ${activeTab === "categories" ? "text-emerald-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Categories</span>
                {activeTab === "categories" && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-emerald-600 rounded-full"></div>
                )}
              </div>
            </button>
            <button
              className={`flex-1 px-6 py-4 text-base font-semibold rounded-xl transition-all duration-300 relative ${
                activeTab === "slots"
                  ? "bg-white text-emerald-700 shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-emerald-600 hover:bg-white/50"
              }`}
              onClick={() => setActiveTab("slots")}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className={`w-5 h-5 ${activeTab === "slots" ? "text-emerald-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Slots</span>
                {activeTab === "slots" && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-emerald-600 rounded-full"></div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "categories" && (
          <div>
            {/* Categories as Nested List with Question Count */}
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {course.categories.map((cat) => (
                <li
                  key={cat.id}
                  className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm"
                >
                  <div className="font-semibold text-emerald-700 text-lg mb-2">{cat.category_name}</div>
                  {cat.subcategories.length === 0 ? (
                    <div className="text-gray-400 italic pl-4">No subcategories</div>
                  ) : (
                    <ul className="space-y-3 pl-4">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <div className="font-medium text-emerald-800">{sub.sub_category_name}</div>
                          {sub.subsubcategories.length === 0 ? (
                            <div className="text-gray-400 italic pl-4">No sub-subcategories</div>
                          ) : (
                            <ul className="space-y-2 pl-4">
                              {sub.subsubcategories.map((ssub) => (
                                <li key={ssub.id} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="accent-emerald-600 w-4 h-4"
                                    checked={selectedSubSubs.includes(ssub.id)}
                                    onChange={() => handleSubSubCheck(ssub.id)}
                                  />
                                  <span className="text-gray-700">
                                    {ssub.sub_sub_category_name}
                                    <span className="ml-2 text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                                      {questionCounts[ssub.id] !== undefined
                                        ? `(${questionCounts[ssub.id]})`
                                        : "(...)"}
                                    </span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {/* Slot Create Button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
              <button
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-xl font-bold shadow transition text-lg"
                onClick={handleCreateSlot}
                disabled={slotLoading}
              >
                {slotLoading ? "Creating Slot..." : "Create Slot for Selected"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "slots" && (
          <div>
            <h2 className="text-2xl font-bold text-emerald-700 mb-6">Created Slots</h2>
            {slotsLoading ? (
              <div className="text-center text-gray-500 py-8">Loading slots...</div>
            ) : slots.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No slots found for this course.</div>
            ) : (
              <div className="overflow-hidden rounded-2xl shadow-lg border border-emerald-100">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                      <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wide">#</th>
                      <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wide">Slot Number</th>
                      <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wide">Course</th>
                      <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wide">Questions</th>
                      <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wide">Submitted</th>
                      <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wide">Correct</th>
                      <th className="py-4 px-6 text-left font-bold text-sm uppercase tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {slots.map((slot, index) => (
                      <tr key={index} className="hover:bg-emerald-50/50 transition-colors duration-200">
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-emerald-700 font-bold text-lg">
                            {slot.slot_number}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-800 font-semibold">
                            {slot.course_name}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            {slot.total_number}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-800 border border-orange-200">
                            {slot.total_submit_status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                            {slot.total_answer_status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            onClick={() => {
                              // Go to the question page for this slot, sending slot_number and course id
                              router.push(`/questions/${slot.slot_number}?course_id=${id}`);
                            }}
                          >
                            View Questions
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* View All Slots Button */}
            <div className="mt-8 text-center">
              <Link href={`/slots/${id}`}>
                <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-base">
                  View All Slots
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
