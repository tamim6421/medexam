"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/Component/NavBar";
import Footer from "@/Component/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login";

  return (
    <>
      {/* {!hideLayout && <NavBar />}
      {children}
      {!hideLayout && <Footer />} */}
    <NavBar />
      {children}
   <Footer />
    </>
  );
}
