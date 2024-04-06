"use client";

import { useCountries } from '@/app/lib/getCountries'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import dynamic from 'next/dynamic';
import React, { type FC, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import CreationBottomBar from '@/app/components/CreationBottomBar';
import { createLocation } from '@/app/actions';

type AddressProps = {
  params: {
    homeId: string;
  }
}

const Address: FC<AddressProps> = ({params}) => {

  const [locationValue, setLocationValue] = useState("");

  const { getAllCountries, getCountryByValue } = useCountries();

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className='h-[50vh]' w-full />
  });

  return (
    <div className="w-full px-3 lg:px-0 lg:w-3/5 mx-auto ">
      <h2 className="text-2xl text-center lg:text-3xl font-semibold tracking-tight transition-colors mb-10">
        Where is your home located?
      </h2>
     <form className='mb-36' action={createLocation}>
      <input type="hidden" hidden name='homeId' value={params.homeId} />
      <input type="hidden" hidden name='countryValue' value={locationValue} />
      <div className="w-full px-3 lg:px-0 lg:w-3/5 mx-auto ">
        <div className="mb-5">
          <Select required onValueChange={(value) => setLocationValue(value)} >
            <SelectTrigger className='w-full '>
              <SelectValue className='' placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {
                  getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <LazyMap locationValue={locationValue} />
      </div>
     <CreationBottomBar />
     </form>
    </div>
  )
}

export default Address