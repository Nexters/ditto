import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line no-unused-vars
export type EdgeFunction = (req: NextRequest) => NextResponse | Promise<NextResponse>;
