import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

// Check if user is authenticated (server-side)
export async function requireAuth(event: RequestEvent) {
  const { data: { session } } = await event.locals.supabase.auth.getSession();
  
  if (!session) {
    throw redirect(303, '/auth/login');
  }
  
  return session;
}

// Get current user (server-side)
export async function getCurrentUser(event: RequestEvent) {
  const { data: { session } } = await event.locals.supabase.auth.getSession();
  return session?.user ?? null;
}

// Validate email format (must be @g.bracu.ac.bd)
export function isValidEmail(email: string): boolean {
  return email.endsWith('@g.bracu.ac.bd');
}

// Validate password strength
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

// Check if user is already logged in
export async function redirectIfLoggedIn(event: RequestEvent, redirectTo: string = '/myspace') {
  const { data: { session } } = await event.locals.supabase.auth.getSession();
  
  if (session) {
    throw redirect(303, redirectTo);
  }
}