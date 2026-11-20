import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className="fixed top-0 mt-4 px-6 sm:px-12 w-full text-black z-20 transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.svg"
            alt="Saheli logo"
            width="42"
            height="42"
          />
          <p className="text-primary text-2xl font-bold tracking-tight">
            Saheli
          </p>
        </Link>
        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-[#e05564] rounded-full shadow-md transition-all duration-200"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
