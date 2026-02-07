"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, Heart, Share2 } from 'lucide-react';

interface EventActionsProps {
  event: {
    startDate: Date | string;
    endDate?: Date | string | null;
    location?: string | null;
    termsAndConditions?: string | null;
  };
}

export const EventActions = ({ event }: EventActionsProps) => {
  const [agreed, setAgreed] = useState(false);

  const formatDate = (date: Date | string) => {
      return new Date(date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
      });
  };

  return (
    <div className="w-full md:w-80 shrink-0 space-y-6">
        <div className="bg-[#F9F7F5] p-6 rounded-3xl space-y-6">
            <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 text-[#FF5722]">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Start Date</h3>
                        <p className="text-sm font-bold text-gray-900">{formatDate(event.startDate)}</p>
                    </div>
            </div>

            {event.endDate && (
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 text-[#FF5722]">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">End Date</h3>
                         <p className="text-sm font-bold text-gray-900">{formatDate(event.endDate)}</p>
                    </div>
                </div>
            )}

            {event.location && (
                <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 text-[#FF5722]">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Location</h3>
                            <p className="text-sm font-bold text-gray-900">{event.location}</p>
                        </div>
                </div>
            )}
        </div>

        {/* Terms and Conditions */}
        {event.termsAndConditions && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm text-gray-600">
                <p className="font-bold mb-2">Terms & Conditions:</p>
                <div className="max-h-32 overflow-y-auto mb-3 p-2 bg-gray-50 rounded text-xs">
                    {event.termsAndConditions}
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 text-[#FF5722] rounded border-gray-300 focus:ring-[#FF5722]"
                    />
                    <span className="font-medium text-gray-800">I agree to the terms</span>
                </label>
            </div>
        )}

        <button
            disabled={event.termsAndConditions ? !agreed : false}
            className="w-full py-4 bg-[#FF5722] hover:bg-[#F4511E] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
            Register Now
        </button>

        <div className="flex gap-4">
            <button className="flex-1 py-3 bg-white border border-gray-200 hover:border-gray-400 rounded-xl text-gray-700 font-medium flex items-center justify-center gap-2 transition-colors">
                <Heart className="w-4 h-4" /> Save
            </button>
                <button className="flex-1 py-3 bg-white border border-gray-200 hover:border-gray-400 rounded-xl text-gray-700 font-medium flex items-center justify-center gap-2 transition-colors">
                <Share2 className="w-4 h-4" /> Share
            </button>
        </div>
    </div>
  );
};
