

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { getData } from '../page';
import NoItem from './NoItem';
import ListingCard from './ListingCard';


  
type searchParamsProps = {
    searchParams?: { 
      filter?: string;
      country?: string; 
      guest?: string; 
      room?: string; 
      bathroom?: string; 
    }
  }
  

const ShowItems = async ({searchParams}: searchParamsProps) => {

    const { getUser } = getKindeServerSession();

    const user = await getUser();
  
    const data = await getData({searchParams: searchParams, userId: user?.id});
  
    if(!data || data.length === 0) {
      return <NoItem />
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 ">
      {data.map((item) => <ListingCard key={item.id}  
          imagePath = {item.photo as string}
          price = {item.price as number}
          description = {item.description as string}
          location = {item.country as string}
          userId={user?.id}
          favouriteId={item.favourites[0]?.id}
          isInFavouriteList={item.favourites.length > 0 }
          homeId={item.id}
          pathName="/"
       />)}
    </div>
    )
}

export default ShowItems