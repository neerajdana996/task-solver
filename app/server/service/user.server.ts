import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { GitHubProfile, GoogleProfile } from "remix-auth-socials";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../db.server";


enum EMAIL_PURPOSE {
    EMAIL_VERIFICATION = "email_verification",
    PASSWORD_RESET = "password_reset",
}
export class UserService {
    async createUserActivity({
        userId,
        activityType,
        activityData,
    }: {
        userId: any;
        activityType: any;
        activityData: any;
    }) {
        return prisma.userActivity.create({
            data: {
                userId,
                activityType,
                activityData,
            },
        });
    }
    async getUserById(id: any) {
        console.log("id", id);
        return prisma.user
            .findUnique({
                where: { id: parseInt(id) },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                },
            })
            .then((res) => {
                return {
                    id: res?.id,
                    email: res?.email,
                    name: res?.name,
                    role: res?.role,
                };
            });
    }


    comparePassword(
        password: User["password"],
        hashedPassword: User["password"]
    ) {
        return bcrypt.compare(password, hashedPassword);
    }
    async getUserByemail(email: User["email"]) {
        return prisma.user.findUnique({ where: { email } });
    }
    async getUsers() {
        return prisma.user.findMany({});
    }

    async getUserIdByEmail(email: User["email"]) {
        const user = await prisma.user.findUnique({ where: { email } });
        return user?.id;
    }


    async findOrCreate(profile: GitHubProfile | GoogleProfile) {
        const email = profile.emails[0]?.value
        const name = profile?.displayName;
        debugger;

        let user = await prisma.user.findFirst({
            where: { email: { equals: email } },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            },
        });


        if (!user) {
            const hashedPassword = await bcrypt.hash("defaultPassword", 10);
            const uniqueKey = uuidv4();


            user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    uniqueKey,
                    name: name || "Default Name",


                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true
                },
            });


        }





        // Append role type and permissions to the user object
        return {
            ...user,

        };
    }

}
