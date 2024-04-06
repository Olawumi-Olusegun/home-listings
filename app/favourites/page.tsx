import React from 'react'
import prismaDb from '../lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import NoItem from '../components/NoItem'
import ListingCard from '../components/ListingCard'

const getData = async (userId: string) => {
    const data = await prismaDb.favourite.findMany({
        where: {
            userId
        },
        select: {
            home: {
                select: {
                    photo: true,
                    id: true,
                    favourites: true,
                    price: true,
                    country: true,
                    description: true
                }
            }
        }
    })

    return data
}

const Favourites = async () => {
    const { getUser }  = getKindeServerSession();
    const user = await getUser();

    if(!user?.id) {
        return redirect("/")
    }

    const data = await getData(user.id); 
  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10 '>
        <h2 className='text-3xl font-semibold tracking-tight'>Your Favourites </h2>
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

export default Favourites