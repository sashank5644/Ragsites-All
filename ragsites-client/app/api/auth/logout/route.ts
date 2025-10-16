import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/db/users';
import { getTokenFromRequest } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);

    if (token) {
      await deleteSession(token);
    }

    return NextResponse.json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
