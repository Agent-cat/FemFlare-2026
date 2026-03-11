"use client";

import { useState } from 'react';
import { Download, Users } from 'lucide-react';
import { getAllUsers } from '@/app/actions/user';
import { downloadExcel } from '@/lib/excel';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadUsers = async () => {
      setIsDownloading(true);
      const toastId = toast.loading("Fetching all users...");

      const res = await getAllUsers();

      if (res.success && res.users) {
          const data = res.users.map(user => ({
              "User ID": user.id,
              "Name": user.name,
              "Email": user.email,
              "Role": user.role,
              "Phone Number": user.phoneNumber || "N/A",
              "College": user.college || "N/A",
              "Student ID": user.studentId || "N/A",
              "Department": user.department || "N/A",
              "Address": user.address || "N/A",
              "Is Onboarded": user.isOnboarded ? "Yes" : "No",
              "Joined At": new Date(user.createdAt).toLocaleString(),
          }));

          downloadExcel(data, `FemFair_All_Users_${new Date().toISOString().split('T')[0]}`);
          toast.success("Download started", { id: toastId });
      } else {
          toast.error("Failed to fetch users", { id: toastId });
      }
      setIsDownloading(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-oswald font-bold text-gray-900 mb-8 uppercase tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <div className="bg-[#EBE5DB]/30 p-8 rounded-3xl border border-[#DCCEB8] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722]/5 rounded-bl-[100px] -z-0"></div>
            <div className="relative z-10">
                <h2 className="text-2xl font-oswald font-bold text-gray-900 mb-4 uppercase">Welcome Back</h2>
                <p className="text-gray-600 font-sans text-lg max-w-2xl leading-relaxed mb-6">
                    Welcome to the FemFlare Admin Panel. Manage your events, view registrations, and oversee the platform.
                </p>
                <div className="flex gap-4">
                     <button
                        onClick={handleDownloadUsers}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white font-bold font-oswald uppercase tracking-wide rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                        {isDownloading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download className="w-5 h-5" />
                        )}
                        Download All Users Data
                     </button>
                </div>
            </div>
          </div>

          {/* Quick Stats or Access could go here */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
               <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mb-4 text-[#FF5722]">
                    <Users className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-oswald font-bold text-gray-900 uppercase">User Management</h3>
               <p className="text-gray-500 mt-2 mb-6">Need to analyze total participants? Use the download button to get a full report.</p>
          </div>
      </div>
    </div>
  );
}
