import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className=" h-16 flex items-center justify-center shadow bg-slate-300">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-800 text-3xl font-bold hover:text-gray-500">
          <Image src="/events.jpg"
            className="rounded border-black"
            width={50 }
            height={50}
            alt=""
          
          />
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <SignedIn>
            <>
              <Link href="/events" className="text-gray-700 font-bold hover:text-gray-500">
                Events
              </Link>
              <Link href="/dashboard" className="text-gray-700 font-bold hover:text-gray-500">
                Dashboard
              </Link>
              <UserButton />
            </>
          </SignedIn>
          <SignedOut>
            <>
              <Link href="/sign-in" className="text-gray-700 font-bold hover:text-gray-500">
                Logga In
              </Link>
              <Link href="/register" className="text-gray-700 font-bold hover:text-gray-500">
                Registrera
              </Link>
            </>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
