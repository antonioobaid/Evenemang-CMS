import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'; // Importera komponenter från Clerk för att hantera inloggningsstatus och användarknapp
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className="h-16 flex items-center justify-center shadow bg-slate-300"> {/* Huvudtaggen för navigationsfältet */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center"> {/* Behållare för att centrera innehållet */}
        <div className="flex items-center space-x-4"> {/* Flex-behållare för logotyp och hemsidelänk */}
          <Link href="/" className="text-gray-800 text-3xl font-bold hover:text-gray-500">
            <Image 
              src="/events.jpg"
              className="rounded border-black"
              width={50}
              height={50}
              alt="" // Tom alt-text, bör uppdateras för tillgänglighet
            />
          </Link>
        </div>
        <nav className="flex items-center space-x-6"> {/* Navigationslänkar */}
          <SignedIn> {/* Visar länkar och användarknapp om användaren är inloggad */}
            <>
              <Link href="/events" className="text-gray-700 font-bold hover:text-gray-500">
                Events
              </Link>
              <Link href="/events/gamlaEvenemang" className="text-gray-700 font-bold hover:text-gray-500">
                View Old Events
              </Link>
              <UserButton /> {/* Användarknapp för att visa användarmenyn */}
            </>
          </SignedIn>
          <SignedOut> {/* Visar länkar för inloggning och registrering om användaren inte är inloggad */}
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
