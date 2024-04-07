
import React from 'react'
import NoItem from '../components/NoItem'
import ListingCard from '../components/ListingCard'
import prismaDb from '../lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from "next/cache";

const getData = async (userId: string) => {
    noStore();
    const data = await prismaDb.reservation.findMany({
        where: { userId },
        select: {
            home: {
                select: {
                    id: true,
                    country: true,
                    photo: true,
                    description: true,
                    price: true,
                    favourites: {
                        where: {
                            userId,
                        }
                    }
                }
            }
        }
    });

    return data;
}



const Reservations = async () => {

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id) {
        return redirect("/")
    }

    const data = await getData(user?.id ?? "");

  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10 '>
        <h2 className='text-3xl font-semibold tracking-tight'>Your Reservations </h2>
        {
            data.length === 0 
            ? <NoItem />
            : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                    {data.map((item) => <ListingCard 
                    key={item.home?.id} 
                    description={item.home?.description as string} 
                    location={item.home?.country as string}  
                    imagePath={item.home?.photo as string} 
                    price={Number(item.home?.price) as number} 
                    pathName='/favourites'
                    homeId={item.home?.id as string}
                    userId={user.id}
                    favouriteId={item.home?.favourites[0]?.id  as string}
                    isInFavouriteList={item.home?.favourites?.length as number > 0 }
                    /> )}
                </div>
            )
        }
    </section>
  )
}

export default Reservations