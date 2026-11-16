export type SignupData = {
  displayName: string;
  email: string;
  password: string;
  agreedToTerms: true;
};

export function validateSignup(input: unknown):
  | { ok: true; data: SignupData }
  | { ok: false; error: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, error: 'Invalid signup information.' };
  }
  const fields = input as Record<string, unknown>;
  if (typeof fields.displayName !== 'string' ||
      typeof fields.email !== 'string' || typeof fields.password !== 'string') {
    return { ok: false, error: 'Please fill in all required fields.' };
  }
  const displayName = fields.displayName.trim();
  const email = fields.email.trim().toLowerCase();
  const password = fields.password;

  if (displayName.length < 1 || displayName.length > 80) {
    return { ok: false, error: 'Display name must be between 1 and 80 characters.' };
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (password.length < 8 || !/\d/.test(password) || Buffer.byteLength(password, 'utf8') > 72) {
    return { ok: false, error: 'Password needs 8+ characters and a number (maximum 72 bytes).' };
  }
  if (fields.agreedToTerms !== true) {
    return { ok: false, error: 'Please accept the terms before signing up.' };
  }
  return { ok: true, data: { displayName, email, password, agreedToTerms: true } };
}
