
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import { useCountries } from '../lib/getCountries';

type ListingCardProps = {
    imagePath: string;
    description: string;
    location: string;
    price: Number;
}

const ListingCard: FC<ListingCardProps> = ({imagePath, description, location, price}) => {
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(location)
  return (
    <div className='flex flex-col '>
        <div className="relative h-60 mb-2">
            <Image src={`https://gjxicebgfjmnugefmdmc.supabase.co/storage/v1/object/public/images/${imagePath}`} alt='Home-image' fill className='rounded-lg h-full object-cover mb-3' />
        </div>
        <Link href={`/`}>
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