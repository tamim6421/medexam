const stats = [
  {
    label: "Primary Question",
    value: "1.3k",
    bg: "bg-amber-50",
    iconBg: "bg-amber-400",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect width="18" height="12" x="3" y="6" rx="2" />
        <line x1="3" x2="21" y1="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "Intermediate Question",
    value: "1.8k",
    bg: "bg-blue-50",
    iconBg: "bg-blue-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5 22v-4a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v4" />
      </svg>
    ),
  },
  {
    label: "Revision Note",
    value: "1.0k",
    bg: "bg-purple-50",
    iconBg: "bg-purple-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect width="18" height="12" x="3" y="6" rx="2" />
        <line x1="3" x2="21" y1="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "User Community",
    value: "0.1k",
    bg: "bg-green-50",
    iconBg: "bg-green-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
  },
];

const Stats = () => (
  <section className="py-12 bg-gradient-to-b from-white to-gray-50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center group`}
          >
            <div className={`${stat.iconBg} rounded-full p-4 mb-4 shadow-lg group-hover:scale-110 transform transition-transform`}>
              {stat.icon}
            </div>
            <div className="font-extrabold text-3xl text-gray-900 mb-1 tracking-tight group-hover:text-primary-600 transition-colors">
              {stat.value}
            </div>
            <div className="text-base text-gray-600 font-medium text-center">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
