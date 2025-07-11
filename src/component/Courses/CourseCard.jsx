// components/CourseCard.jsx
const CourseCard = ({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  description,
  questions,
  duration,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-white via-emerald-50 to-emerald-100 border border-emerald-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-7 group overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-200 opacity-30 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform" />
      {/* Icon */}
      <div className={`w-16 h-16 ${iconBg} flex items-center justify-center rounded-2xl shadow-lg mb-5 z-10 relative`}>
        <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      {/* Title & Subtitle */}
      <div className="mb-3 z-10 relative">
        <h3 className="font-extrabold text-xl md:text-2xl text-gray-900 mb-1">{title}</h3>
        <p className="text-sm md:text-base text-emerald-700 font-medium">{subtitle}</p>
      </div>
      {/* Description */}
      <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-2 z-10 relative">{description}</p>
      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 z-10 relative">
        <div className="flex flex-row items-center text-xs md:text-sm text-emerald-700 gap-5 font-semibold">
          <span className="flex items-center gap-1">
            <span role="img" aria-label="questions">📝</span>
            {questions} Questions
          </span>
          <span className="flex items-center gap-1">
            <span role="img" aria-label="duration">⏱️</span>
            {duration}
          </span>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl text-base font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300">
          Enroll Now
        </button>
      </div>
      {/* Subtle glass effect overlay */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ backdropFilter: 'blur(1.5px)' }} />
    </div>
  );
};

export default CourseCard;
