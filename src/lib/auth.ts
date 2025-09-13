import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return decoded;
  } catch (_err: unknown) {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export function requireAuth(handler: (request: NextRequest, ...args: unknown[]) => Promise<Response> | Response | void) {
  return async (request: NextRequest, ...args: unknown[]): Promise<Response> => {
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: 'No token provided' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add user info to request
  (request as NextRequest & { user?: JWTPayload }).user = payload;
    return handler(request, ...args) as Promise<Response>;
  };
}

export function requireAdmin(handler: (request: NextRequest, ...args: unknown[]) => Promise<Response> | Response | void) {
  return async (request: NextRequest, ...args: unknown[]): Promise<Response> => {
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: 'No token provided' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (payload.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, message: 'Admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add user info to request
  (request as NextRequest & { user?: JWTPayload }).user = payload;
    return handler(request, ...args) as Promise<Response>;
  };
}
