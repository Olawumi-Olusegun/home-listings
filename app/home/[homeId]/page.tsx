
import { createReservation } from '@/app/actions'
import CategoryShowCase from '@/app/components/CategoryShowCase'
import HomeMap from '@/app/components/HomeMap'
import SelectCalendar from '@/app/components/SelectCalendar'
import { ReservationSubmitButton } from '@/app/components/SubmitButtons'
import prismaDb from '@/app/lib/db'
import { useCountries } from '@/app/lib/getCountries'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
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
            country: true,
            createdAt: true,
            reservations: {
                where: {
                    homeId,
                }
            },
            user: {
                select: {
                    profileImage: true,
                    firstname: true,

                }
            }
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

    const { getUser } = getKindeServerSession();
    const user = await getUser();


  return (
    <div className='w-full px-5 lg:px-0 md:w-[75%] mx-auto mt-10 mb-12 '>
        <h2 className="font-medium text-2xl lg:text-3xl mb-5">{data.title}</h2>
        <div className="relative h-[300px] md:h-[550px] ">
            <Image 
            src={`https://gjxicebgfjmnugefmdmc.supabase.co/storage/v1/object/public/images/${data?.photo}`} 
            alt={data?.title as string}
            fill 
            className='rounded-lg h-full w-full object-cover'
            />
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-x-3 lg:gap-x-24 mt-8 ">
            <div className="w-full lg:w-2/3">
                <h3 className="text-xl font-medium">
                    {country?.flag} {country?.label} / { country?.region}
                </h3>
                <div className="flex gap-x-2 text-muted-foreground">
                    <p className="">{data.guests} * {data.bedrooms} Bedrooms * {data.bathrooms} Bathrooms </p>
                </div>
                <div className="flex items-center my-6">
                    <img className='w-11 h-11 rounded-full' src={data.user?.profileImage ?? "/user-image.jpg"} alt="user-profile-image" />
               
                    <div className="flex flex-col ml-4">
                        <h3 className="">Hosted by {data.user?.firstname} </h3>
                        <p className="text-sm text-muted-foreground ">Host since {data.createdAt.toLocaleDateString()} </p>
                    </div>
                </div>
                <Separator className='my-7' />
                <CategoryShowCase categoryName={data.categoryName as string} />
                <Separator className='my-7' />
                <p className="text-muted-foreground">{data.description}</p>

                <Separator className='my-7' />
                <HomeMap locationValue={country?.value as string} />
                
            </div>
            <form action={createReservation}>
                <input type="hidden" hidden name='userId' value={user?.id} />
                <input type="hidden" hidden name='homeId' value={params.homeId} />
                <SelectCalendar reservation={data?.reservations} />

                {
                    user?.id 
                    ? <>
                      <ReservationSubmitButton />
                    </>
                    : <>
                        <Button className='w-full' asChild>
                            <Link href="/api/auth/login">Make a Reservation</Link>
                        </Button>
                    </>
                }
            </form>
        </div>
    </div>
  )
}

export default Home