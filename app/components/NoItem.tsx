
import {  FileQuestion } from 'lucide-react'
import React from 'react'

const NoItem = () => {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10'>
        <div className="flex h-20 w-20 items-center justify-center  rounded-full bg-primary/10 ">
            <FileQuestion className='h-10 w-10 text-primary' />
        </div>
        <h2 className='text-muted-foreground font-semibold py-3'>No content found!</h2>
      
    </div>
  )
}

export default NoItem