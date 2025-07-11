"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Med Exam Pass?",
    answer:
      "Med Exam Pass is an online platform designed to help medical students and graduates prepare for exams with proven questions, detailed explanations, and personalized learning tools.",
  },
  {
    question: "How do I access the courses?",
    answer:
      "Simply sign up for an account, log in, and browse our course catalog. You can enroll in any course and start learning immediately.",
  },
  {
    question: "Are certificates provided after course completion?",
    answer:
      "Yes, you will receive a certificate of completion for each course you finish, which you can download and share.",
  },
  {
    question: "Can I use Med Exam Pass on mobile devices?",
    answer:
      "Absolutely! Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktops.",
  },
  {
    question: "Who creates the questions and content?",
    answer:
      "All questions and content are created by experienced medical educators and subject matter experts.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-8 md:p-12 relative">
        {/* Decorative blob */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-200 opacity-30 rounded-full blur-2xl z-0" />
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-3 text-center">Frequently Asked Questions</h1>
        <p className="text-center text-gray-500 mb-10">
          Find answers to the most common questions about Med Exam Pass.
        </p>
        <div className="space-y-5 relative z-10">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-emerald-100 rounded-xl shadow group transition-all"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="font-semibold text-gray-800 text-base md:text-lg">{faq.question}</span>
                <span className="ml-4 text-emerald-500 transition-transform duration-200 group-hover:scale-110">
                  {openIndex === idx ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </span>
              </button>
              <div
                className={`px-6 pb-5 text-gray-600 text-sm md:text-base transition-all duration-300 ${
                  openIndex === idx ? "block" : "hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}