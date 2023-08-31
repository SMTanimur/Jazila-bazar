import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // const userToken = req.cookies.get('bazzar_sid')?.value;
  const sessionToken = req.cookies.has('bazzar_sid');

  // console.log("USER TOKEN", userToken)

  // console.log('ISSESSION', sessionToken);

  const host = req.nextUrl.protocol + req.headers.get('host');
  // console.log("host", host);

  // user login control
  if (sessionToken && req.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL(`${host}/`));
  }
  // Add a closing bracket here
  if (!sessionToken && req.nextUrl.pathname.includes('/dashboard')) {
    return NextResponse.redirect(new URL(`${host}/signin`));
  }

  // Add a closing bracket here
 
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin/:path*'], // Add "/profile" path here
};
