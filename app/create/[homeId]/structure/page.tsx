
import React, { FC } from 'react'
import { createCategory } from '@/app/actions'
import CreationBottomBar from '@/app/components/CreationBottomBar'
import { SelectCategory } from '@/app/components/SelectCategory'

type StructuredPageProps = {
    params: {
        homeId: string;
    }
}

const StructuredPage: FC<StructuredPageProps> = ({params}) => {

    const homeId = params.homeId;

  return (
    <>
    <div className='container px-5 lg:w-3/5 mx-auto'>
        <h2 className='text-3xl text-center font-semibold tracking-tight transition-colors '>Which of these best describe your home?</h2>
    </div>
    <form action={createCategory}>
        <input type="hidden" name='homeId' value={homeId} hidden />
        <SelectCategory />
        <CreationBottomBar />
    </form>
    </>
  )
}

export default StructuredPage