// Release D2 pricing: shipping fix ($2 per started kg above 5 kg) shipped together with a
// coupon refactor. The refactor applies the coupon in two steps and applies it TWICE (bug).
export const SHIPPING_RULE = 'v2-weight-tier';

export function shippingCents(weightKg) {
  return 800 + 200 * Math.max(0, Math.ceil(weightKg - 5));
}

export function applyCoupon(subtotalCents, coupon, enabled) {
  if (!enabled || coupon !== 'SAVE20') return { discountCents: 0 };
  const step1 = subtotalCents - Math.round(subtotalCents * 0.2);
  const step2 = step1 - Math.round(step1 * 0.2); // BUG: discount applied a second time
  return { discountCents: subtotalCents - step2 };
}

export function quote({ subtotalCents, weightKg, coupon }, enabled) {
  const { discountCents } = applyCoupon(subtotalCents, coupon, enabled);
  const shipping = shippingCents(weightKg);
  return {
    subtotalCents,
    discountCents,
    shippingCents: shipping,
    totalCents: subtotalCents - discountCents + shipping,
  };
}
