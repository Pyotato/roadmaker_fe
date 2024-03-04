import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  // retrieve the current response
  const res = NextResponse.next();

  // if the incoming is for the desired API endpoint
  if (req.nextUrl.pathname === '/edu') {
    res.headers.append('Access-Control-Allow-Credentials', 'false');
    res.headers.append(
      'Access-Control-Allow-Origin',
      'process.env.api',
      // `${process.env.NEXT_API}`,
    );
    res.headers.append(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT',
    );
    res.headers.append(
      'Access-Control-Allow-Headers',
      'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date',
    );
    return res;
  }
  // else {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }
  // generic CORS policy omitted for brevity....
  // else {

  // }
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: ['/myPage/:path*'],
};
