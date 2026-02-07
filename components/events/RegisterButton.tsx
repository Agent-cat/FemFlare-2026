"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, X, ShieldCheck } from 'lucide-react';
import { registerForEvent } from '@/app/actions/events';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface RegisterButtonProps {
  eventId: string;
  initialIsRegistered: boolean;
  termsAndConditions?: string | null;
}

export default function RegisterButton({ eventId, initialIsRegistered, termsAndConditions }: RegisterButtonProps) {
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
  const [isLoading, setIsLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      toast.error("Please sign in to register");
      router.push("/signin");
      return;
    }

    if (isRegistered) return;

    if (termsAndConditions) {
        setShowTerms(true);
    } else {
        proceedWithRegistration();
    }
  };

  const proceedWithRegistration = async () => {
    setShowTerms(false);
    setIsLoading(true);
    const res = await registerForEvent(eventId, session?.user.id as string);
    setIsLoading(false);

    if (res.success) {
      setIsRegistered(true);
      toast.success("Successfully registered for event!");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to register");
    }
  };

  if (isRegistered) {
    return (
      <div className="flex items-center justify-center gap-3 w-full py-3 bg-[#FF5722]/10 text-gray-900 font-black text-[11px] uppercase tracking-[0.2em] rounded-xl border border-[#FF5722]/20 cursor-default h-[46px]">
        <Check className="w-4 h-4 stroke-[3px] text-[#FF5722]" />
        Registered
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleRegisterClick}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 w-full py-3 bg-[#FF5722] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl hover:bg-[#F4511E] transition-all shadow-lg shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed h-[46px]"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Register Now"
        )}
      </button>

      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 z-100 flex flex-col bg-[#F1EBE0]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col h-full w-full"
            >
              {/* Sticky Header */}
              <div className="shrink-0 px-6 py-8 md:px-12 md:py-10 border-b border-black/5 bg-[#F1EBE0]/80 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="p-3 bg-[#FF5722]/10 rounded-2xl">
                      <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-[#FF5722]" />
                    </div>
                    <div>
                      <h3 className="font-oswald text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-900 leading-none mb-1">Terms & Conditions</h3>
                      <div className="h-1 w-12 bg-[#FF5722]"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTerms(false)}
                    className="p-3 hover:bg-black/5 rounded-full transition-all group"
                  >
                    <X className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-20">
                  <div
                    className="text-gray-700 text-base md:text-lg leading-relaxed prose prose-orange max-w-none
                               prose-headings:font-oswald prose-headings:uppercase prose-headings:tracking-tight
                               prose-p:mb-6 prose-li:mb-2 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: termsAndConditions as string }}
                  />
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="shrink-0 px-6 py-8 md:px-12 border-t border-black/5 bg-[#F1EBE0]/80 backdrop-blur-md sticky bottom-0 z-10">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowTerms(false)}
                    className="flex-1 px-8 py-4 bg-black/5 text-gray-600 font-bold text-xs md:text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-black/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={proceedWithRegistration}
                    className="flex-2 px-8 py-4 bg-[#FF5722] text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-[#F4511E] transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
                  >
                    I Accept and Register
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
