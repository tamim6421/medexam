"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react"; // If you use lucide-react or use any icon library

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess("");
    setError("");
    // Simulate API call
    setTimeout(() => {
      setSending(false);
      setSuccess("Your message has been sent! We will contact you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <div className="w-full max-w-5xl bg-white/95 rounded-2xl shadow-xl border border-blue-100 p-0 md:p-8 flex flex-col md:flex-row gap-0 md:gap-8">
        {/* Contact Info Section */}
        <div className="md:w-2/5 w-full bg-emerald-50 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4 text-center">
            Get in Touch
          </h2>
          <p className="text-gray-500 mb-8 text-center text-sm">
            We’d love to hear from you! Reach out to us using the form or contact
            details below.
          </p>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center gap-3">
              <Mail className="text-emerald-600" size={20} />
              <a
                href="mailto:support@medexampass.com"
                className="text-gray-700 hover:text-emerald-700 text-sm underline"
              >
                support@medexampass.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-emerald-600" size={20} />
              <a
                href="tel:+880123456789"
                className="text-gray-700 hover:text-emerald-700 text-sm underline"
              >
                +880 1234 56789
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-emerald-600" size={20} />
              <span className="text-gray-700 text-sm">
                123, MedExamPass Avenue, Dhaka, Bangladesh
              </span>
            </div>
          </div>
          <div className="mt-8 w-full">
            <iframe
              title="MedExamPass Location"
              src="https://maps.google.com/maps?q=Dhaka,Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-40 rounded-lg border border-emerald-100"
              loading="lazy"
            ></iframe>
          </div>
        </div>
        {/* Contact Form Section */}
        <div className="md:w-3/5 w-full p-8">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2 text-center md:text-left">
            Contact Form
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left text-sm">
            Fill out the form and our team will respond as soon as possible.
          </p>
          {success && (
            <div className="mb-4 text-emerald-600 text-center text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-600 text-center text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm resize-none"
                placeholder="Type your message here..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow transition text-base"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}