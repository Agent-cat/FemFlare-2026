import React from "react";
import { getUsersNeedAccommodation } from "@/app/actions/user";
import AccommodationTable from "@/components/admin/AccommodationTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodation Management | FemFlare Admin",
};

export default async function AccommodationPage() {
  const result = await getUsersNeedAccommodation();

  if (!result.success || !result.users) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 font-sans">
          {result.error || "Failed to load accommodation data."}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-oswald font-bold text-black uppercase tracking-tight mb-2">
          Accommodation Panel
        </h1>
        <p className="text-gray-600 font-sans">
          Review and export data for participants who have requested on-campus accommodation.
        </p>
      </div>

      <AccommodationTable users={result.users as any} />
    </div>
  );
}
