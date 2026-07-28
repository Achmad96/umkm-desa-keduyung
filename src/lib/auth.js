import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// In a real app, this should be a long, random secret kept in .env
const secretKey = process.env.JWT_SECRET_KEY || 'super-secret-key-for-jwt-signing';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // 1 day
    .sign(key);
}

export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function createSession(user) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const session = await encrypt({ user, expires });
  
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    expires,
    maxAge: 24 * 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function checkSession() {
  const session = await getSession();
  return { isAdmin: !!session };
}

