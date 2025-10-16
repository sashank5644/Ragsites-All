import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { findUserById, updateUser } from '@/lib/db/users';

export const GET = requireAuth(async (request: NextRequest, jwtPayload) => {
  try {
    const user = await findUserById(jwtPayload.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const PUT = requireAuth(async (request: NextRequest, jwtPayload) => {
  try {
    const { name, avatar, company, bio } = await request.json();

    const updatedUser = await updateUser(jwtPayload.userId, {
      name,
      avatar,
      company,
      bio,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
