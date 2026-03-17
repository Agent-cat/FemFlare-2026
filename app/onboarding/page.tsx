"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { updateUserOnboarding } from "@/app/actions/user";

export default function OnboardingPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [[step, direction], setStep] = useState([1, 0]);
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        college: "",
        department: "",
        studentId: "",
        address: "",
        needsAccommodation: false,
    });
    const [loading, setLoading] = useState(false);
    const [isOtherCollege, setIsOtherCollege] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/signin");
        } else if ((session?.user as any)?.isOnboarded === true) {
            router.replace("/");
        } else if (session?.user?.name) {
            setFormData(prev => ({ ...prev, name: session.user.name || "" }));
        }

        // Check if the user already has a college set that isn't KL University
        if (session && (session.user as any)?.college && (session.user as any)?.college !== "KL University") {
            setIsOtherCollege(true);
        }
    }, [session, isPending, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const paginate = (newStep: number) => {
        setStep([newStep, newStep > step ? 1 : -1]);
    };

    const handleNext = () => {
        if (step === 1) {
            if (!formData.name || !formData.phoneNumber) {
                toast.error("Please fill in all required fields");
                return;
            }
            paginate(2);
        } else if (step === 2) {
            if (!formData.college || !formData.department || !formData.studentId) {
                toast.error("Please connect your academic details");
                return;
            }
            handleSubmit();
        }
    };

    const handleBack = () => {
        paginate(Math.max(1, step - 1));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await updateUserOnboarding(formData);
            if (result.success) {
                toast.success("Welcome aboard!");
                window.location.href = "/";
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("Failed to update profile");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (isPending || !session) {
        return (
            <div className="min-h-screen bg-[#fdf5f7] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#f43f5e] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 20 : -20,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 20 : -20,
            opacity: 0,
        }),
    };

    return (
        <div className="min-h-screen bg-[#fdf5f7] flex items-center justify-center p-4 font-sans text-gray-900">
            <div className="max-w-2xl w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden min-h-[auto] md:min-h-[600px] flex flex-col border border-white/50">
                {/* Progress Header */}
                <div className="px-5 pt-6 pb-4 md:px-8 md:pt-8 md:pb-4 bg-transparent z-10">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex gap-2">
                            {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${
                                        step >= i ? 'bg-[#f43f5e]' : 'bg-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Step {step} / 2</span>
                    </div>
                </div>

                <div className="flex-1 px-5 pb-6 md:px-8 md:pb-8 relative overflow-hidden">
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-8 w-full"
                            >
                                <div className="space-y-3">
                                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1A1A1A] tracking-tight">
                                        Personal Details
                                    </h2>
                                    <p className="text-gray-500 text-lg">Let's start with your basic information.</p>
                                </div>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 rounded-xl bg-[#fdf5f7]/50 border border-[#EBE5DB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/5 focus:border-[#f43f5e] transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mail ID *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={session.user?.email || ""}
                                                disabled
                                                className="w-full px-4 py-3.5 rounded-xl bg-[#fdf5f7] border border-[#EBE5DB] text-gray-500 cursor-not-allowed font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phoneNumber" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Number *</label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 rounded-xl bg-[#fdf5f7]/50 border border-[#EBE5DB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/5 focus:border-[#f43f5e] transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="address" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address</label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full px-4 py-3.5 rounded-xl bg-[#fdf5f7]/50 border border-[#EBE5DB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/5 focus:border-[#f43f5e] transition-all placeholder:text-gray-400 text-gray-900 resize-none font-medium"
                                            placeholder="Where are you located?"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-8 w-full"
                            >
                                <div className="space-y-3">
                                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1A1A1A] tracking-tight">Academic Profile</h2>
                                    <p className="text-gray-500 text-lg">Help us verify your student status.</p>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label htmlFor="college" className="text-xs font-bold text-gray-500 uppercase tracking-wider">College Name *</label>
                                        <select
                                            id="college"
                                            name="college"
                                            value={isOtherCollege ? "Others" : formData.college}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === "Others") {
                                                    setIsOtherCollege(true);
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        college: "",
                                                        needsAccommodation: prev.needsAccommodation
                                                    }));
                                                } else {
                                                    setIsOtherCollege(false);
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        college: value,
                                                        needsAccommodation: value === "KL University" ? false : prev.needsAccommodation
                                                    }));
                                                }
                                            }}
                                            className="w-full px-4 py-3.5 rounded-xl bg-[#fdf5f7]/50 border border-[#EBE5DB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/5 focus:border-[#f43f5e] transition-all text-gray-900 font-medium cursor-pointer"
                                        >
                                            <option value="" disabled>Select your college</option>
                                            <option value="KL University">KL University</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>

                                    {isOtherCollege && (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label htmlFor="otherCollege" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Please Specify College *</label>
                                            <input
                                                type="text"
                                                id="otherCollege"
                                                name="otherCollege"
                                                value={formData.college}
                                                onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                                                className="w-full px-4 py-3.5 rounded-xl bg-[#fdf5f7]/50 border border-[#EBE5DB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/5 focus:border-[#f43f5e] transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                                                placeholder="Enter your college name"
                                            />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="department" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Department *</label>
                                            <input
                                                type="text"
                                                id="department"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 rounded-xl bg-[#fdf5f7]/50 border border-[#EBE5DB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/5 focus:border-[#f43f5e] transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                                                placeholder="e.g. CSE"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="studentId" className="text-xs font-bold text-gray-500 uppercase tracking-wider">ID Number *</label>
                                            <input
                                                type="text"
                                                id="studentId"
                                                name="studentId"
                                                value={formData.studentId}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 rounded-xl bg-[#fdf5f7]/50 border border-[#EBE5DB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/5 focus:border-[#f43f5e] transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                                                placeholder="e.g. 21BCE1234"
                                            />
                                        </div>
                                    </div>

                                    {formData.college !== "KL University" && formData.college !== "" && (
                                        <div className="pt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="needsAccommodation"
                                                        name="needsAccommodation"
                                                        checked={formData.needsAccommodation}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, needsAccommodation: e.target.checked }))}
                                                        className="w-5 h-5 rounded border-[#EBE5DB] text-[#f43f5e] focus:ring-[#f43f5e] transition-all bg-[#fdf5f7]/50 cursor-pointer"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="needsAccommodation" className="text-sm font-semibold text-[#1A1A1A] cursor-pointer">
                                                        I require accommodation
                                                    </label>
                                                    <span className="text-xs text-gray-500">Check this box if you need us to arrange stay during the event.</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-5 md:p-8 border-t border-[#EBE5DB]/30 bg-white/40 mt-auto">
                    <div className="flex flex-col-reverse gap-3 md:block md:relative md:flex md:justify-center md:items-center w-full">
                        <button
                            onClick={handleBack}
                            disabled={step === 1 || loading}
                            className={`w-full md:w-auto md:absolute md:left-0 px-8 py-4 rounded-xl font-semibold transition-all duration-200 border border-gray-200 md:border-transparent md:hover:border-gray-300 ${
                                step === 1
                                    ? 'hidden md:block opacity-0 pointer-events-none'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={loading}
                            className="w-full md:w-auto md:min-w-[200px] px-8 md:px-12 py-4 bg-[#f43f5e] hover:bg-[#e11d48] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>{step === 2 ? 'Complete Setup' : 'Continue'}</span>
                                    {step !== 2 && (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    )}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
