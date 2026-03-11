import React, { Suspense } from 'react';
import { getCategoryEvents } from '@/app/actions/events';
import EventManager from '@/components/admin/EventManager';
import { Loader2 } from 'lucide-react';
import { connection } from 'next/server';

async function EventFetcher({ paramsPromise, searchParamsPromise }: { paramsPromise: Promise<{ categoryId: string }>, searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }> }) {
  await connection();
  const { categoryId } = await paramsPromise;
  const searchParams = await searchParamsPromise;

  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const validPage = isNaN(page) || page < 1 ? 1 : page;

  const result = await getCategoryEvents(categoryId, validPage, 9);

  if (!result.success || !result.category) {
    return <div>Category not found or failed to load.</div>;
  }

  return (
    <EventManager
      category={result.category}
      initialEvents={result.events || []}
      currentPage={validPage}
      totalPages={result.totalPages || 1}
    />
  );
}

export default function AdminCategoryEventsPage(props: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    }>
      <EventFetcher paramsPromise={props.params} searchParamsPromise={props.searchParams} />

    </Suspense>
  );
}
