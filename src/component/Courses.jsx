"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/api";
import { IMAGE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export default function Courses({ showAllButton = true }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course-list`);
        if (res.data && Array.isArray(res.data.data)) {
          setCourses(res.data.data);
        }
      } catch (err) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch subscriptions for a course
  const handleEnrollClick = async (course) => {
    setSelectedCourse(course);
    setEnrollMsg("");
    setSelectedSubscription("");
    setModalOpen(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/subscription-list?course_id=${course.id}`
      );
      if (res.data && Array.isArray(res.data.data)) {
        setSubscriptions(res.data.data);
      } else {
        setSubscriptions([]);
      }
    } catch {
      setSubscriptions([]);
    }
  };

  // console.log("subscription", subscriptions);

  const handleEnroll = async () => {
    if (!selectedCourse || !selectedSubscription) return;
    setEnrolling(true);
    setEnrollMsg("");
    try {
      const token = Cookies.get("TOKEN_LOGIN");
      const res = await fetch(`${BASE_URL}/course-enrollment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "TOKEN_MEMBER": token,
        },
        body: JSON.stringify({
          course_id: Number(selectedCourse.id),
          subscription_id: Number(selectedSubscription),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEnrollMsg("Enrollment successful!");
        setTimeout(() => {
          setModalOpen(false);
          setEnrollMsg("");
        }, 1200);
      } else {
        setEnrollMsg(data.message || "Enrollment failed. Please try again.");
        console.log(data);
      }
    } catch (error) {
      setEnrollMsg("Enrollment failed. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
          <div className="text-base text-gray-600 font-medium">
            Loading courses...
          </div>
        </div>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-lg text-red-500">No courses found.</div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h2 className="text-3xl font-extrabold text-emerald-700 text-center md:text-left">
            All Courses
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-200 flex flex-col overflow-hidden group"
            >
              <div className="h-48 w-full bg-emerald-50 flex items-center justify-center overflow-hidden">
                <img
                  src={
                    course.image
                      ? `${IMAGE_URL}/${course.image}`
                      : "/course-placeholder.svg"
                  }
                  alt={course.course_name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-emerald-700 mb-2 truncate">
                  {course.course_name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                    #{course.serial}
                  </span>
                  {course.course_status === "1" ? (
                    <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block bg-red-50 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="text-gray-600 flex-1 mb-4">
                  {course.description || (
                    <span className="italic text-gray-400">
                      No description available.
                    </span>
                  )}
                </p>
                <div className="mt-auto flex justify-end">
                  <button
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl text-base font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    onClick={() => handleEnrollClick(course)}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showAllButton && (
          <div className="flex justify-center mt-12">
            <a
              href="/courses"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow transition text-lg"
            >
              View All Courses
            </a>
          </div>
        )}
      </div>
      {/* Modal for enrollment */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-emerald-700 mb-4 text-center">
              Enroll in {selectedCourse?.course_name}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 text-base font-semibold">
                Select Subscription
              </label>
              <select
                className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-base font-medium"
                value={selectedSubscription}
                onChange={(e) => setSelectedSubscription(e.target.value)}
              >
                <option value="">Choose a subscription</option>
                {subscriptions.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.subscription_name} {sub.amount && `- ৳${sub.amount}`}
                  </option>
                ))}
              </select>
            </div>
            {enrollMsg && (
              <div
                className={`mb-3 text-center text-sm ${
                  enrollMsg.includes("success")
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {enrollMsg}
              </div>
            )}
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow transition text-base mt-2"
              disabled={!selectedSubscription || enrolling}
              onClick={handleEnroll}
            >
              {enrolling ? "Enrolling..." : "Confirm Enrollment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}