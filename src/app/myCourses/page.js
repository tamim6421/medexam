/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/lib/api";
import { IMAGE_URL } from "@/lib/api";

export default function MyCourse() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = Cookies.get("TOKEN_LOGIN");
        const res = await fetch(`${BASE_URL}/course-enrollment-list`, {
          headers: {
            "TOKEN_MEMBER": token,
          },
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.data)) {
          setEnrollments(data.data);
        } else {
          setEnrollments([]);
        }
      } catch {
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
          <div className="text-base text-gray-600 font-medium">
            Loading your courses...
          </div>
        </div>
      </div>
    );
  }

  if (!enrollments.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="text-lg text-red-500">No enrolled courses found.</div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-emerald-700 mb-10 text-center">
          My Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {enrollments.map((enroll) => (
            <div
              key={enroll.id}
              className="bg-white rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-200 flex flex-col overflow-hidden group"
            >
              <div className="h-48 w-full bg-emerald-50 flex items-center justify-center overflow-hidden">
                <img
                  src={
                    enroll.course?.image
                      ? `${IMAGE_URL}/${enroll.course.image}`
                      : ""
                  }
                  alt={enroll.course?.course_name || "Course"}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-emerald-700 mb-2 truncate">
                  {enroll.course?.course_name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                    #{enroll.course?.serial}
                  </span>
                  {enroll.status === "1" ? (
                    <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block bg-red-50 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  <span className="font-semibold">Purchase Date:</span>{" "}
                  {enroll.purchase_date}
                </div>
                <div className="text-gray-600 text-sm mb-4">
                  <span className="font-semibold">Access Expires:</span>{" "}
                  {enroll.access_expired_date}
                </div>
                <div className="mt-auto flex justify-end">
                  <button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition text-base"
                    onClick={() => window.location.href = `/courseDetails/${enroll.course?.id}`}
                    disabled={!enroll.course?.id}
                  >
                    Go to Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}