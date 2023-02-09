import { NextRequest, NextResponse } from 'next/server';

export type EdgeFunction = (req: NextRequest) => NextResponse | Promise<NextResponse>;
