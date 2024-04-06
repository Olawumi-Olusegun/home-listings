
import prismaDb from '@/app/lib/db'
import { useCountries } from '@/app/lib/getCountries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { FC } from 'react'

type HomeParams = {
    params: {
        homeId: string
    }
}

const getData = async (homeId: string) => {
    const data = await prismaDb.home.findUnique({
        where: {
            id: homeId,
        },
        select: {
            photo: true,
            description: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            title: true,
            categoryName: true,
            price: true,
            country: true
        }
    });

    return data;
}

const Home: FC<HomeParams> = async ({ params }) => {

    const { getCountryByValue } = useCountries();

    const data = await getData(params.homeId);

    if(!data) {
        return redirect("/")
    }
    const country = getCountryByValue(data.country as string);


  return (
    <div className='w-[75%] mx-auto mt-10 '>
        <h2 className="font-medium text-2xl lg:text-3xl mb-5">{data.title}</h2>
        <div className="relative h-[550px] ">
            <Image 
            src={`https://gjxicebgfjmnugefmdmc.supabase.co/storage/v1/object/public/images/${data?.photo}`} 
            alt={data?.title as string}
            fill 
            className='rounded-lg h-full w-full object-cover'
            />
        </div>

        <div className="flex justify-between gap-x-24 mt-8 ">
            <div className="w-2/3">
                <h3 className="text-xl font-medium">
                    {country?.flag} {country?.label} / { country?.region}
                </h3>
                <div className="flex gap-x-2 text-muted-foreground">
                    <p className="">{data.guests} * {data.bedrooms} Bedrooms * {data.bathrooms} Bathrooms </p>
                </div>
                <div className="flex items-center mt-6"></div>
            </div>
        </div>
    </div>
  )
}

export default Home