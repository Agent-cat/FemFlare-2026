"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, XCircle, AlertTriangle, X } from 'lucide-react';
import { unregisterFromEvent } from '@/app/actions/events';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

interface UnregisterButtonProps {
  eventId: string;
}

export default function UnregisterButton({ eventId }: UnregisterButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleUnregister = async () => {
    if (!session?.user) return;

    setShowConfirm(false);
    setIsLoading(true);
    const res = await unregisterFromEvent(eventId, session.user.id);
    setIsLoading(false);

    if (res.success) {
      toast.success("Successfully unregistered from event");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to unregister");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center justify-center gap-2 w-full py-3 bg-[#FF5722]/05 text-gray-900 font-black text-[11px] uppercase tracking-[0.2em] rounded-xl hover:bg-[#FF5722]/10 transition-all h-[46px] border border-black/5"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <XCircle className="w-4 h-4 text-[#FF5722]" />
            Unregister
          </>
        )}
      </button>

      <AnimatePresence>
        {showConfirm && (
          <Portal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowConfirm(false)}
                className="absolute inset-0 bg-black/40"
                />
                <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-[#F1EBE0] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl border border-black/5 z-10"
                onClick={(e) => e.stopPropagation()}
                >
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-[#FF5722]" />
                    </div>

                    <h3 className="font-oswald text-2xl font-bold uppercase tracking-tight mb-2">Cancel Registration?</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Are you sure you want to unregister? You'll lose your spot for this event.
                    </p>

                    <div className="flex flex-col gap-3">
                    <button
                        onClick={handleUnregister}
                        className="w-full py-3 bg-[#FF5722] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl hover:bg-[#F4511E] transition-all shadow-lg shadow-orange-500/20"
                    >
                        Confirm Unregister
                    </button>
                    <button
                        onClick={() => setShowConfirm(false)}
                        className="w-full py-3 bg-black/5 text-gray-600 font-bold text-[11px] uppercase tracking-[0.2em] rounded-xl hover:bg-black/10 transition-colors"
                    >
                        Nevermind
                    </button>
                    </div>
                </div>

                <button
                    onClick={() => setShowConfirm(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>
                </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
