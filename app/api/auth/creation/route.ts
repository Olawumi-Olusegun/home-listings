import prismaDb from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";


export const GET = async () => {
noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user || user === null || !user.id) {
        throw new Error("Something went wrong...");
    }


    let dbUser = await prismaDb.user.findUnique({
        where: { id: user.id },
    });

    if(!dbUser) {
        dbUser = await prismaDb.user.create({
            data: {
                id: user.id,
                email: user.email ?? "",
                firstname: user.given_name ?? "",
                lastname: user.family_name ?? "",
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
            }
        });
    }

    return NextResponse.redirect("http://localhost:3000");
}