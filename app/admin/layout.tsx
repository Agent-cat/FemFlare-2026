import React, { Suspense } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Suspense fallback={<div className="w-64 bg-white border-r border-gray-200 hidden md:flex" />}>
        <AdminSidebar />
      </Suspense>
      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
