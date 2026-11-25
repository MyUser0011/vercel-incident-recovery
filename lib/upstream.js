// STAND-IN FOR AN EXTERNAL PAYMENT API. Identical in every revision of this repo.
// The external service rotated its key: only the NEW key is accepted now.
import { createHash } from 'node:crypto';

const ACCEPTED_KEY_SHA256 = 'b77e157f479b02103be3868033895584b9141abb6c51aad63f8dcba9e4dcf466';

export function upstreamCharge(apiKey) {
  if (!apiKey) return { status: 401, message: 'missing API key' };
  const digest = createHash('sha256').update(apiKey).digest('hex');
  if (digest !== ACCEPTED_KEY_SHA256) return { status: 401, message: 'API key revoked or invalid' };
  return { status: 200, message: 'charge accepted' };
}
