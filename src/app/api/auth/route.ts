import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, message: 'Authenticated' }, { status: 200 });
    }
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
