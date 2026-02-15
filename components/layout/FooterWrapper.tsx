"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // List of paths where the footer should be hidden
  // Using startsWith for authentication related routes to cover potential sub-routes
  // Exact match for main pages unless specified otherwise
  const shouldHideFooter =
    pathname === "/events" ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/signin") ||
    pathname === "/registered-events";

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
