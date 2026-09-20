import 'server-only';
import { auth } from '@/lib/firebase';

export async function requireCrmAdmin(idToken: unknown) {
  if (!auth || typeof idToken !== 'string' || !idToken || idToken.length > 10000) {
    throw new Error('Accès administrateur requis. Reconnectez-vous.');
  }
  try {
    const identity = await auth.verifyIdToken(idToken, true);
    const allowed = (process.env.SUPER_ADMIN_EMAILS ?? process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAILS ?? 'mantalutamarinciro@gmail.com')
      .split(',').map(email => email.trim().toLowerCase()).filter(Boolean);
    if (!identity.email_verified || !identity.email || !allowed.includes(identity.email.toLowerCase())) {
      throw new Error('Forbidden');
    }
    return identity;
  } catch {
    // Never log a token or propagate SDK errors containing request context.
    throw new Error('Accès administrateur requis. Reconnectez-vous.');
  }
}
