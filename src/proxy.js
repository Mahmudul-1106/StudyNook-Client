import { NextResponse } from 'next/server';
import { auth } from './lib/auth'; // Ensure this path points exactly to your auth configuration
import { headers } from 'next/headers';

// Next.js explicitly looks for a function named "middleware"
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // 1. If NO session exists, redirect them to the login page
    if (!session) {
         return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // 2. FIXED: If a session DOES exist, allow the request to pass through smoothly
    return NextResponse.next();
}
 
export const config = {
    // Array of routes protected by this middleware layer
    matcher: ['/my-bookings', '/my-listings', '/addRoom'],
};