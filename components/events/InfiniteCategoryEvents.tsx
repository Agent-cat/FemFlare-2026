"use client";

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import { EventCard, EventItem } from '@/components/events/EventCard';
import { getCategoryEvents } from '@/app/actions/events';

interface InfiniteCategoryEventsProps {
    categoryId: string;
    initialEvents: EventItem[];
    initialHasMore: boolean;
    registeredEventIds: string[];
}

export default function InfiniteCategoryEvents({
    categoryId,
    initialEvents,
    initialHasMore,
    registeredEventIds
}: InfiniteCategoryEventsProps) {
    const [events, setEvents] = useState<EventItem[]>(initialEvents);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '200px',
    });

    const loadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;
        const result = await getCategoryEvents(categoryId, nextPage, 9);

        if (result.success && result.events) {
            setEvents((prev) => [...prev, ...result.events as EventItem[]]);
            setHasMore(result.hasMore || false);
            setPage(nextPage);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (inView) {
            loadMore();
        }
    }, [inView]);

    const registeredSet = new Set(registeredEventIds);

    return (
        <>
            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, idx) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        index={idx}
                        isRegistered={registeredSet.has(event.id)}
                    />
                ))}

                {events.length === 0 && (
                    <div className="col-span-full py-24 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm mb-6">
                             <Star className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No events yet</h3>
                        <p className="text-gray-500">Check back later for updates in this collection.</p>
                    </div>
                )}
            </div>

            {/* Loading / End of list */}
            {hasMore && (
                <div ref={ref} className="h-24 flex justify-center items-center mt-8">
                    {loading && (
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#FF5722] animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 rounded-full bg-[#FF5722] animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 rounded-full bg-[#FF5722] animate-bounce"></div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
