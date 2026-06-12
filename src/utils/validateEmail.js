export default function validateEmail(email) {
  if (!email) return false;

  const normalizedEmail = String(email).trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(normalizedEmail);
}