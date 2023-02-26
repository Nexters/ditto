// middleware.ts
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware() {
  const res = NextResponse.next();
  res.headers.append('x-matched-path', '/bucketlist/[folderId]');
  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/bucketlist/:path*',
};
