import React from 'react';
import { getEventCategories } from '@/app/actions/events';
import CategoryManager from '@/components/admin/CategoryManager';

export default async function AdminEventsPage() {
  const result = await getEventCategories();

  if (!result.success || !result.data) {
    return <div>Failed to load categories</div>;
  }

  return <CategoryManager initialCategories={result.data} />;
}
