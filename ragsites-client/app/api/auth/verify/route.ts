import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { findUserById, isSessionValid } from '@/lib/db/users';
import { getTokenFromRequest } from '@/lib/auth/middleware';

export const GET = requireAuth(async (request: NextRequest, jwtPayload) => {
  try {
    // Verify session is still valid in database
    const token = getTokenFromRequest(request);
    if (!token || !(await isSessionValid(token))) {
      return NextResponse.json(
        { error: 'Session expired or invalid' },
        { status: 401 }
      );
    }

    // Get full user data
    const user = await findUserById(jwtPayload.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        company: user.company,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
