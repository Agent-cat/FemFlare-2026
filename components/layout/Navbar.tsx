"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/Button';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
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

    return (
        <>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-[#F1EBE0] z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Link onClick={() => setIsMenuOpen(false)} href="/" className="text-3xl font-oswald text-black hover:text-[#FF5722] transition-colors">
                                HOME
                            </Link>
                        </motion.div>

                        <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.2 }}
                        >
                            <Link onClick={() => setIsMenuOpen(false)} href="/events" className="text-3xl font-oswald text-black hover:text-[#FF5722] transition-colors">
                                EVENTS
                            </Link>
                        </motion.div>

                         <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="w-16 h-1 bg-[#FF5722]/50 rounded-full"
                         ></motion.div>

                        {session ? (
                             <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col items-center space-y-6"
                             >
                                 <div className="flex flex-col items-center space-y-2">
                                     <div className="w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        {session.user.name?.[0]?.toUpperCase()}
                                   </div>
                                   <span className="font-medium text-xl">
                                       {session.user.name}
                                   </span>
                                 </div>

                                 <button
                                    onClick={handleLogout}
                                    className="flex items-center text-red-600 font-medium px-8 py-3 rounded-full border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
                                 >
                                    <LogOut size={20} className="mr-2" />
                                    Sign Out
                                 </button>
                             </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col items-center space-y-6"
                            >
                                <Link onClick={() => setIsMenuOpen(false)} href="/signin" className="text-2xl font-medium hover:text-[#FF5722] transition-colors">
                                    Sign In
                                </Link>
                                 <Link onClick={() => setIsMenuOpen(false)} href="/signup">
                                    <Button className="py-3 px-10 rounded-2xl text-lg shadow-lg">
                                        Sign Up
                                    </Button>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                <motion.nav
                    initial={{ y: 0, opacity: 1 }}
                    animate={{
                        y: isVisible ? 0 : -100,
                        opacity: isVisible ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-full"
                >
                    <div className="px-6 md:px-8 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="text-2xl font-oswald font-bold text-black tracking-tighter uppercase relative z-50">
                        FemFair
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="font-sans font-medium hover:text-[#FF5722] transition-colors">
                            Home
                        </Link>
                        <Link href="/events" className="font-sans font-medium hover:text-[#FF5722] transition-colors">
                            Events
                        </Link>
                        {session && (
                            <Link href="/registered-events" className="font-sans font-medium hover:text-[#FF5722] transition-colors">
                                My Events
                            </Link>
                        )}
                        {(session?.user as any)?.role === 'ADMIN' && (
                            <Link href="/admin/events" className="font-sans font-bold text-[#FF5722] hover:text-black transition-colors">
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
                                   <div className="w-8 h-8 bg-[#FF5722] rounded-full flex items-center justify-center text-white font-bold">
                                        {session.user.name?.[0]?.toUpperCase() || <User size={16}/>}
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
                                    <span className="font-medium hover:text-[#FF5722] transition-colors cursor-pointer">
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
