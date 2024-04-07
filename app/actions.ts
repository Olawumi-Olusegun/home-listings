"use server";

import prismaDb from "@/app/lib/db";
import { redirect } from "next/navigation";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";


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
    } else if(data.addedCategory && data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/location`);
    } else if(data.addedCategory && data.addedDescription && data.addedLocation) {
        const data = await prismaDb.home.create({
            data: { userId }
        });

        return redirect(`/create/${data.id}/structure`);
    }
}

export const createCategory = async (formData: FormData) => {
 
    const homeId = formData.get("homeId") as string;
    const categoryName = formData.get("categoryName") as string;

    const data = await prismaDb.home.update({
        where: { id: homeId },
        data: {
            categoryName,
            addedCategory: true,
        }
    });

    return redirect(`/create/${homeId}/description`);
}


export const createDescription = async (formData: FormData) => {
    const homeId = formData.get("homeId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image") as File;

    const guestNumber = formData.get("guest") as string;
    const roomNumber = formData.get("room") as string;
    const bathroomNumber = formData.get("bathroom") as string;

    const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
        cacheControl: "2592000",
        contentType: "image/png"
    });

    const data = await prismaDb.home.update({
        where: { id: homeId },
        data: {
            title,
            description,
            price: Number(price),
            bedrooms: roomNumber,
            bathrooms: bathroomNumber,
            addedDescription: true,
            guests: guestNumber,
            photo: imageData?.path,
        }
    });

    return redirect(`/create/${homeId}/address`);

}


export const createLocation = async (formData: FormData) => {

    const homeId = formData.get("homeId") as string;
    const countryValue = formData.get("countryValue") as string;


    const data = await prismaDb.home.update({
        where: { id: homeId },
        data: {
            addedLocation: true,
            country: countryValue,
        }
    });

    return redirect("/");
}

export const addToFavourite = async (formData: FormData) => {
    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;
    const pathName = formData.get("pathName") as string;

    const data = await prismaDb.favourite.create({
        data: {
            userId,
            homeId
        }
    });

    revalidatePath(pathName)
}

export const deleteToFavourite = async (formData: FormData) => {
    const favouriteId = formData.get("favouriteId") as string;
    const userId = formData.get("userId") as string;
    const pathName = formData.get("pathName") as string;

    const data = await prismaDb.favourite.delete({
        where: {
            id: favouriteId,
            userId,
        }
    });

    revalidatePath(pathName)
}

export const createReservation = async (formData: FormData) => {

    const userId = formData.get("userId") as string;
    const homeId = formData.get("homeId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    const data = await prismaDb.reservation.create({
        data: { 
            userId,
            homeId,
            startDate,
            endDate,
         }
    });

    return redirect("/");
}