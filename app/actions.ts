"use server";

import prismaDb from "@/lib/db";
import { redirect } from "next/navigation";


export const createHomeListing = async ({userId}: {userId: string}) => {
    const data = await prismaDb.home.findFirst({
        where: { userId },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if(data === null) {
        const data = await prismaDb.home.create({
            data: { userId }
        });

        return redirect(`/create/${data.id}/structure`);
    } else if(!data.addedCategory && !data.description && !data.addedLocation) {
        return redirect(`/create/${data.id}/structure`);
    } else if (data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`);
    }
}