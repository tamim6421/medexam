"use client";

import Image from "next/image";
import { Check } from "lucide-react";

const features = [
	{
		title: "Thousands of proven exam-centric questions",
		description:
			"Comprehensive programs covering a wide range of medical subjects to ensure thorough preparation.",
	},
	{
		title: "Detailed answers and explanations",
		description:
			"Expertly crafted solutions with clear explanations for even the most complex and controversial questions.",
	},
	{
		title: "Personalized learning environment",
		description:
			"A tailored platform that adapts to your learning style, helping you achieve your best results.",
	},
];

const ChooseUs = () => {
	return (
		<section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100">
			<div className="container mx-auto px-4">
				<div className="flex flex-col lg:flex-row items-center gap-12">
					{/* Image */}
					<div className="w-full lg:w-7/12 order-2 lg:order-1 flex justify-center">
						<div className="relative">
							<Image
								src="/heart.jpg?height=420&width=600"
								alt="Medical equipment"
								width={600}
								height={420}
								className="rounded-2xl shadow-2xl border-4 border-white"
							/>
							<div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-200 opacity-30 rounded-full blur-2xl z-0"></div>
						</div>
					</div>

					{/* Content */}
					<div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
						<div className="text-xs md:text-sm text-blue-600 font-semibold uppercase tracking-wider mb-3">
							Our Specialists You Like
						</div>
						<h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
							Why Choose Us?
						</h2>

						<div className="space-y-6">
							{features.map((item, index) => (
								<div
									key={index}
									className="bg-white/90 border border-blue-100 rounded-xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-shadow"
								>
									<div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md mt-1">
										<Check size={20} />
									</div>
									<div>
										<h3 className="font-semibold text-base md:text-lg text-gray-900 mb-1">
											{item.title}
										</h3>
										<p className="text-gray-600 text-sm md:text-base">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ChooseUs;
