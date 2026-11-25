import { quote } from '../../../lib/pricing';
import { couponsEnabled } from '../../../lib/spec';
import { upstreamCharge } from '../../../lib/upstream';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: 'invalid JSON' }, { status: 400 });
  }
  const q = quote(input, couponsEnabled());
  const charge = upstreamCharge(process.env.CHECKOUT_API_KEY);
  if (charge.status !== 200) {
    console.error('checkout failed: upstream returned ' + charge.status + ' (' + charge.message + ')');
    return Response.json({ error: charge.message }, { status: charge.status });
  }
  console.log('checkout ok: total_cents=' + q.totalCents + ' discount_cents=' + q.discountCents);
  return Response.json({ ok: true, quote: q });
}
