
import { Suspense } from "react";
import MapFilterItems from "./components/MapFilterItems";
import prismaDb from "./lib/db";
import { unstable_noStore as noStore } from "next/cache";
import SkeletonLoading from "./components/SkeletonLoading";
import ShowItems from "./components/ShowItems";

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



export const getData = async ({searchParams, userId }: getDataSearchParamsProps) => {
  noStore();

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

