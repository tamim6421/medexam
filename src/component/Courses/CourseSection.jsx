// components/CourseSection.jsx
import CourseCard from "./CourseCard";

const courses = [
	{
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
		icon: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M19.428 15.428a2 2 0 00-1.022-.547..."
			/>
		),
		title: "NEET Preparation",
		subtitle: "Medical Entrance",
		description:
			"Comprehensive NEET preparation with 2000+ questions, detailed explanations, and mock tests.",
		questions: "2000+",
		duration: "6 Months",
	},
	{
		iconBg: "bg-red-100",
		iconColor: "text-red-600",
		icon: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M4.318 6.318a4.5 4.5 0 000 6.364..."
			/>
		),
		title: "MBBS Foundation",
		subtitle: "Basic Medical Sciences",
		description:
			"Essential foundation course covering anatomy, physiology, and biochemistry for MBBS students.",
		questions: "1500+",
		duration: "4 Months",
	},
	{
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
		icon: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9.663 17h4.673M12 3v1m6.364 1.636..."
			/>
		),
		title: "USMLE Step 1",
		subtitle: "US Medical Licensing",
		description:
			"Complete USMLE Step 1 preparation with high-yield topics and practice questions.",
		questions: "3000+",
		duration: "8 Months",
	},
	{
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
		icon: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9.663 17h4.673M12 3v1m6.364 1.636..."
			/>
		),
		title: "USMLE Step 1",
		subtitle: "US Medical Licensing",
		description:
			"Complete USMLE Step 1 preparation with high-yield topics and practice questions.",
		questions: "3000+",
		duration: "8 Months",
	},
	{
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
		icon: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9.663 17h4.673M12 3v1m6.364 1.636..."
			/>
		),
		title: "USMLE Step 1",
		subtitle: "US Medical Licensing",
		description:
			"Complete USMLE Step 1 preparation with high-yield topics and practice questions.",
		questions: "3000+",
		duration: "8 Months",
	},
	{
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
		icon: (
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9.663 17h4.673M12 3v1m6.364 1.636..."
			/>
		),
		title: "USMLE Step 1",
		subtitle: "US Medical Licensing",
		description:
			"Complete USMLE Step 1 preparation with high-yield topics and practice questions.",
		questions: "3000+",
		duration: "8 Months",
	},
	// Add remaining courses here...
];

const CourseSection = () => {
	return (
		<section className="py-8 md:py-12">
			<div className="container mx-auto px-4">
				<div className="mb-6 md:mb-8">
					<div className="flex items-center mb-4 md:mb-6">
						<div className="w-5 h-5 md:w-6 md:h-6 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center mr-2">
							<span className="text-xs">📚</span>
						</div>
						<h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
							All Courses
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
						{courses.map((course, index) => (
							<CourseCard key={index} {...course} />
						))}
					</div>

					<div className="text-center mt-6 md:mt-8">
						<button className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base">
							View All Courses
							<span className="text-lg transition-transform group-hover:translate-x-1">
								→
							</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseSection;
