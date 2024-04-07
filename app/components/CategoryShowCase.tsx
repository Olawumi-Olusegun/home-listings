
import React, { FC } from 'react'
import { categoryItems } from '../lib/categoryItems';
import Image from 'next/image';

type CategoryShowCaseProps = {
    categoryName: string;
}

const CategoryShowCase: FC<CategoryShowCaseProps> = ({categoryName}) => {

    const category = categoryItems.find((item) => item.name === categoryName)

  return (
    <div className='flex items-center '>
        <Image src={category?.imageUrl as string} alt='Category-image' width={44} height={44}  />
        
        <div className="flex flex-col ml-4">
            <h3 className='font-medium'>{category?.title as string}</h3>
            <p className="text-sm text-muted-foreground ">{category?.description as string}</p>
        </div>
    </div>
  )
}

export default CategoryShowCase