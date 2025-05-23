import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path

import { PrismaClient } from "@/app/generated/prisma";
import { nextCookies } from "better-auth/next-js";
 
const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    socialProviders:{
        google:{
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        }
    },
    plugins:[nextCookies()],
    baseURL:process.env.NEXT_PUBLIC_BASE_URL!,
});