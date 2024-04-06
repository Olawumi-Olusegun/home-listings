
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import { useCountries } from '../lib/getCountries';
import { AddToFavouriteButton, DeleteFromFavourite } from './SubmitButtons';
import { addToFavourite, deleteToFavourite } from '../actions';

type ListingCardProps = {
    imagePath: string;
    description: string;
    location: string;
    price: Number;
    userId: string | undefined;
    isInFavouriteList: boolean;
    favouriteId: string;
    homeId: string;
    pathName: string;
}

const ListingCard: FC<ListingCardProps> = ({imagePath, pathName, isInFavouriteList, favouriteId, homeId, userId, description, location, price}) => {
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(location)
  return (
    <div className='flex flex-col '>
        <div className="relative h-60 mb-2">
            <Image src={`https://gjxicebgfjmnugefmdmc.supabase.co/storage/v1/object/public/images/${imagePath}`} alt='Home-image' fill className='rounded-lg h-full object-cover mb-3' />
        
         {
            userId 
             ? (
                <div className='z-10 absolute top-2 right-2  '>
                   {isInFavouriteList ? (
                    <form action={deleteToFavourite}>
                        <input type="hidden" hidden name='favouriteId' value={favouriteId} />
                        <input type="hidden" hidden name='userId' value={userId || ""} />
                        <input type="hidden" hidden name='pathName' value={pathName} />
                        <DeleteFromFavourite />
                    </form>
                   ) :  (
                    <form action={addToFavourite}>
                        <input type="hidden" hidden name='homeId' value={homeId} />
                        <input type="hidden" hidden name='userId' value={userId || ""} />
                        <input type="hidden" hidden name='pathName' value={pathName} />
                        <AddToFavouriteButton />
                    </form>
                   )
                   
                   }
                </div>
             )
             : null
         }
        </div>
        <Link href={`/home/${homeId}`}>
            <h3 className='font-medium text-base'>{country?.flag} {country?.label} / {country?.region} </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 ">{description}</p>
            <p className="pt-2 text-muted-foreground ">
                <span className="font-medium text-black ">${Number(price)}</span>  Night
            </p>
        </Link>
    </div>
  )
}

export default ListingCard