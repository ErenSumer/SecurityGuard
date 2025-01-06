import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const userData = await request.json();
  
  console.log('User Data:', userData);
  
  return NextResponse.json({ status: 'success' });
}
