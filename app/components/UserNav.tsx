

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { createHomeListing } from '../actions'

const UserNav = async () => {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    const createHomeWithId = createHomeListing.bind(null, { userId: user?.id as string });

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                <MenuIcon className='w-6 h-6 lg:w-5 lg:h-5' />
                <img src="/user-image.jpg" className='rounded-full h-8 w-8 hidden lg:block' alt="user-image" />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px] '>
            {
                user ? (
                    <>
                    <DropdownMenuItem className='cursor-pointer'>
                        <form action={createHomeWithId} className='w-full'>
                            <button type='submit' className='w-full text-start'>Home Listing App</button>
                        </form>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                        <Link href="/homes">My Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                        <Link href="/favourites">My Favourites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                        <Link href="/reservations">My Reservations</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer'>
                        <LogoutLink className='w-full'>Logout</LogoutLink>
                    </DropdownMenuItem>
                    </>
                ) : (
                    <>
                    <DropdownMenuItem className='cursor-pointer'>
                        <RegisterLink className='w-full'>Register</RegisterLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                        <LoginLink className='w-full'>Login</LoginLink>
                    </DropdownMenuItem>
                    
                    </>
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav