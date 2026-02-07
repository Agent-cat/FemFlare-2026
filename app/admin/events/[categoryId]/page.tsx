import React, { Suspense } from 'react';
import { getCategoryEvents } from '@/app/actions/events';
import EventManager from '@/components/admin/EventManager';
import { Loader2 } from 'lucide-react';
import { connection } from 'next/server';

async function EventFetcher({ paramsPromise }: { paramsPromise: Promise<{ categoryId: string }> }) {
  await connection();
  const { categoryId } = await paramsPromise;
  const result = await getCategoryEvents(categoryId);

  if (!result.success || !result.category) {
    return <div>Category not found or failed to load.</div>;
  }

  return <EventManager category={result.category} initialEvents={result.events || []} />;
}

export default function AdminCategoryEventsPage(props: {
  params: Promise<{ categoryId: string }>;
}) {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    }>
      <EventFetcher paramsPromise={props.params} />
    </Suspense>
  );
}
