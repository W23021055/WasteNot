//Sets banned passwords
const banned = new Set(['123456','password','qwerty','letmein','111111','abc123']);

// Evaluates password  strength
export function evaluatePasswordStrength(pw) {
  if (pw.length < 8) return 'too-short';
  if (banned.has(pw.toLowerCase())) return 'weak';
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasNum   = /\d/.test(pw);
  const hasSpec  = /[@$!%*?&#.^()[\]{}_\-+]/.test(pw);
  const score = [hasLower,hasUpper,hasNum,hasSpec].filter(Boolean).length;
  if (score <= 2) return 'weak';
  if (score === 3) return 'medium';
  return 'strong';
}

export function meetsPolicy(pw) {
  const s = evaluatePasswordStrength(pw);
  return s === 'medium' || s === 'strong';
}
