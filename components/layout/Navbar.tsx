"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // Don't hide if menu is open or profile is open
    if (isMenuOpen || isProfileOpen) {
      setIsVisible(true);
      return;
    }

    // Show at the very top
    if (latest < 50) {
      setIsVisible(true);
      return;
    }

    // Hide on scroll down, Show on scroll up
    if (latest > previous && latest > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsProfileOpen(false);
          setIsMenuOpen(false);
          router.push("/signin");
        },
      },
    });
  };

  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // smooth easeOutQuint
            className="fixed inset-0 bg-[#F1EBE0] z-40 flex flex-col justify-between p-8 md:hidden"
          >
            {/* Header Area for Close Button alignment */}
            <div className="flex justify-between items-center p-6 pb-0">
                 <div className="text-xl font-oswald font-bold text-gray-400 tracking-widest uppercase">
                    MENU
                 </div>
                 {/* Close button is handled by the main navbar button Z-index */}
                 <div className="w-10"></div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
                <h1 className="text-[40vh] font-black font-oswald text-[#d819e6] rotate-90 origin-top-right absolute top-0 right-0 leading-none">
                    FEMFLARE
                </h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start space-y-2 relative z-10 overflow-y-auto no-scrollbar pt-8">
              <nav className="flex flex-col items-center gap-4 sm:gap-6 w-full pb-8">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/events", label: "Events" },
                    { href: "/gallery", label: "Gallery" },
                    { href: "/visionary", label: "Our Visionary" },
                  ].map((item, idx) => (
                    <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="group relative flex items-center justify-center w-full shrink-0"
                    >
                        <Link
                        onClick={() => setIsMenuOpen(false)}
                        href={item.href}
                        className={`text-4xl sm:text-6xl font-oswald font-bold group-hover:text-transparent group-hover:stroke-text transition-all duration-300 uppercase tracking-tight text-center ${
                          pathname === item.href ? "text-[#d819e6] underline underline-offset-8 decoration-4" : "text-black"
                        }`}
                        >
                            {item.label}
                        </Link>
                    </motion.div>
                  ))}

                  {/* Teams Mobile Dropdown */}
                  <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                      className="group relative flex flex-col items-center justify-center w-full shrink-0"
                  >
                      <button
                      onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                      className={`text-4xl sm:text-6xl font-oswald font-bold group-hover:text-transparent group-hover:stroke-text transition-all duration-300 uppercase tracking-tight text-center flex items-center gap-2 ${
                        pathname.startsWith("/teams") ? "text-[#d819e6] underline underline-offset-8 decoration-4" : "text-black"
                      }`}
                      >
                          TEAMS
                          <ChevronDown className={`w-8 h-8 md:w-12 md:h-12 transition-transform duration-300 ${isTeamsOpen ? "rotate-180" : ""} ${pathname.startsWith("/teams") ? "text-[#d819e6]" : "text-black"}`} />
                      </button>
                      <AnimatePresence>
                        {isTeamsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col items-center gap-4 mt-4 overflow-hidden"
                          >
                             <Link onClick={() => setIsMenuOpen(false)} href="/teams/chief-patrons" className={`text-xl sm:text-3xl font-oswald font-medium uppercase tracking-widest ${pathname === "/teams/chief-patrons" ? "text-[#d819e6] underline decoration-2 underline-offset-4" : "text-gray-500 hover:text-[#d819e6]"}`}>Chief Patrons</Link>
                             <Link onClick={() => setIsMenuOpen(false)} href="/teams/chairpersons" className={`text-xl sm:text-3xl font-oswald font-medium uppercase tracking-widest ${pathname === "/teams/chairpersons" ? "text-[#d819e6] underline decoration-2 underline-offset-4" : "text-gray-500 hover:text-[#d819e6]"}`}>Chairpersons</Link>
                             <Link onClick={() => setIsMenuOpen(false)} href="/teams/conveners" className={`text-xl sm:text-3xl font-oswald font-medium uppercase tracking-widest ${pathname === "/teams/conveners" ? "text-[#d819e6] underline decoration-2 underline-offset-4" : "text-gray-500 hover:text-[#d819e6]"}`}>Conveners</Link>
                             <Link onClick={() => setIsMenuOpen(false)} href="/teams/co-conveners" className={`text-xl sm:text-3xl font-oswald font-medium uppercase tracking-widest ${pathname === "/teams/co-conveners" ? "text-[#d819e6] underline decoration-2 underline-offset-4" : "text-gray-500 hover:text-[#d819e6]"}`}>Co-Conveners</Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                  </motion.div>

                  {[
                    ...(session ? [{ href: "/registered-events", label: "My Events" }] : []),
                    ...(session && (session.user as any)?.role === "ADMIN" ? [{ href: "/admin/events", label: "Admin" }] : []),
                  ].map((item, idx) => (
                    <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="group relative flex items-center justify-center w-full shrink-0"
                    >
                        <Link
                        onClick={() => setIsMenuOpen(false)}
                        href={item.href}
                        className={`text-4xl sm:text-6xl font-oswald font-bold transition-all duration-300 uppercase tracking-tight text-center ${
                          pathname === item.href ? "text-black underline underline-offset-8 decoration-4" : "text-[#d819e6] hover:text-black"
                        }`}
                        >
                            {item.label}
                        </Link>
                    </motion.div>
                  ))}
              </nav>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative z-10 w-full"
            >
                <div className="w-full h-[1px] bg-black/10 mb-8"></div>

                {session ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {session.user.name?.[0]?.toUpperCase()}
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-sm uppercase">{session.user.name}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{session.user.email}</p>
                        </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-widest border-b border-red-500/20 pb-0.5"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 w-full">
                     <Link onClick={() => setIsMenuOpen(false)} href="/signup" className="w-full max-w-xs">
                        <Button className="w-full py-6 text-sm font-bold uppercase tracking-widest bg-black text-white hover:bg-[#d819e6] rounded-full shadow-lg">
                            Get Started
                        </Button>
                     </Link>
                     <Link onClick={() => setIsMenuOpen(false)} href="/signin" className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-widest mt-2">
                        Sign In
                     </Link>
                  </div>
                )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <motion.nav
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-full"
        >
          <div className="px-6 md:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-50 flex items-center"
            >
              <Image
                src="/images/femflareloo2.png"
                alt="FemFlare Logo"
                width={250}
                height={80}
                className="h-24 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`font-sans font-medium transition-colors ${pathname === "/" ? "text-[#d819e6] underline underline-offset-[6px] decoration-2" : "hover:text-[#d819e6]"}`}
              >
                Home
              </Link>
              <Link
                href="/events"
                className={`font-sans font-medium transition-colors ${pathname === "/events" ? "text-[#d819e6] underline underline-offset-[6px] decoration-2" : "hover:text-[#d819e6]"}`}
              >
                Events
              </Link>
              <Link
                href="/gallery"
                className={`font-sans font-medium transition-colors ${pathname === "/gallery" ? "text-[#d819e6] underline underline-offset-[6px] decoration-2" : "hover:text-[#d819e6]"}`}
              >
                Gallery
              </Link>
              <Link
                href="/visionary"
                className={`font-sans font-medium transition-colors ${pathname === "/visionary" ? "text-[#d819e6] underline underline-offset-[6px] decoration-2" : "hover:text-[#d819e6]"}`}
              >
                Our Visionary
              </Link>
              <div className="relative group">
                <button className={`font-sans font-medium transition-colors flex items-center gap-1 py-4 ${pathname.startsWith("/teams") ? "text-[#d819e6] underline underline-offset-[6px] decoration-2" : "hover:text-[#d819e6]"}`}>
                  Teams
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  <Link href="/teams/chief-patrons" className={`block px-4 py-2.5 text-sm font-medium transition-colors ${pathname === "/teams/chief-patrons" ? "text-[#d819e6] bg-black/5" : "text-black hover:bg-black/5 hover:text-[#d819e6]"}`}>Chief Patrons</Link>
                  <Link href="/teams/chairpersons" className={`block px-4 py-2.5 text-sm font-medium transition-colors ${pathname === "/teams/chairpersons" ? "text-[#d819e6] bg-black/5" : "text-black hover:bg-black/5 hover:text-[#d819e6]"}`}>Chairpersons</Link>
                  <Link href="/teams/conveners" className={`block px-4 py-2.5 text-sm font-medium transition-colors ${pathname === "/teams/conveners" ? "text-[#d819e6] bg-black/5" : "text-black hover:bg-black/5 hover:text-[#d819e6]"}`}>Conveners</Link>
                  <Link href="/teams/co-conveners" className={`block px-4 py-2.5 text-sm font-medium transition-colors ${pathname === "/teams/co-conveners" ? "text-[#d819e6] bg-black/5" : "text-black hover:bg-black/5 hover:text-[#d819e6]"}`}>Co-Conveners</Link>
                </div>
              </div>
              {session && (
                <Link
                  href="/registered-events"
                  className={`font-sans font-medium transition-colors ${pathname === "/registered-events" ? "text-[#d819e6] underline underline-offset-[6px] decoration-2" : "hover:text-[#d819e6]"}`}
                >
                  My Events
                </Link>
              )}
              {(session?.user as any)?.role === "ADMIN" && (
                <Link
                  href="/admin/events"
                  className={`font-sans font-bold transition-colors ${pathname === "/admin/events" ? "text-black underline underline-offset-[6px] decoration-2" : "text-[#d819e6] hover:text-black"}`}
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Desktop Auth / Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {isPending ? (
                <div className="w-24 h-10 bg-gray-200/50 animate-pulse rounded"></div>
              ) : session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 bg-white/50 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/70 transition-colors"
                  >
                    <div className="w-8 h-8 bg-[#d819e6] rounded-full flex items-center justify-center text-white font-bold">
                      {session.user.name?.[0]?.toUpperCase() || (
                        <User size={16} />
                      )}
                    </div>
                    <span className="font-medium text-sm truncate max-w-[100px]">
                      {session.user.name}
                    </span>
                  </button>

                  {/* Desktop Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden py-1"
                      >
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center transition-colors"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/signin">
                    <span className="font-medium hover:text-[#d819e6] transition-colors cursor-pointer">
                      Sign In
                    </span>
                  </Link>
                  <Link href="/signup">
                    <Button className="py-2 rounded-2xl px-6 text-sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button - Animated */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 p-2 text-black focus:outline-none"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                  className="w-6 h-0.5 bg-black block mb-1.5 rounded-full"
                ></motion.span>
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="w-6 h-0.5 bg-black block mb-1.5 rounded-full"
                ></motion.span>
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                  className="w-6 h-0.5 bg-black block rounded-full"
                ></motion.span>
              </motion.div>
            </button>
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
};

export default Navbar;
