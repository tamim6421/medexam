"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/utility/condation";

const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "Blog", href: "/blog" },
	{ label: "FAQ", href: "/faq" },
	{ label: "Gallery", href: "/gallery" },
];

const NavBar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
	const dropdownRef = useRef();
	const mobileDropdownRef = useRef();
	const router = useRouter();
	const pathname = usePathname();
	const { user, token, loading, logout } = useAuth();

	// Close dropdown on outside click
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		}
		if (dropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [dropdownOpen]);

	// Close mobile dropdown on outside click
	useEffect(() => {
		function handleClickOutside(event) {
			if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
				setMobileDropdownOpen(false);
			}
		}
		if (mobileDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [mobileDropdownOpen]);

	// Logout function
	const handleLogout = () => {
		logout();
		setDropdownOpen(false);
		router.push("/login");
		console.log("User logged out successfully");
	};

	// Close mobile menu when user logs in/out
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [user, token]);

	// Don't render auth buttons while loading
	if (loading) {
		return (
			<header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm transition-all">
				<div className="container mx-auto px-4 flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 group">
						<Image
							src="/placeholder.svg?height=40&width=40"
							alt="MED "
							width={40}
							height={40}
							className="transition-transform group-hover:rotate-6"
						/>
						<span className="text-emerald-600 font-extrabold text-xl tracking-tight group-hover:text-emerald-700 transition-colors">
							MED EXAM <span className="text-blue-500">PASS</span>
						</span>
					</Link>
					<div className="hidden md:flex items-center gap-3">
						<div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
					</div>
				</div>
			</header>
		);
	}

	return (
		<header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm transition-all">
			<div className="container mx-auto px-4 flex items-center justify-between h-16">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2 group">
					<Image
						src="/placeholder.svg?height=40&width=40"
						alt="MED "
						width={40}
						height={40}
						className="transition-transform group-hover:rotate-6"
					/>
					<span className="text-emerald-600 font-extrabold text-xl tracking-tight group-hover:text-emerald-700 transition-colors">
						MED EXAM <span className="text-blue-500">PASS</span>
					</span>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden lg:flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="font-medium text-gray-700 hover:text-emerald-600 transition-colors px-2 py-1 rounded-md hover:bg-emerald-50"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Desktop Right Side */}
				<div className="hidden md:flex items-center gap-3">
					<Link
						href="/courses"
						className="flex items-center text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors px-3 py-2 rounded-md hover:bg-blue-50"
					>
						<span className="mr-2 text-lg">🎓</span>
						<span className="hidden lg:inline">Our Courses</span>
					</Link>
					{!user || !token ? (
						<Link
							href="/login"
							className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm lg:text-base font-semibold shadow transition-all"
						>
							Login
						</Link>
					) : (
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setDropdownOpen((v) => !v);
								}}
								className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold shadow transition-all"
							>
								<span className="truncate max-w-[120px]">
									{user.member_name || user.name}
								</span>
								<ChevronDown size={18} />
							</button>
							{dropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white border border-emerald-100 rounded-xl shadow-lg z-50 py-2 animate-fade-in">
									<Link
										href="/myCourses"
										className="block px-5 py-2 text-gray-700 hover:bg-emerald-50 transition"
										onClick={(e) => {
											e.preventDefault();
											setDropdownOpen(false);
											router.push("/myCourses");
										}}
									>
										My Courses
									</Link>
									<Link
										href="/profile"
										className="block px-5 py-2 text-gray-700 hover:bg-emerald-50 transition"
										onClick={(e) => {
											e.preventDefault();
											setDropdownOpen(false);
											router.push("/profile");
										}}
									>
										Profile
									</Link>
									<Link
										href="/profile/update"
										className="block px-5 py-2 text-gray-700 hover:bg-emerald-50 transition"
										onClick={(e) => {
											e.preventDefault();
											setDropdownOpen(false);
											router.push("/profile/update");
										}}
									>
										Profile Update
									</Link>
									<Link
										href="/change-password"
										className="block px-5 py-2 text-gray-700 hover:bg-emerald-50 transition"
										onClick={(e) => {
											e.preventDefault();
											setDropdownOpen(false);
											router.push("/change-password");
										}}
									>
										Password Change
									</Link>
									<button
										onClick={handleLogout}
										className="w-full text-left px-5 py-2 text-red-600 hover:bg-red-50 transition"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					)}
					<Link
						href="/contact"
						className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow transition-colors"
						aria-label="Contact"
					>
						<MessageCircle size={20} />
					</Link>
				</div>

				{/* Mobile Toggle */}
				<button
					className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle mobile menu"
				>
					{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
					mobileMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={() => {
					if (!mobileDropdownOpen) {
						setMobileMenuOpen(false);
					}
				}}
				aria-hidden="true"
			/>
			{/* Mobile Menu */}
			<nav
				className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
					mobileMenuOpen ? "translate-x-0" : "translate-x-full"
				} md:hidden flex flex-col`}
			>
				<div className="flex items-center justify-between px-6 py-4 border-b">
					<Link
						href="/"
						className="flex items-center gap-2"
						onClick={() => setMobileMenuOpen(false)}
					>
						<Image
							src="/placeholder.svg?height=32&width=32"
							alt="MED EXAM PASS"
							width={32}
							height={32}
						/>
						<span className="text-emerald-600 font-extrabold text-lg tracking-tight">
							MED EXAM <span className="text-blue-500">PASS</span>
						</span>
					</Link>
					<button
						className="p-2 rounded hover:bg-emerald-50 transition-colors"
						onClick={() => setMobileMenuOpen(false)}
						aria-label="Close menu"
					>
						<X size={24} />
					</button>
				</div>
				<div className="flex flex-col gap-2 px-6 py-6">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="font-medium text-gray-700 hover:text-emerald-600 transition-colors px-2 py-2 rounded-md hover:bg-emerald-50"
							onClick={() => setMobileMenuOpen(false)}
						>
							{link.label}
						</Link>
					))}
					<Link
						href="/courses"
						className="flex items-center text-blue-700 hover:text-blue-900 transition-colors px-2 py-2 rounded-md hover:bg-blue-50"
						onClick={() => setMobileMenuOpen(false)}
					>
						<span className="mr-2 text-lg">🎓</span>
						<span>Our Courses</span>
					</Link>
					{!user || !token ? (
						<Link
							href="/login"
							className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all w-full text-center"
							onClick={() => setMobileMenuOpen(false)}
						>
							Login
						</Link>
					) : (
						<div className="relative" ref={mobileDropdownRef}>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setMobileDropdownOpen((v) => !v);
								}}
								className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold shadow transition-all w-full"
							>
								<span className="truncate max-w-[120px]">
									{user.member_name || user.name}
								</span>
								<ChevronDown size={18} />
							</button>
							{mobileDropdownOpen && (
								<div className="relative mt-2 w-full bg-white border border-emerald-100 rounded-xl shadow-lg py-2 animate-fade-in">
									<Link
										href="/my-Course"
										className="block px-5 py-2 text-gray-700 hover:bg-emerald-50 transition"
										onClick={(e) => {
											e.preventDefault();
											setMobileDropdownOpen(false);
											setMobileMenuOpen(false);
											router.push("/my-Course");
										}}
									>
										My Courses
									</Link>
									<Link
										href="/profile"
										className="block px-5 py-2 text-gray-700 hover:bg-emerald-50 transition"
										onClick={(e) => {
											e.preventDefault();
											setMobileDropdownOpen(false);
											setMobileMenuOpen(false);
											router.push("/profile");
										}}
									>
										Profile
									</Link>
									<Link
										href="/profile/update"
										className="block px-5 py-2 text-gray-700 hover:bg-emerald-50 transition"
										onClick={(e) => {
											e.preventDefault();
											setMobileDropdownOpen(false);
											setMobileMenuOpen(false);
											router.push("/profile/update");
										}}
									>
										Profile Update
									</Link>
									<Link
										href="/change-password"
										className="block px-5 py-2 text-gray-700 hover:bg-emerald-50 transition"
										onClick={(e) => {
											e.preventDefault();
											setMobileDropdownOpen(false);
											setMobileMenuOpen(false);
											router.push("/change-password");
										}}
									>
										Password Change
									</Link>
									<button
										onClick={() => {
											handleLogout();
											setMobileDropdownOpen(false);
											setMobileMenuOpen(false);
										}}
										className="w-full text-left px-5 py-2 text-red-600 hover:bg-red-50 transition"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					)}
					<Link
						href="/contact"
						className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow transition-colors"
						aria-label="Contact"
						onClick={() => setMobileMenuOpen(false)}
					>
						<MessageCircle size={20} />
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;