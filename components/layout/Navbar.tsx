"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isTeamsOpen, setIsTeamsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = pathname === '/teams' ? parseInt(searchParams.get('tab') || '0', 10) : -1;
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Navbar should appear "scrolled" if:
    // 1. Not on home page
    // 2. We've actually scrolled
    // 3. We're on mobile (as per user request to remove 'hide/transparent' navbar on mobile home page)
    const scrolled = !isHome || isScrolled || isMobile;

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setIsProfileOpen(false);
                    setIsMenuOpen(false);
                    router.push("/");
                },
            },
        });
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname === href) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Handle Lenis if active
            if ((window as any).lenis) {
                (window as any).lenis.scrollTo(0);
            }
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            {/* Backdrop overlay to close mobile menu when tapping outside */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            <nav className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled ? 'py-0' : 'py-2'}`}
                style={{
                    background: (scrolled || isMenuOpen) ? '#fdf5f7' : 'transparent',
                    backdropFilter: (scrolled || isMenuOpen) ? 'blur(10px)' : 'none',
                    boxShadow: (scrolled || isMenuOpen) ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
                }}
            >
                <div className="px-4 md:px-8 h-16 flex items-center justify-between">

                    {/* Logo Section */}
                    <Link href="/" onClick={(e) => handleLinkClick(e, '/')} className={`flex items-center gap-1.5 md:gap-4 text-xl font-bold tracking-tighter uppercase relative z-50 group transition-colors duration-300 ${(scrolled || isMenuOpen) ? 'text-gray-900' : 'text-white'}`}>
                        {/* KL Logo - Left */}
                        <div className="h-5 w-11 md:h-28 md:w-20 relative overflow-hidden shrink-0">
                            <Image
                                src="/images/kl.PNG"
                                alt="KL University Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Title Text - Middle */}
                        <span className="text-[13px] text-black min-[360px]:text-[14px] min-[400px]:text-[15px] sm:text-base lg:text-xl font-black whitespace-nowrap leading-tight">
                            Women Development Cell
                        </span>

                        {/* WDC Circle Logo - Right */}
                        <div className="w-6 h-6 md:w-10 md:h-10 relative rounded-full overflow-hidden shadow-md ring-1 md:ring-2 ring-white bg-white shrink-0">
                            <Image
                                src="/womensummits.png"
                                alt="WDC Logo"
                                fill
                                className="object-cover scale-140"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-end flex-1 space-x-6 mr-6">
                        <Link href="/" onClick={(e) => handleLinkClick(e, '/')} className={`font-sans font-semibold transition-colors capitalize tracking-wide relative group text-sm ${pathname === "/" ? (scrolled ? 'text-black' : 'text-white') : (scrolled ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white')}`}>
                            Home
                            <span className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 group-hover:w-full ${pathname === "/" ? 'w-full' : 'w-0'} ${scrolled ? 'bg-[#ec4899]' : 'bg-white'}`} />
                        </Link>
                        <Link href="/events" onClick={(e) => handleLinkClick(e, '/events')} className={`font-sans font-semibold transition-colors capitalize tracking-wide relative group text-sm ${pathname === "/events" ? (scrolled ? 'text-black' : 'text-white') : (scrolled ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white')}`}>
                            Events
                            <span className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 group-hover:w-full ${pathname === "/events" ? 'w-full' : 'w-0'} ${scrolled ? 'bg-[#ec4899]' : 'bg-white'}`} />
                        </Link>
                        <Link href="/gallery" onClick={(e) => handleLinkClick(e, '/gallery')} className={`font-sans font-semibold transition-colors capitalize tracking-wide relative group text-sm ${pathname === "/gallery" ? (scrolled ? 'text-black' : 'text-white') : (scrolled ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white')}`}>
                            Gallery
                            <span className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 group-hover:w-full ${pathname === "/gallery" ? 'w-full' : 'w-0'} ${scrolled ? 'bg-[#ec4899]' : 'bg-white'}`} />
                        </Link>
                        <Link href="/visionary" onClick={(e) => handleLinkClick(e, '/visionary')} className={`font-sans font-semibold transition-colors capitalize tracking-wide relative group text-sm ${pathname === "/visionary" ? (scrolled ? 'text-black' : 'text-white') : (scrolled ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white')}`}>
                            Our Visionary
                            <span className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 group-hover:w-full ${pathname === "/visionary" ? 'w-full' : 'w-0'} ${scrolled ? 'bg-[#ec4899]' : 'bg-white'}`} />
                        </Link>
                        <div className="relative group">
                            <button className={`font-sans font-semibold transition-colors capitalize tracking-wide relative text-sm flex items-center gap-1 outline-none ${pathname?.startsWith('/teams') ? (scrolled ? 'text-black' : 'text-white') : (scrolled ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white')}`}>
                                Teams
                                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                                <span className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 group-hover:w-full ${pathname?.startsWith('/teams') ? 'w-full' : 'w-0'} ${scrolled ? 'bg-[#ec4899]' : 'bg-white'}`} />
                            </button>
                            {/* Desktop Dropdown */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100 overflow-hidden min-w-[200px]">
                                    {[
                                        { name: 'Chief Patrons', href: '/teams/chief-patrons' },
                                        { name: 'Chairpersons', href: '/teams/chairpersons' },
                                        { name: 'Conveners', href: '/teams/conveners' },
                                        { name: 'Co-Conveners', href: '/teams/co-conveners' },
                                        { name: 'Chief Executives', href: '/teams/chief-executives' }
                                    ].map((team) => (
                                        <Link
                                            key={team.name}
                                            href={team.href}
                                            className={`block px-5 py-3 text-sm font-bold transition-all capitalize tracking-wider border-b border-gray-50 last:border-b-0 ${
                                                pathname === team.href
                                                    ? 'bg-gradient-to-r from-[#ec4899] to-[#f97316] text-white'
                                                    : 'text-[#0f172a] hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#f97316] hover:text-white'
                                            }`}
                                        >
                                            {team.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {session && (
                            <Link href="/registered-events" onClick={(e) => handleLinkClick(e, '/registered-events')} className={`font-sans font-semibold transition-colors capitalize tracking-wide relative group text-sm ${pathname === "/registered-events" ? (scrolled ? 'text-black' : 'text-white') : (scrolled ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white')}`}>
                                My Events
                                <span className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 group-hover:w-full ${pathname === "/registered-events" ? 'w-full' : 'w-0'} ${scrolled ? 'bg-[#ec4899]' : 'bg-white'}`} />
                            </Link>
                        )}
                        {(session?.user as any)?.role === "ADMIN" && (
                            <Link href="/admin/events" onClick={(e) => handleLinkClick(e, '/admin/events')} className={`font-sans font-bold transition-colors capitalize tracking-wide relative group text-sm ${pathname?.startsWith("/admin") ? (scrolled ? 'text-black' : 'text-white') : (scrolled ? 'text-gray-600 hover:text-black' : 'text-white/90 hover:text-white')}`}>
                                Admin
                                <span className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 group-hover:w-full ${pathname?.startsWith("/admin") ? 'w-full' : 'w-0'} ${scrolled ? 'bg-[#ec4899]' : 'bg-white'}`} />
                            </Link>
                        )}
                    </div>

                    {/* Auth Section / Profile */}
                    <div className="hidden md:flex items-center space-x-4">
                        {session ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-[#ec4899] to-[#f97316] text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                                >
                                    <User size={18} />
                                    <span className="font-medium text-sm">{session?.user?.name || 'Profile'}</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl shadow-2xl overflow-hidden py-1 z-50 text-gray-900"
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center transition-colors"
                                            >
                                                <LogOut size={16} className="mr-2" />
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/signin">
                                    <button className={`px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-black/5 active:scale-95 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="px-6 py-2 rounded-xl text-sm font-bold bg-[#1a1a1a] text-white hover:bg-black shadow-lg shadow-black/10 transition-all active:scale-95">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button - Animated */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden relative z-50 p-2 focus:outline-none transition-colors ${(scrolled || isMenuOpen) ? 'text-gray-900' : 'text-white'}`}
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
                                className={`w-6 h-0.5 block mb-1.5 rounded-full transition-colors ${(scrolled || isMenuOpen) ? 'bg-gray-900' : 'bg-white'}`}
                            ></motion.span>
                            <motion.span
                                variants={{
                                    closed: { opacity: 1 },
                                    open: { opacity: 0 },
                                }}
                                className={`w-6 h-0.5 block mb-1.5 rounded-full transition-colors ${(scrolled || isMenuOpen) ? 'bg-gray-900' : 'bg-white'}`}
                            ></motion.span>
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -8 },
                                }}
                                className={`w-6 h-0.5 block rounded-full transition-colors ${(scrolled || isMenuOpen) ? 'bg-gray-900' : 'bg-white'}`}
                            ></motion.span>
                        </motion.div>
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="md:hidden overflow-hidden border-t border-gray-100 bg-[#fdf5f7]"
                        >
                            <div className="px-6 py-4 flex flex-col space-y-1">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'Events', href: '/events' },
                                    { name: 'Gallery', href: '/gallery' },
                                    { name: 'Our Visionary', href: '/visionary' },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <Link
                                            onClick={(e) => handleLinkClick(e, item.href)}
                                            href={item.href}
                                            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all text-lg font-bold capitalize tracking-wide ${
                                                pathname === item.href ? 'text-[#ec4899] bg-pink-50' : 'text-black hover:bg-gray-50'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Teams accordion */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <button
                                        onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all text-lg font-bold capitalize tracking-wide ${
                                            pathname?.startsWith('/teams') ? 'text-[#ec4899] bg-pink-50' : 'text-black hover:bg-gray-50'
                                        }`}
                                    >
                                        Teams
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isTeamsOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {isTeamsOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                className="overflow-hidden mt-1 ml-4 border-l-2 border-[#ec4899]/20"
                                            >
                                                {[
                                                    { name: 'Chief Patrons', href: '/teams/chief-patrons' },
                                                    { name: 'Chairpersons', href: '/teams/chairpersons' },
                                                    { name: 'Conveners', href: '/teams/conveners' },
                                                    { name: 'Co-Conveners', href: '/teams/co-conveners' },
                                                    { name: 'Chief Executives', href: '/teams/chief-executives' },
                                                ].map((team, i) => (
                                                    <motion.div
                                                        key={team.href}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.04 }}
                                                    >
                                                        <Link
                                                            href={team.href}
                                                            onClick={() => { setIsMenuOpen(false); setIsTeamsOpen(false); }}
                                                            className={`flex items-center px-4 py-2.5 text-sm font-semibold capitalize tracking-wide transition-all rounded-lg ml-2 ${
                                                                pathname === team.href
                                                                    ? 'text-[#ec4899] bg-pink-50'
                                                                    : 'text-gray-700 hover:text-[#ec4899] hover:bg-pink-50'
                                                            }`}
                                                        >
                                                            {team.name}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {session && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 }}
                                    >
                                        <Link
                                            onClick={(e) => handleLinkClick(e, '/registered-events')}
                                            href="/registered-events"
                                            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all text-lg font-bold capitalize tracking-wide ${
                                                pathname === '/registered-events' ? 'text-[#ec4899] bg-pink-50' : 'text-black hover:bg-gray-50'
                                            }`}
                                        >
                                            My Events
                                        </Link>
                                    </motion.div>
                                )}

                                {session ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="pt-4 px-4"
                                    >
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-red-600 text-white shadow-lg shadow-red-500/20 active:scale-95 transition-all text-center"
                                        >
                                            Sign Out
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="pt-4 px-4 space-y-3"
                                    >
                                        <Link href="/signin" onClick={() => setIsMenuOpen(false)} className="w-full py-3.5 rounded-full text-sm font-bold uppercase tracking-wider border-2 border-[#1a1a1a]/10 text-black active:scale-95 transition-all block text-center">
                                            Sign In
                                        </Link>
                                        <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="w-full py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-[#1a1a1a] text-white shadow-xl shadow-black/20 active:scale-95 transition-all block text-center">
                                            Sign Up
                                        </Link>
                                    </motion.div>
                                )}

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Gradient separator line - visible when scrolled */}
                <div
                    className={`h-[2.50px] w-full bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#ec4899] transition-opacity duration-300 ${(scrolled || isMenuOpen) ? 'opacity-100' : 'opacity-0'}`}
                />
            </nav >
        </>
    );
};

export default Navbar;
