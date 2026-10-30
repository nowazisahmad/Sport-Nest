import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';

export async function proxy(request: NextRequest) {
    console.log('Proxying request:', request.url);

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    if (!user) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ['/dashboard/:path*', '/facilities'],
}