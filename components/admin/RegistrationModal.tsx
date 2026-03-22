"use client";

import React from 'react';
import { X, User, Calendar, Mail, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { downloadExcel } from '@/lib/excel';

interface Registration {
    id: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
        studentId?: string;
        college?: string;
        department?: string;
        phoneNumber?: string;
    };
}

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    registrations: Registration[];
    isLoading: boolean;
}

export default function RegistrationModal({ isOpen, onClose, eventName, registrations, isLoading }: RegistrationModalProps) {
    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            // Also lock html if necessary
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    const handleDownload = () => {
        const data = registrations.map(reg => ({
            "Student Name": reg.user.name,
            "Email": reg.user.email,
            "ID Number": reg.user.studentId || (reg.user as any).studentId || "N/A",
            "College": reg.user.college || (reg.user as any).college || "N/A",
            "Department": reg.user.department || (reg.user as any).department || "N/A",
            "Mobile": reg.user.phoneNumber || (reg.user as any).phoneNumber || "N/A",
            "Registration Date": new Date(reg.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }));
        downloadExcel(data, `${eventName.replace(/\s+/g, '_')}_Registrations`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden border border-gray-100"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Registrations</h2>
                                <p className="text-sm text-gray-500 mt-1">Event: <span className="font-medium text-gray-700">{eventName}</span></p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div
                            className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 overscroll-contain"
                            data-lenis-prevent
                        >
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                    <div className="w-8 h-8 border-2 border-[#FF5722] border-t-transparent rounded-full animate-spin mb-4" />
                                    <p>Loading registrations...</p>
                                </div>
                            ) : registrations.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                                    <User className="w-12 h-12 mb-3 text-gray-200" />
                                    <p className="font-medium">No registrations yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                                        <span>Student Details</span>
                                        <span>Registered On</span>
                                    </div>
                                    {registrations.map((reg) => (
                                        <div key={reg.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center font-bold text-lg overflow-hidden">
                                                    {reg.user.image ? (
                                                        <img src={reg.user.image} alt={reg.user.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        reg.user.name?.[0]?.toUpperCase() || <User className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{reg.user.name}</p>
                                                    <div className="flex items-center gap-1.5 text-[11px] md:text-sm text-gray-500">
                                                        <Mail className="w-3 h-3" />
                                                        <span className="truncate max-w-[150px] md:max-w-none">{reg.user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-xs md:text-sm text-gray-500 font-medium flex items-center gap-1.5 shrink-0">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {new Date(reg.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    timeZone: 'Asia/Kolkata'
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-gray-500">
                            <span>Total: <strong className="text-gray-900">{registrations.length}</strong> students</span>
                            <div className="flex gap-2 w-full sm:w-auto">
                                 <button
                                    onClick={handleDownload}
                                    disabled={registrations.length === 0}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors font-medium font-oswald uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Download className="w-4 h-4" /> Download
                                </button>
                                 <button
                                    onClick={onClose}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
