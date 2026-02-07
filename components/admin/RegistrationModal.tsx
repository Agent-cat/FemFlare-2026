"use client";

import React from 'react';
import { X, User, Calendar, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Registration {
    id: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
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
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white run-shadow-lg rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
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

                    <div className="flex-1 overflow-y-auto p-6">
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
                                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                    <Mail className="w-3 h-3" />
                                                    {reg.user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                            {new Date(reg.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center text-sm text-gray-500">
                        <span>Total: <strong className="text-gray-900">{registrations.length}</strong> students</span>
                        <div className="flex gap-2">
                             <button
                                onClick={onClose}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
