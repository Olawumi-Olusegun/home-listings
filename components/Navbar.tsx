
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import DesktopLogo from "./../public/airbnb-desktop.png"
import MobileLogo from "./../public/airbnb-mobile.webp"
import UserNav from '../app/components/UserNav'
import HomeListing from "./../public/home-listing-logo.png";
import SearchModalComponent from '@/app/components/SearchComponent'

const Navbar = () => {
  return (
    <nav className='w-full border-b'>
        <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
            <Link href="/">
              <div className="flex flex-col items-center text-primary">
                <h2 className='font-bold'>CB</h2>
                <p className="text-[10px] text-muted-foreground ">REAL ESTATE</p>
              </div>
                {/* <Image src={DesktopLogo} alt='app-logo' className='w-32 hidden lg:block' />
                <Image src={MobileLogo} alt='app-logo' className='w-12 lg:hidden' /> */}
            </Link>

            <SearchModalComponent />

            <UserNav />

        </div>
    </nav>
  )
}

export default Navbar