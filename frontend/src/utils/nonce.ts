export function generateNonce(): string {
  return `nonce_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}