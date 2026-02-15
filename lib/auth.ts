import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    trustedOrigins: ["http://localhost:3000"],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            enabled: true,
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        microsoft: {
            enabled: true,
            clientId: process.env.MICROSOFT_CLIENT_ID as string,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
        },

    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER"
            },
            phoneNumber: {
                type: "string",
                required: false,
            },
            address: {
                type: "string",
                required: false,
            },
            college: {
                type: "string",
                required: false,
            },
            studentId: {
                type: "string",
                required: false,
            },
            department: {
                type: "string",
                required: false,
            },
            isOnboarded: {
                type: "boolean",
                required: false,
                defaultValue: false
            }
        }
    }


});
