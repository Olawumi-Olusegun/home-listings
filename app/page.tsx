
import { Suspense } from "react";
import ListingCard from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prismaDb from "./lib/db";
import SkeletonCard from "./components/SkeletonCard";
import NoItem from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type getDataSearchParamsProps = {
  searchParams?: { 
    filter?: string;
    country?: string; 
    guest?: string; 
    room?: string; 
    bathroom?: string;  
  },
  userId: string | undefined;

}

type searchParamsProps = {
  searchParams?: { 
    filter?: string;
    country?: string; 
    guest?: string; 
    room?: string; 
    bathroom?: string; 
  }
}


const getData = async ({searchParams, userId }: getDataSearchParamsProps) => {
  const data = await prismaDb.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      favourites: {
        where: { userId: userId ?? undefined }
      }
    }
  });

  return data;

}

export default function Home({searchParams}: searchParamsProps) {


  return (
   <main className='container mx-auto px-5 lg:px-10'>
    <MapFilterItems />
    <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
      <ShowItems searchParams={searchParams} />
    </Suspense>
   </main>
  );
}


export const ShowItems = async ({searchParams}: searchParamsProps) => {

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

const SkeletonLoading = () => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 ">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
}