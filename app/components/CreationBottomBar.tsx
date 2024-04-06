
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { CreationSubmit } from './SubmitButtons'

const CreationBottomBar = () => {
  return (
    <div className="fixed w-full bottom-0 left-0 right-0 z-10 bg-white border-t h-24 ">
    <div className="flex items-center justify-between px-5 lg:px-10  h-full">
      
      <Button asChild variant="outline" size="lg">
          <Link href="/">Cancel</Link>
      </Button>
    
        <CreationSubmit />
    </div>
</div>
  )
}

export default CreationBottomBar