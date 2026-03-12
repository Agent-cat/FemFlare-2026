"use client";

import React from "react";
import * as XLSX from 'xlsx';
import { Download, Users } from "lucide-react";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  college: string | null;
  studentId: string | null;
  department: string | null;
  address: string | null;
  createdAt: Date;
  registrations: {
    event: {
      title: string;
    };
  }[];
}

interface AccommodationTableProps {
  users: User[];
}

export default function AccommodationTable({ users }: AccommodationTableProps) {
  const downloadExcel = () => {
    const data = users.map(user => ({
      Name: user.name,
      Email: user.email,
      'Phone Number': user.phoneNumber || 'N/A',
      College: user.college || 'N/A',
      'Student ID': user.studentId || 'N/A',
      Department: user.department || 'N/A',
      Address: user.address || 'N/A',
      'Registered Events': user.registrations.map(r => r.event.title).join(", ") || 'No events registered',
      'Registration Date': format(new Date(user.createdAt), "PPP p")
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Accommodation Opted");

    // Generate buffer
    XLSX.writeFile(workbook, `FemFlare_Accommodation_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FF5722]/10 rounded-xl">
            <Users className="w-6 h-6 text-[#FF5722]" />
          </div>
          <div>
            <h2 className="text-xl font-oswald font-bold text-black uppercase tracking-tight">Accommodation Requests</h2>
            <p className="text-sm text-gray-500 font-sans">{users.length} participants need accommodation</p>
          </div>
        </div>

        <button
          onClick={downloadExcel}
          disabled={users.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-[#FF5722] hover:bg-[#E64A19] disabled:bg-gray-400 text-white rounded-xl shadow-lg transition-all active:scale-95 font-oswald uppercase tracking-wider text-sm"
        >
          <Download className="w-4 h-4" />
          Download Excel
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#DCCEB8]/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#EBE5DB]/50 border-b border-[#DCCEB8]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold font-oswald uppercase tracking-widest text-gray-500">Name</th>
                <th className="px-6 py-4 text-xs font-bold font-oswald uppercase tracking-widest text-gray-500">College & Dept</th>
                <th className="px-6 py-4 text-xs font-bold font-oswald uppercase tracking-widest text-gray-500">Registered Events</th>
                <th className="px-6 py-4 text-xs font-bold font-oswald uppercase tracking-widest text-gray-500">Phone</th>
                <th className="px-6 py-4 text-xs font-bold font-oswald uppercase tracking-widest text-gray-500">Student ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#1a1a1a] font-sans">{user.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-sans text-gray-700 font-bold uppercase tracking-tight">{user.college || '—'}</div>
                      <div className="text-xs text-[#FF5722] font-semibold">{user.department || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.registrations.length > 0 ? (
                          user.registrations.map((reg, i) => (
                            <span key={i} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-md border border-gray-200 uppercase tracking-tight">
                              {reg.event.title}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400 italic">No events</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-sans text-gray-700 font-medium">{user.phoneNumber || '—'}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-700">{user.studentId || '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-sans italic">
                    No accommodation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
