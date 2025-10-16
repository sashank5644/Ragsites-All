import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { getUserPreferences, updateUserPreferences } from '@/lib/db/users';

export const GET = requireAuth(async (request: NextRequest, jwtPayload) => {
  try {
    const preferences = await getUserPreferences(jwtPayload.userId);

    if (!preferences) {
      return NextResponse.json(
        { error: 'Preferences not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error('Get preferences error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const PUT = requireAuth(async (request: NextRequest, jwtPayload) => {
  try {
    const preferences = await request.json();

    const updated = await updateUserPreferences(jwtPayload.userId, preferences);

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update preferences' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Preferences updated successfully',
      preferences: updated,
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
