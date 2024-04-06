"use client";


import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

const Counter = ({name}: {name: string}) => {

    const [amount, setAmount] = useState(0);

    const incrementAmount = () => setAmount((prevstate) => prevstate + 1);
    const decrementAmount = () => {
        if(amount > 0) {
            setAmount((prevstate) => prevstate - 1);
        }
    }
    
  return (
    <div className='flex gap-x-4 items-center'>
        <input type="hidden" hidden name={name} value={amount} />
        <Button onClick={decrementAmount} variant="outline" size="icon" type='button'>
            <Minus className='h-4 w-4 text-primary ' />
        </Button>
        <p className='font-medium text-lg'> {amount} </p>
        <Button onClick={incrementAmount} variant="outline" size="icon" type='button'>
            <Plus className='h-4 w-4 text-primary ' />
        </Button>
    </div>
  )
}

export default Counter