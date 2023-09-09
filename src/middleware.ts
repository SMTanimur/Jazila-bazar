import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { AUTH_TOKEN_KEY } from './constants';

export function middleware(req: NextRequest) {
  const userToken = req.cookies.get(AUTH_TOKEN_KEY as string)?.value;
  // const sessionToken = req.cookies.has(ClientSession as string);

  // console.log('USER TOKEN', userToken);

  // console.log('ISSESSION', userToken);

  const host = req.nextUrl.protocol + req.headers.get('host');
  // console.log("host", host);

  // user login control
  if (userToken && req.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL(`${host}/`));
  }
  if (userToken && req.nextUrl.pathname === '/signup') {
    return NextResponse.redirect(new URL(`${host}/`));
  }
  // Add a closing bracket here
  if (!userToken && req.nextUrl.pathname.includes('/dashboard')) {
    return NextResponse.redirect(new URL(`${host}/signin`));
  }

  // Add a closing bracket here
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin/:path*', '/signup/:path*'], // Add "/profile" path here
};
