
import admin from 'firebase-admin';

// This is the service account key you provided.
// It is safe to have it here because this file is only executed on the server.
const serviceAccount = {
  "type": "service_account",
  "project_id": "movesmart-dashboard",
  "private_key_id": "0573e34d91f0f7c5eede63fee483f2fc1653421c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCklNRbwJ+aSZsX\nEfwHzADXb4NjUO9rOujaP5WyrWhCNtwhJNZapPjmsQIfOB5WKxzzKuT9AJZPFETE\nBbDp+17/Zx99+sgowsf2RsLpUlr9NMGbHat8VbM58J24QhtosDcJcbyxm0gtI+CZ\nBR05woxfLz63KRWkRDYRCC6pYbRw4KM2YzH1/vcC755an344TIDagGVBenw9aRF/\nImVa6oFkmuq3CgtNWAN8MxLC6zuyowHJIHAYdIKgMHQj66bcIi2xAUhurPunKHkv\nC+sgmkjrNIy+DzioowXw7LiQe35U+9M8voZprBz4j/7g8TdQ09P60vHI8k/tYYvV\n4sPIQyD9AgMBAAECggEAG3nRPgQZYQuava498htHpK+0MpdncPJjv1PQLQUwG6XG\n+C2LL5TNDM5OOWIIBoCqE5p8ohRAA7GxjTwZ/eX+RQs1QbXlRpDGC0Ji9crO7+in\nzbqVT2uLQUf/PKykoMSSW5xGUSxIT2jm7QTijSsCfj2H7dIJD+RnVk6UY6ixFArY\nBquBwQldZ5c7eQJ59G7MOuZsNFEQJHoGxtWPxBFzO9w1uj/OC1f3EgdzwM1VOYvy\nyxz9A+20JZ5lV1AFk0++uz0qF9XVXZIczvN7KlhOSPDslSnyNWRZMhQZCnK0Dyv6\nFk8vJL7PrPqAF+f33LW96zWIxRBjMOqm4843NZ7VQQKBgQDSF6G9evNVY+xLkDZq\nXaGAnyhUXH3GkjYUtbXTutlvyfGxYzwbsICVmVqGeSODWppax3/kvi1F2fqJy/nt\nyldCSJyKh1q7DseJomPU4bR55FD4HWNkJg+yh6gbl94q/LQY5auhD0u3vLhlyZpF\nP/RheaHZELoHwhntb0G5uwSDjQKBgQDIi1uXtKYqkm7oLsRC4wDnV9nmesa+GlY4\nIMMC4Z+ai/ThSuCT12I3xCKbxZn/1ApUPtGPhPySZ3tcvol2imEulZ/uenN5HarL\nib+ZcZE1mVVmk+4hyVeTjySUBS91gllvLacQ+A7puC0d6dQhqlngIGH51+W6HH7p\nzXw1yW9/MQKBgDCLQ1UL3sPhRc0j8l7baaDVpbTwdiN2z0YzwmK87tb0u4L4YgAn\n5V4rxA4EWZ9VRQsqw7Nv+fgE6O4EEqjOMyFes8USh3VncdWsjxK2YEQ17DuYVsni\nPYhL7h0KF0ypfVevYdviM+WtlpH2Zk4P/AC14R7NzZ5TTDhfl7k5rE5VAoGAUycl\ndUPcWm6ZOgCaNDm32DTfDuf9nDmDYoaDFaDD8urxQLExaVu3R/Q1fW1zq1YaalAZ\nyG6V44aw6gW/Lb23Cf/UbqerVZ7tgLO/FDq4wQaxGHViGfRIMdD6k72Krii8OJMv\nYKPaWyKY4nxgDw15cqs6tMPGZ2MFZKBlTlAVwSECgYAS/abQkF9DcXweHiuqp+oQ\nMgGn0qNHcTHp4M8trFW+4xmfpPLv91xbxnt8xEVEOaui+Y1itLjJuQ/CaNvk07aW\nl9yOyHDE6hIpquktt0yiEYcKxw88ZWaMIbZmIRSYVPuYIfx0JN/dlOInuo7JoXF/\nzjKOvTKd845tNxr5KdjeQg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@movesmart-dashboard.iam.gserviceaccount.com",
  "client_id": "109212678565589245334",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40movesmart-dashboard.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize the Firebase Admin SDK
// We check if the app is already initialized to prevent errors in Next.js's hot-reloading environment.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
  }
}

// Export the initialized Firestore database instance
const db = admin.firestore();

export { db, admin };
