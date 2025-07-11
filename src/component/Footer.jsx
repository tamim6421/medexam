// components/Footer.js

import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-extrabold text-lg md:text-xl mb-4 tracking-tight">About Medexampass</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Med Exam Pass is an online platform designed to enhance the revision &amp; exam preparation
              processes of medical students and graduate physicians worldwide.
            </p>
            <div>
              <h4 className="font-semibold text-xs md:text-sm mb-3 text-blue-200">FOLLOW US ON:</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors shadow-md">
                  <Facebook size={18} />
                </a>
                <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors shadow-md">
                  <Instagram size={18} />
                </a>
                <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors shadow-md">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold text-lg md:text-xl mb-4 tracking-tight">Quick Links</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Condition
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-extrabold text-lg md:text-xl mb-4 tracking-tight">Resources</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>
                <Link href="/exam-info" className="hover:text-white transition-colors">
                  Exam Information
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-extrabold text-lg md:text-xl mb-4 tracking-tight">Get in touch!</h3>
            <div className="flex items-center text-blue-100 text-sm mb-2">
              <span className="mr-2 text-xl">✉️</span>
              <span className="break-all">medexampass@gmail.com</span>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-blue-700/60 text-blue-100 px-3 py-1 rounded-full text-xs font-semibold shadow">
                We reply within 24 hours!
              </span>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-blue-800 mt-10 pt-6 text-center text-blue-300 text-xs tracking-wide">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Medexampass</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
