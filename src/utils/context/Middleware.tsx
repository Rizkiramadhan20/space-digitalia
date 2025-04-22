import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { Role } from '@/utils/context/interface/Auth';

// Paths that are publicly accessible
const publicPaths = [
    '/',
    '/register',
    '/about-us',
    '/services',
    '/project',
    '/articles',
    '/contact-us',
];

// Auth paths that should be accessible only for non-authenticated users
const authPaths = [
    '/signin',
    '/signup',
    '/forgot-password',
];

// Role-based path mapping
const rolePathMap = {
    [Role.SUPER_ADMIN]: ['/dashboard/super-admins'],
    [Role.ADMIN]: ['/dashboard/admins'],
    [Role.USER]: ['/dashboard/user']
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth-token');
    const userRole = request.cookies.get('user-role')?.value;

    // If user is authenticated and trying to access auth pages (signin/login)
    if (token && authPaths.includes(pathname)) {
        // Redirect to appropriate dashboard based on role
        if (userRole) {
            const defaultPath = rolePathMap[userRole as Role]?.[0] || '/';
            return NextResponse.redirect(new URL(defaultPath, request.url));
        }
        // If no role found, redirect to home
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow access to public paths without authentication
    if (publicPaths.some(path => pathname === path)) {
        return NextResponse.next();
    }

    // If accessing dashboard paths
    if (pathname.startsWith('/dashboard')) {
        // If not authenticated, redirect to login
        if (!token || !userRole) {
            const loginUrl = new URL('/signin', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Check role-based access
        const allowedPaths = rolePathMap[userRole as Role] || [];
        const hasAccess = allowedPaths.some(path => pathname.startsWith(path));

        // If no access, redirect to their appropriate dashboard
        if (!hasAccess) {
            const defaultPath = rolePathMap[userRole as Role]?.[0] || '/';
            return NextResponse.redirect(new URL(defaultPath, request.url));
        }
    }

    // For authenticated routes that aren't dashboard routes
    if (!token && !publicPaths.includes(pathname)) {
        const loginUrl = new URL('/signin', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - sitemap.xml (sitemap file)
         * - robots.txt (robots file)
         * - public folder
         * - api routes
         */
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public|api).*)',
    ],
};