import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define arrays for public, authenticated, and protected routes
const publicRoutes = [''];
const authRoutes = ['/admin-login'];
const protectedRoutes = ['/admin'];

export function middleware(request: NextRequest) {
    const bappaSagartech = request.cookies.get('bappaSagartech');
    const { pathname } = request.nextUrl;

    // Redirect logic for the root route
    if (pathname === '/') {
        const redirectUrl = bappaSagartech
            ? `${request.nextUrl.origin}/admin`
            : `${request.nextUrl.origin}/admin-login`;
        return NextResponse.redirect(redirectUrl);
    }

    // Allow public routes to proceed without checks
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Handle authentication routes
    if (authRoutes.includes(pathname)) {
        // If authenticated, redirect to the first protected route
        if (bappaSagartech) {
            const redirectUrl = `${request.nextUrl.origin}${protectedRoutes[0]}`;
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next(); // Allow unauthenticated users to access auth routes
    }

    // Handle protected routes
    if (protectedRoutes.includes(pathname)) {
        // If not authenticated, redirect to the login page
        if (!bappaSagartech) {
            const redirectUrl = `${request.nextUrl.origin}/admin-login`;
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next(); // Allow authenticated users
    }

    // Default behavior for routes not explicitly handled
    return NextResponse.next();
}
