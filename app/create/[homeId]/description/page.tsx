
import React, { type FC } from 'react'
import Counter from '@/app/components/Counter'
import CreationBottomBar from '@/app/components/CreationBottomBar'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createDescription } from '@/app/actions'


type HomeDescriptionProps = {
  params: {
    homeId: string;
  }
}

const HomeDescription: FC<HomeDescriptionProps> = ({params}) => {
  return (
    <>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-2xl lg:text-3xl font-semibold tracking-tight '>
          Please describe your home as good as you can.
        </h2>
      </div>
      <form action={createDescription} className="">
        <input type="hidden" hidden name='homeId' value={params.homeId || ""} />
        <div className="w-3/5 mx-auto mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor='title'>Title</Label>
            <Input type='text' name="title" id="title" placeholder='Short and simple...' required />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor='description'>Description</Label>
            <Textarea name='description' id='description' placeholder='Please describe your home...' required  />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor='price'>Price</Label>
            <Input type="number" name='price' id='price' min={10}  required placeholder='Price per night in USD' />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor='image'>Image</Label>
            <Input type="file" name='image' id='image' min={10}  required />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-2">
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className='underline font-medium'>Guests</h3>
                  <p className="text-muted-foreground text-sm ">How many guests do you want?</p>
                </div>
                <Counter name='guest' />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className='underline font-medium'>Rooms</h3>
                  <p className="text-muted-foreground text-sm ">How many rooms do you have?</p>
                </div>
                <Counter name='room' />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className='underline font-medium'>Bathrooms</h3>
                  <p className="text-muted-foreground text-sm ">How many bathrooms do you have?</p>
                </div>
                <Counter name='bathroom' />
              </div>

            </CardHeader>
          </Card>

        </div>
        <CreationBottomBar />
      </form>
    </>
  )
}

export default HomeDescription