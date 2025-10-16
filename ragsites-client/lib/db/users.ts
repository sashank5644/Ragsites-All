import { query, transaction } from './connection';
import { hashPassword, verifyPassword } from '../auth/password';
import { hashToken } from '../auth/jwt';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  bio?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface UserPreferences {
  email_alerts: boolean;
  weekly_reports: boolean;
  service_updates: boolean;
  marketing_emails: boolean;
}

export async function createUser(data: CreateUserData): Promise<User> {
  const passwordHash = await hashPassword(data.password);

  return transaction(async (client) => {
    // Create user
    const userResult = await client.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, avatar, company, bio, created_at, updated_at`,
      [data.name, data.email, passwordHash]
    );

    const user = userResult.rows[0];

    // Create default preferences
    await client.query(
      `INSERT INTO user_preferences (user_id) VALUES ($1)`,
      [user.id]
    );

    return user;
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await query<User>(
    `SELECT id, name, email, avatar, company, bio, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  return users[0] || null;
}

export async function findUserById(id: number): Promise<User | null> {
  const users = await query<User>(
    `SELECT id, name, email, avatar, company, bio, created_at, updated_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  return users[0] || null;
}

export async function verifyUserPassword(
  email: string,
  password: string
): Promise<User | null> {
  const users = await query<User & { password_hash: string }>(
    `SELECT id, name, email, avatar, company, bio, password_hash, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  const user = users[0];
  if (!user) return null;

  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) return null;

  // Remove password_hash from returned user
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updateUser(
  id: number,
  data: Partial<Omit<User, 'id' | 'email' | 'created_at' | 'updated_at'>>
): Promise<User | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  });

  if (fields.length === 0) {
    return findUserById(id);
  }

  values.push(id);

  const users = await query<User>(
    `UPDATE users
     SET ${fields.join(', ')}
     WHERE id = $${paramCount}
     RETURNING id, name, email, avatar, company, bio, created_at, updated_at`,
    values
  );

  return users[0] || null;
}

export async function getUserPreferences(userId: number): Promise<UserPreferences | null> {
  const prefs = await query<UserPreferences>(
    `SELECT email_alerts, weekly_reports, service_updates, marketing_emails
     FROM user_preferences
     WHERE user_id = $1`,
    [userId]
  );

  return prefs[0] || null;
}

export async function updateUserPreferences(
  userId: number,
  preferences: Partial<UserPreferences>
): Promise<UserPreferences | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  Object.entries(preferences).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  });

  if (fields.length === 0) {
    return getUserPreferences(userId);
  }

  values.push(userId);

  const prefs = await query<UserPreferences>(
    `UPDATE user_preferences
     SET ${fields.join(', ')}
     WHERE user_id = $${paramCount}
     RETURNING email_alerts, weekly_reports, service_updates, marketing_emails`,
    values
  );

  return prefs[0] || null;
}

export async function createSession(
  userId: number,
  token: string,
  expiresAt: Date
): Promise<void> {
  const tokenHash = hashToken(token);

  await query(
    `INSERT INTO sessions (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, tokenHash, expiresAt]
  );
}

export async function deleteSession(token: string): Promise<void> {
  const tokenHash = hashToken(token);

  await query(
    `DELETE FROM sessions WHERE token_hash = $1`,
    [tokenHash]
  );
}

export async function isSessionValid(token: string): Promise<boolean> {
  const tokenHash = hashToken(token);

  const sessions = await query(
    `SELECT id FROM sessions
     WHERE token_hash = $1 AND expires_at > NOW()`,
    [tokenHash]
  );

  return sessions.length > 0;
}

export async function deleteExpiredSessions(): Promise<void> {
  await query(`DELETE FROM sessions WHERE expires_at < NOW()`);
}

export async function deleteUserSessions(userId: number): Promise<void> {
  await query(`DELETE FROM sessions WHERE user_id = $1`, [userId]);
}
