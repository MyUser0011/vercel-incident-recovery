import { RELEASE, RELEASE_NOTE } from '../../../lib/release';
import { quote, SHIPPING_RULE } from '../../../lib/pricing';
import { SAMPLE_BASKET, couponsEnabled, expectedTotalCents } from '../../../lib/spec';
import { upstreamCharge } from '../../../lib/upstream';

export const dynamic = 'force-dynamic';

export async function GET() {
  const enabled = couponsEnabled();
  const key = process.env.CHECKOUT_API_KEY || '';
  const q = quote(SAMPLE_BASKET, enabled);
  const expected = expectedTotalCents(SAMPLE_BASKET, enabled);
  const delta = q.totalCents - expected;
  const charge = upstreamCharge(key);

  return Response.json(
    {
      release: RELEASE,
      releaseNote: RELEASE_NOTE,
      deploymentId: process.env.VERCEL_DEPLOYMENT_ID || 'not-exposed',
      vercelEnv: process.env.VERCEL_ENV || 'local',
      commit: (process.env.VERCEL_GIT_COMMIT_SHA || 'local').slice(0, 7),
      checkoutKeyLast4: key ? key.slice(-4) : 'none',
      couponsEnabled: enabled,
      shippingRule: SHIPPING_RULE,
      checkoutHealth: charge.status === 200 ? 'OK (200)' : 'FAIL (' + charge.status + ' ' + charge.message + ')',
      sampleBasket: '$100.00, 8 kg, coupon SAVE20',
      sampleQuote: {
        discount: (q.discountCents / 100).toFixed(2),
        shipping: (q.shippingCents / 100).toFixed(2),
        total: (q.totalCents / 100).toFixed(2),
        expectedTotal: (expected / 100).toFixed(2),
        pricingCheck: delta === 0 ? 'OK' : 'MISMATCH (' + (delta > 0 ? '+' : '') + (delta / 100).toFixed(2) + ')',
      },
    },
    { headers: { 'cache-control': 'no-store' } }
  );
}
