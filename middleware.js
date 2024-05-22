/*import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/firebase.config'; // Uppdatera importen till din Firebase-konfiguration

const isProtectedRoute = createRouteMatcher(['/events']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) || isAdminRoute(req)) auth().protect();

  if (isAdminRoute(req)) {
    const { userId } = auth();

    try {
      // Hämta användarinformation från Firestore
      const userRef = db.collection('admins').doc(userId);
      const userSnapshot = await userRef.get();

      // Kontrollera om användaren är administratör
      const isAdmin = userSnapshot.exists;

      // Om användaren inte är administratör, omdirigera till startsidan
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      return NextResponse.error();
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};*/



/*import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};*/


import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

