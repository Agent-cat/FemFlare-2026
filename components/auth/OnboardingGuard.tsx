"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function OnboardingGuard() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (isPending) return;

        // Public paths that don't require onboarding check
        const publicPaths = ["/signin", "/signup", "/onboarding"];
        if (publicPaths.includes(pathname)) return;

        if (session && session.user && !(session.user as any).isOnboarded) {
            router.replace("/onboarding");
        }
    }, [session, isPending, pathname, router]);

    return null;
}
