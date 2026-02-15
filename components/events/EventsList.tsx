import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getPaginatedEventCategories, getUserRegistrations } from '@/app/actions/events';
import InfiniteEventsTree from './InfiniteEventsTree';

export default async function EventsList() {
    // 1. Start fetching public data immediately
    const categoriesPromise = getPaginatedEventCategories(1, 3);

    // 2. Start fetching session data
    const headersList = await headers();
    const sessionPromise = auth.api.getSession({ headers: headersList });

    // 3. Await both in parallel
    const [categoriesResult, session] = await Promise.all([
        categoriesPromise,
        sessionPromise
    ]);

    // 4. If logged in, fetch registrations (this is fast due to caching)
    let registeredEventIds: string[] = [];
    if (session?.user) {
        const regResult = await getUserRegistrations(session.user.id);
        if (regResult.success && regResult.registrations) {
            registeredEventIds = regResult.registrations.map(r => r.eventId);
        }
    }

    const initialData = (categoriesResult.success && categoriesResult.data) ? categoriesResult.data : [];
    const initialHasMore = categoriesResult.success ? (categoriesResult.hasMore || false) : false;

    if (initialData.length === 0) {
        return (
             <div className="text-center py-20 border-2 border-black/5 rounded-3xl mx-6 bg-white/30 backdrop-blur-sm">
                 <p className="text-xl text-gray-500 font-medium font-oswald uppercase tracking-wide">Coming soon. Check back later!</p>
            </div>
        );
    }

    // Cast initialData to the correct type if needed, assume data matches schema
    return (
        <InfiniteEventsTree
          initialData={initialData as any}
          initialHasMore={initialHasMore}
          registeredEventIds={registeredEventIds}
        />
    );
}
