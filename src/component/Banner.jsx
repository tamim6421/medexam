import Image from "next/image";
import { Check } from "lucide-react";

const Banner = () => {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Side: Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="relative mb-6">
              <div className="absolute -left-3 -top-3 md:-left-5 md:-top-5 w-8 h-8 md:w-12 md:h-12 bg-amber-400 opacity-30 rounded-full blur-lg"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-gray-900">
              Limitless learning at{" "}
              <span className="relative inline-block">
                your{" "}
                <span className="text-amber-500 underline decoration-wavy decoration-2 underline-offset-4">
                  fingertips
                </span>
                <span className="absolute -right-4 top-0 text-emerald-500 text-2xl animate-bounce">
                  ✦
                </span>
              </span>
            </h1>
            <p className="text-gray-700 mb-8 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Join a vibrant online learning marketplace with{" "}
              <span className="font-semibold text-blue-600">5K+ courses</span> and{" "}
              <span className="font-semibold text-blue-600">10M students</span>. Learn
              from industry experts and unlock new skills for your future.
            </p>

            {/* Features List */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              {["Learn with experts", "Get Certificate", "Get Membership"].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-white/80 rounded-full px-4 py-2 shadow-sm border border-gray-100"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 mr-2">
                      <Check size={14} className="text-emerald-500" />
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* CTA Button */}
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-amber-300">
              Get Started
            </button>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0 flex justify-center">
            <div className="absolute top-3 right-8 bg-red-500 text-white px-3 py-1 rounded-full z-10 text-xs font-bold shadow-md">
              A+
            </div>
            <div className="absolute top-24 left-4 bg-indigo-900 text-white p-3 rounded-full z-10 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4" />
              </svg>
            </div>
            <div className="relative z-10">
              <Image
                src="/hero2.jpg?height=400&width=500"
                alt="Medical student studying"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-white"
                priority
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-amber-400"
                  >
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Decorative gradient blob */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-200 opacity-30 rounded-full blur-2xl z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
