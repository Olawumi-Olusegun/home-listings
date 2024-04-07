
import React from 'react'
import prismaDb from '../lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import NoItem from '../components/NoItem';
import ListingCard from '../components/ListingCard';
import { unstable_noStore as noStore } from "next/cache";

const getData = async (userId: string) => {
    noStore();
    const data = await prismaDb.home.findMany({
        where: {
            userId,
            addedCategory: true,
            addedDescription: true,
            addedLocation: true,
        },
        select: {
            id: true,
            country: true,
            photo: true,
            description: true,
            price: true,
            favourites: {
                where: {
                    userId
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return data;
}

const Homes = async () => {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if(!user?.id) {
        return redirect("/");
    }

    const data = await getData(user.id);

  return (
    <section className='container mx-auto px-6 lg:px-10 mt-10'>
        <h2 className="text-2xl lg:text-3xl ">Your Homes</h2>
        {
            data.length === 0 
            ? <NoItem />
            : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                    {data.map((item) => <ListingCard key={item.id}  
                        description={item.description as string} 
                        location={item.country as string}  
                        imagePath={item.photo as string} 
                        price={Number(item.price) as number} 
                        pathName='/homes'
                        homeId={item.id as string}
                        userId={user.id}
                        favouriteId={item.favourites[0]?.id  as string}
                        isInFavouriteList={item.favourites?.length as number > 0 }
                    
                    /> )}
                </div>
            )
        }
    </section>
  )
}

export default Homes