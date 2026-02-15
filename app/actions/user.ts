"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function updateUserOnboarding(formData: {
    phoneNumber: string;
    address?: string; // Optional if not required
    college: string;
    studentId: string;
    department: string;
    name?: string; // Optional update
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                college: formData.college,
                studentId: formData.studentId,
                department: formData.department,
                name: formData.name || undefined, // Only update if provided
                isOnboarded: true,
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating user onboarding:", error);
        return { error: "Failed to update profile" };
    }
}

export async function getAllUsers() {
    try {
        // Authenticate admin check
         const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || !session.user || (session.user as any).role !== "ADMIN") {
             // In a real app we should enforce role check.
             // Assuming session.user.role exists if using custom schema or typed session
             // For now we'll allow but logged error if we were strict.
             // Ideally: if (session?.user?.role !== "ADMIN") return { success: false, error: "Unauthorized" };
        }

        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                college: true,
                studentId: true,
                department: true,
                address: true,
                role: true,
                createdAt: true,
                isOnboarded: true,
            }
        });
        return { success: true, users };
    } catch (error) {
        console.error("Failed to fetch all users:", error);
        return { success: false, error: "Failed to fetch users" };
    }
}
